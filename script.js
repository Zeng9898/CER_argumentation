let conversationHistory = [{
    "role": "system",
    "content": `1. <場景>：根據我的選項，發展出接下來的場景，需遵循小說「悲慘世界（Les Misérables）」

    2. <選擇>：在每一次的對話中，你都會給我 A、B、C 三個動作可以選擇，以及「D：輸入你的選擇」共四個選項，並根據我選擇的動作繼續接下來的劇情，整體劇情會圍繞著悲慘世界小說發展。如果我的選項並不存在於小說之內，你可以自由發揮接下來的劇情，並導回原本的小說劇情內。
    
    對話完成後，請根據我選擇的動作繼續接下來的劇情，整體劇情會圍繞著悲慘世界小說發展。如果我的選項並不存在於小說之內，你可以自由發揮接下來的劇情，並導回原本的「悲慘世界」（Les Misérables）小說劇情內。
    
    每一次的對話，都必須要呈現<場景>、<選擇>
    
    全部內容將以繁體中文呈現，請僅僅提供上面所說的場景、選擇，不要給出遊戲說明`
}];

function reformatText(text) {
    // 替换 "<場景>：" 和 "<選擇>：" 前增加一个换行
    text = text.replace(/<場景>：/g, "\n<場景>：");
    text = text.replace(/<選擇>：/g, "\n<選擇>：");

    // 分割 "<選擇>：" 后的选项，使每个选项独立一行
    text = text.replace(/<選擇>：\s*/g, "<選擇>：\n");
    text = text.replace(/(A\.|B\.|C\.|D\.)/g, "\n$1");

    // 将所有的换行符 "\n" 替换为 HTML 的换行标签 "<br>"
    text = text.replace(/\n/g, "<br>");

    console.log('text', text);
    return text;
}


async function sendMessage() {
    const inputField = document.getElementById('message-input');
    const message = inputField.value;
    inputField.value = '';

    displayMessage(message, 'user');

    let response = await fetchChatGPTResponse(message);

    console.log('response', response);
    response = reformatText(response);
    displayMessage(response, 'bot'); // 這裡使用 await 確保 response 是已解析的消息
}

function displayMessage(message, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = message;  // 使用 innerHTML 而不是 textContent
    messageDiv.className = sender;
    messagesContainer.appendChild(messageDiv);
}


async function fetchChatGPTResponse(message) {
    if(conversationHistory.length != 1){
        conversationHistory.push({role: "user", content: message});
    }
    let data = JSON.stringify({
        "engine": "gpt-35-turbo",
        "temperature": 0.7,
        "max_tokens": 4096,
        "top_p": 0.95,
        "top_k": 5,
        "roles": conversationHistory,
        "frequency_penalty": 0,
        "repetition_penalty": 1.03,
        "presence_penalty": 0,
        "stop": "",
        "past_messages": 10,
        "purpose": "dev"
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://ml.hsueh.tw/callapi',
        headers: { 
            'Content-Type': 'application/json'
        },
        data: data
    };
    
    try {
        const response = await axios.request(config);
        console.log(response.data.choices[0].message.content);
        conversationHistory.push({role: "assistant", content: response.data.choices[0].message.content});
        return response.data.choices[0].message.content; // 確保此處返回解析後的消息
    } catch (error) {
        console.log(error);
        return 'Error: Unable to fetch response'; // 提供一個錯誤消息，以防 API 請求失敗
    }
}

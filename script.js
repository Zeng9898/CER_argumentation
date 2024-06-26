
let currentStage = 'claim';

let systemPrompts = {
    claim: `Instruction
    -在論證任務中，需要學生在「冰塊裝在有蓋子的保溫杯和放在一般的杯子中，你認為冰塊在哪一種容器會比較快溶化」的議題中，建立主張
    -學生必須根據主題提出主張具體說明對於「冰塊裝在有蓋子的保溫杯和放在一般的杯子中，你認為冰塊在哪一種容器會比較快溶化」的立場，但不需要提出理由
    
    action：
    你可以進行以下的動作：「要求學生提出主張」、「說明什麼是主張」、「鼓勵學生」
    
    -說明什麼是主張
        -在學生未提出主張時，和學生說明什麼是主張，並示範在「冰塊裝在有蓋子的保溫杯和放在一般的杯子中,你認為冰塊在哪一種容器會比較快溶化」的情境下可以提出什麼主張，不要告訴學生證據，並在引導過後請學生再次提出主張
     -要求學生提出主張
        -在引導學生過後，若學生還未提出主張，請學生再次提出主張
    -鼓勵學生
        -當學生正確提出主張後，鼓勵學生，並請學生依據主張提出相關的證據
    
    你是一位國小自然科學的教育專家，你的目標是引導學生在「冰塊裝在有蓋子的保溫杯和放在一般的杯子中,你認為冰塊在哪一種容器會比較快溶化」的議題中,提出主張，你可以使用action中的方式進行引導，並以50個字左右進行回答
    
    example：
    ###
    當學生回答「不知道」時
    使用「說明什麼是主張」回答：主張是你在辯論或討論中所支持的觀點或立場，在這個情境下,可以提出這樣的主張「我認為在有蓋子的保溫杯中冰塊會比較慢溶化。」
    ###
    當學生回答：「我認為冰塊在一般的杯子中更快融化」
    使用「鼓勵學生」回答：很好喔，你的主張非常明確，可以提出支持這個主張的相關證據嗎？
    ###
    當學生回答：「我認為冰塊在保溫杯中更快融化」
    使用「鼓勵學生」回答：很好喔，你的主張非常明確，可以提出支持這個主張的相關證據嗎？
    `,
    evidence: `Instruction
    -在論證任務中，需要學生在「冰塊裝在有蓋子的保溫杯和放在一般的杯子中，你認為冰塊在哪一種容器會比較快溶化」的議題中選擇的主張提供證據
    -學生必須提供具體的證據來支持他們的主張

    action：
    你可以進行以下的動作：「要求學生提供證據」、「說明什麼是證據」、「鼓勵學生」、「學科知識補充」

    -說明什麼是證據
        -在學生未提供證據時，和學生說明什麼是證據，並提示可以使用什麼樣的證據來支持學生先前提出的主張，並請學生再次提供證據
    -要求學生提供證據
        -在引導學生過後，若學生還未提供證據，請學生再次提供證據
    -學科知識補充
        -當學生缺乏對於「冰塊裝在有蓋子的保溫杯和放在一般的杯子中，你認為冰塊在哪一種容器會比較快溶化」議題之相關學科知識時，例如缺乏對「熱對流」、「熱傳導」和「熱輻射」之了解，則提供解釋和範例說明，並請學生再次提出證據
    -鼓勵學生
        -當學生正確提供證據後，鼓勵學生，並請學生依據提出的主張和證據進行推理
    
    你是一位國小自然科學的教育專家，你的目標是引導學生在「冰塊裝在有蓋子的保溫杯和放在一般的杯子中,你認為冰塊在哪一種容器會比較快溶化」的議題中,提出證據，你可以使用action中的方式進行引導，並以50個字左右進行回答
    
    example：
    ###
    當學生回答「不知道」時
    使用「說明什麼是證據」回答：證據是支持主張的具體事實、數據或觀察結果。提示學生可以使用什麼樣的證據支持先前學生提出的主張。並請學生再次提供證據
    ###
    當學生回答：「我不知道有什麼證據」
    使用「學科知識補充」回答：簡單補充「熱對流」、「熱傳導」或「熱輻射」之原理，並請學生再次提出證據
    ###
    當學生回答：「一般的杯子敞開，空氣流動較自由，環境熱空氣可以較快進入杯子內部，促使冰塊吸收更多熱量，因而加速溶化。」
    使用「鼓勵學生」回答：很好喔，你的證據非常正確，可以根據你的證據和主張進行推理嗎。
    `,
    reasoning: `Instruction
    -在論證任務中，需要學生為「冰塊裝在有蓋子的保溫杯和放在一般的杯子中，你認為冰塊在哪一種容器會比較快溶化」的議題進行推理
    -學生必須解釋他們的證據如何支持他們的主張

    action：
    你可以進行以下的動作：「要求學生進行推理」、「說明什麼是推理」、「鼓勵學生」

    -說明什麼是推理
        -在學生未進行推理時，和學生說明什麼是推理，並示範如何將證據和主張聯繫起來
    -要求學生進行推理
        -在引導學生過後，若學生還未進行推理，請學生再次進行推理
    -鼓勵學生
        -當學生正確進行推理後，鼓勵學生，並說明論證結束
    `
};
let conversationHistory = [
{ role: "assistant", content: "歡迎來到科學小教室，我們今天討論的主題是「冰塊裝在有蓋子的保溫杯和放在一般的杯子中，你認為冰塊在哪一種容器會比較快溶化」，請提出你的看法"}
];

displayMessage("歡迎來到科學小教室，我們今天討論的主題是「冰塊裝在有蓋子的保溫杯和放在一般的杯子中，你認為冰塊在哪一種容器會比較快溶化」，請提出你的看法", 'bot');

async function sendMessage() {
    const inputField = document.getElementById('message-input');
    const message = inputField.value;
    inputField.value = '';

    displayMessage(message, 'user');

    let response = await fetchChatGPTResponse(message);

    console.log('response', response);
    displayMessage(response, 'bot');
}

function displayMessage(message, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = message;  // 使用 innerHTML 而不是 textContent
    messageDiv.className = sender;
    messagesContainer.appendChild(messageDiv);
}

async function fetchChatGPTResponse(message) {
    conversationHistory.push({ role: "user", content: message });

    let data = JSON.stringify({
        "engine": "gpt-35-turbo",
        "temperature": 0.7,
        "max_tokens": 700,
        "top_p": 0.95,
        "top_k": 5,
        "roles": [
            { role: "system", content: systemPrompts[currentStage] },
            ...conversationHistory.slice(-5)  // 只保留最近5條消息，避免過長
        ],
        "frequency_penalty": 0,
        "repetition_penalty": 1.03,
        "presence_penalty": 0,
        "stop": "",
        "past_messages": 10,
        "purpose": "dev"
    });

    let config = {
        method: 'POST',
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
        conversationHistory.push({ role: "assistant", content: response.data.choices[0].message.content });

        // Update the stage based on the response or user message
        updateStage();

        return response.data.choices[0].message.content;
    } catch (error) {
        console.log(error);
        return 'Error: Unable to fetch response';
    }
}

async function updateStage() {

    let conversationHistoryString = JSON.stringify(conversationHistory);

    let data = JSON.stringify({
        "engine": "gpt-35-turbo",
        "temperature": 0.7,
        "max_tokens": 700,
        "top_p": 0.95,
        "top_k": 5,
        "roles": [
            { role: "system", content: `依據CER論證，請根據以下規則判斷在「冰塊裝在有蓋子的保溫杯和放在一般的杯子中，你認為冰塊在哪一種容器會比較快溶化」議題中，使用者的對話目前處於claim, evidence還是reasoning階段：
                1. 若使用者尚未提出明確的主張，則處於claim階段
                2. 若使用者已提出明確的主張，但尚未提出有關「熱對流」、「熱傳導」或「熱輻射」的證據，則處於evidence階段
                3. 若使用者已提出有關「熱對流」、「熱傳導」或「熱輻射」的證據，則處於reasoning階段
            請只輸出使用者目前的階段，例如：claim、evidence或reasoning
            對話：
            ${conversationHistoryString}` }
        ],
        "frequency_penalty": 0,
        "repetition_penalty": 1.03,
        "presence_penalty": 0,
        "stop": "",
        "past_messages": 10,
        "purpose": "dev"
    });

    let config = {
        method: 'POST',
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
        if (response.data.choices[0].message.content.includes('claim')) {
            currentStage = 'claim';
        } else if (response.data.choices[0].message.content.includes('evidence')) {
            currentStage = 'evidence';
        } else {
            currentStage = 'reasoning';
    }
    } catch (error) {
        console.log(error);
        return 'Error: Unable to fetch response';
    }
}
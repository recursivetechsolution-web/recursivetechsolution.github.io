// ============================================
// AI CHATBOT WITH RAG & GROQ INTEGRATION
// ============================================

let faqData = [];
let conversationHistory = [];
const GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE'; // Demo key - use env variable in production

// Initialize chatbot
async function initializeChatbot() {
    await loadFAQData();
    setupChatListeners();
    loadMessageHistory();
    console.log('Chatbot initialized with RAG + Groq');
}

// Load FAQ/RAG data from JSON
async function loadFAQData() {
    try {
        const response = await fetch('/data/faq.json');
        faqData = await response.json();
        console.log('FAQ data loaded:', faqData.faqs.length, 'items');
    } catch (error) {
        console.error('Error loading FAQ data:', error);
        showError('Could not load knowledge base. Please try again later.');
    }
}

// Setup chat event listeners for both widget and page
function setupChatListeners() {
    // Main page chat
    const mainInput = document.getElementById('main-chat-input');
    const mainSend = document.getElementById('main-send-btn');
    if (mainInput && mainSend) {
        mainInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') mainSend.click();
        });
        mainSend.addEventListener('click', () => handleUserMessage(mainInput, 'main-chat-messages'));
    }

    // Widget chat (if exists)
    const widgetInput = document.getElementById('chat-input');
    const widgetSend = document.getElementById('send-chat');
    if (widgetInput && widgetSend) {
        widgetInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') widgetSend.click();
        });
        widgetSend.addEventListener('click', () => handleUserMessage(widgetInput, 'chat-messages'));
    }
}

// Handle user message
async function handleUserMessage(inputElement, messagesContainerId) {
    const message = inputElement.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, 'user', messagesContainerId);
    inputElement.value = '';

    // Save to history
    conversationHistory.push({ role: 'user', content: message });
    saveMessageHistory();

    // Show thinking indicator
    const thinkingId = 'thinking-' + Date.now();
    addMessage('🤔 Thinking...', 'bot', messagesContainerId, thinkingId);

    // Get AI response (RAG first, then Groq)
    const response = await getAIResponse(message);

    // Remove thinking indicator and add response
    removeMessage(thinkingId, messagesContainerId);
    addMessage(response, 'bot', messagesContainerId);

    // Save to history
    conversationHistory.push({ role: 'assistant', content: response });
    saveMessageHistory();
}

// Get AI response: Human escalation -> RAG -> Groq fallback
async function getAIResponse(userMessage) {
    try {
        // Step 0: Check for human escalation requests (PRIORITY)
        const escalationResponse = checkForEscalation(userMessage);
        if (escalationResponse) {
            console.log('Human escalation requested');
            return escalationResponse;
        }

        // Step 1: Check RAG database (local knowledge base)
        const ragResponse = searchRAG(userMessage);
        if (ragResponse) {
            console.log('RAG match found');
            return ragResponse;
        }

        // Step 2: Fallback to Groq API for novel questions
        console.log('No RAG match, calling Groq API...');
        const groqResponse = await callGroqAPI(userMessage);
        return groqResponse || 'I couldn\'t find an answer to that. Please contact us at recursivetechsolution@gmail.com or call +1-443-741-2138.';

    } catch (error) {
        console.error('Error getting AI response:', error);
        return '⚠️ Sorry, I encountered an error. Please contact us at recursivetechsolution@gmail.com or call +1-443-741-2138.';
    }
}

// Check for human escalation requests
function checkForEscalation(message) {
    const lowerMessage = message.toLowerCase();

    // Escalation keywords
    const escalationKeywords = [
        'contact', 'human', 'support', 'help', 'speak', 'talk', 'call',
        'phone', 'representative', 'agent', 'manual', 'customer service',
        'manager', 'supervisor', 'sales', 'demo', 'consultation', 'meeting',
        'schedule', 'book', 'appointment', 'with a person', 'real person',
        'live person', 'talk to someone', 'reach out', 'reach someone'
    ];

    // Check if message contains any escalation keywords
    const hasEscalationKeyword = escalationKeywords.some(keyword => lowerMessage.includes(keyword));

    if (hasEscalationKeyword) {
        return `I'd be happy to connect you with our team! 👋

Here's how to reach us:
📞 **Call us**: +1-443-741-2138
📧 **Email**: recursivetechsolution@gmail.com

Our team is available to discuss your healthcare practice technology needs, provide demos, answer specific questions, and create custom quotes. We typically respond to emails within 24 hours and can schedule calls for the same day.

What would you like help with?`;
    }

    return null;
}

// RAG: Search local knowledge base
function searchRAG(query) {
    const lowerQuery = query.toLowerCase();

    // Score each FAQ based on keyword matches
    const scoredFAQs = faqData.faqs.map(faq => {
        let score = 0;
        const questionWords = faq.question.toLowerCase().split(' ');
        const answerWords = faq.answer.toLowerCase().split(' ');
        const keywordMatches = faq.keywords.map(k => k.toLowerCase());

        // Keyword matching (highest priority)
        keywordMatches.forEach(keyword => {
            if (lowerQuery.includes(keyword)) score += 5;
        });

        // Question word matching
        questionWords.forEach(word => {
            if (lowerQuery.includes(word) && word.length > 3) score += 2;
        });

        // Answer word matching
        answerWords.forEach(word => {
            if (lowerQuery.includes(word) && word.length > 4) score += 0.5;
        });

        return { faq, score };
    });

    // Get best match (score > 2 = match found)
    const bestMatch = scoredFAQs.sort((a, b) => b.score - a.score)[0];

    if (bestMatch && bestMatch.score > 2) {
        return formatRAGResponse(bestMatch.faq);
    }

    return null;
}

// Format RAG response with metadata
function formatRAGResponse(faq) {
    return `${faq.answer}\n\n📚 *Source: ${faq.category} FAQ*`;
}

// Call Groq API for complex questions
async function callGroqAPI(userMessage) {
    try {
        const systemPrompt = `You are Recursive Tech Solution's AI assistant. You are helpful, professional, and concise.
We are a tech services company that builds solutions FOR healthcare providers. We offer:
- HIPAA-compliant websites for doctors, psychiatrists, and therapists
- AI chatbots for appointment booking and patient intake
- Patient portals for secure records access and messaging
- Medical practice SEO to help doctors get found by patients
- EHR system integrations (Epic, Athena, SimplePractice, etc.)
- Telemedicine platform setup and integration

For questions about our services, mention specific features or benefits. For contact/demos, provide the phone number and email.
For questions outside your scope, suggest contacting recursivetechsolution@gmail.com or calling +1-443-741-2138.
Keep responses under 200 words. Be friendly and professional.`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'mixtral-8x7b-32768',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...conversationHistory.slice(-6), // Last 6 messages for context
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 500,
                temperature: 0.5,
                top_p: 0.9
            })
        });

        if (!response.ok) {
            console.error('Groq API error:', response.status);
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error('Groq API error:', error);
        return null;
    }
}

// UI Helper: Add message to chat
function addMessage(text, type, containerId, msgId = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.id = msgId;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;

    messageDiv.appendChild(bubbleDiv);

    if (type === 'bot') {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.appendChild(timeDiv);
    }

    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// UI Helper: Remove message
function removeMessage(msgId, containerId) {
    const msg = document.getElementById(msgId);
    if (msg) msg.remove();
}

// Helper: Set question from quick topics
function setQuestion(question) {
    const mainInput = document.getElementById('main-chat-input');
    const widgetInput = document.getElementById('chat-input');

    if (mainInput) {
        mainInput.value = question;
        mainInput.focus();
        document.getElementById('main-send-btn').click();
    } else if (widgetInput) {
        widgetInput.value = question;
        widgetInput.focus();
        document.getElementById('send-chat').click();
    }
}

// Helper: Show error message
function showError(message) {
    console.error(message);
    addMessage(`❌ ${message}`, 'bot', 'main-chat-messages');
}

// Persistent message history (localStorage)
function saveMessageHistory() {
    try {
        localStorage.setItem('chatbot_history', JSON.stringify(conversationHistory.slice(-20))); // Keep last 20 messages
    } catch (e) {
        console.warn('Could not save chat history:', e);
    }
}

function loadMessageHistory() {
    try {
        const saved = localStorage.getItem('chatbot_history');
        if (saved) {
            conversationHistory = JSON.parse(saved);
            console.log('Loaded chat history:', conversationHistory.length, 'messages');
        }
    } catch (e) {
        console.warn('Could not load chat history:', e);
    }
}

// Analytics
function trackChatEvent(eventName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'chat_' + eventName);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeChatbot);

console.log('🤖 Chatbot module loaded - RAG + Groq ready');

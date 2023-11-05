document.addEventListener('DOMContentLoaded', () => {
    const chat = document.getElementById('chat');
    const questionInput = document.getElementById('question');
    const askButton = document.getElementById('ask');

    askButton.addEventListener('click', async () => {
        const question = questionInput.value;
        const response = await askQuestion(question);
        appendMessage('user', question);
        appendMessage('bot', response);
        questionInput.value = '';
    });

    async function askQuestion(question) {
        const response = await fetch(`/api/chat?question=${question}`);
        const data = await response.json();
        return data.answer;
    }

    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = `<p>${message}</p>`;
        chat.appendChild(messageDiv);
    }
});

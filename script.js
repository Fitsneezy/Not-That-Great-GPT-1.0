// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Dev Menu Toggle
    document.getElementById('dev-menu-toggle').addEventListener('click', () => {
        const devMenu = document.getElementById('dev-menu');
        devMenu.classList.toggle('hidden');
    });

    // Settings Toggle
    document.getElementById('settings-toggle').addEventListener('click', () => {
        const settingsMenu = document.getElementById('settings-menu');
        settingsMenu.classList.toggle('hidden');
    });

    // NG GPTs Toggle
    document.getElementById('ng-gpt-toggle').addEventListener('click', () => {
        const ngGptSection = document.getElementById('ng-gpt-section');
        ngGptSection.classList.toggle('hidden');
    });

    // Send Message
    document.getElementById('send-message').addEventListener('click', () => {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (message) {
            const chatBox = document.getElementById('chat-box');
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
            input.value = '';
        }
    });

    // Save Chat
    document.getElementById('save-chat').addEventListener('click', () => {
        // Implement chat saving logic
        const chatBox = document.getElementById('chat-box');
        const messages = chatBox.querySelectorAll('.chat-message');
        const chatData = Array.from(messages).map(msg => msg.textContent).join('\n');
        
        // Create a .ntggpt file
        const blob = new Blob([chatData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat.ntggpt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});

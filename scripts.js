import { getAuth, signInAnonymously } from "firebase/auth";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyDq9ZvBDn8NTzHns7uusrptpdCWnUC2E_c",
    authDomain: "demi-41d3a.firebaseapp.com",
    databaseURL: "https://demi-41d3a-default-rtdb.firebaseio.com",
    projectId: "demi-41d3a",
    storageBucket: "demi-41d3a.appspot.com",
    messagingSenderId: "891233856573",
    appId: "1:891233856573:web:5cc92dc377c2e354f58e54"
};

firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const database = firebase.database();

let currentUserId;

// Handle anonymous login
document.getElementById('login-btn').addEventListener('click', () => {
    auth.signInAnonymously().then(() => {
        currentUserId = auth.currentUser.uid;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('gender-section').style.display = 'block';
    }).catch((error) => {
        console.error('Login failed:', error);
    });
});

// Handle gender saving
document.getElementById('save-gender-btn').addEventListener('click', () => {
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (gender) {
        database.ref('users/' + currentUserId).set({
            gender: gender
        }).then(() => {
            document.getElementById('gender-section').style.display = 'none';
            document.getElementById('chat-section').style.display = 'block';
            startChat();
        }).catch((error) => {
            console.error('Saving gender failed:', error);
        });
    } else {
        alert('Please select a gender');
    }
});

function startChat() {
    const messagesRef = database.ref('chats');

    // Listen for new messages
    messagesRef.on('child_added', (snapshot) => {
        const message = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.userId}: ${message.text}`;
        document.getElementById('messages').appendChild(messageElement);
        document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
    });

    // Send message
    document.getElementById('send-message-btn').addEventListener('click', () => {
        const messageText = document.getElementById('message-input').value;
        if (messageText.trim()) {
            const newMessageRef = messagesRef.push();
            newMessageRef.set({
                userId: currentUserId,
                text: messageText
            }).then(() => {
                document.getElementById('message-input').value = '';
            }).catch((error) => {
                console.error('Sending message failed:', error);
            });
        }
    });
}
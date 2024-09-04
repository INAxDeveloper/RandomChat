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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Firebase services
const auth = firebase.auth();
const database = firebase.database();

document.getElementById('login-btn').addEventListener('click', () => {
    auth.signInAnonymously().then(() => {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('gender-section').style.display = 'block';
    }).catch((error) => {
        console.error('Login failed:', error);
    });
});

document.getElementById('save-gender-btn').addEventListener('click', () => {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const userId = auth.currentUser.uid;

    if (gender) {
        database.ref('users/' + userId).set({
            gender: gender
        }).then(() => {
            document.getElementById('gender-section').style.display = 'none';
            document.getElementById('chat-section').style.display = 'block';
        }).catch((error) => {
            console.error('Saving gender failed:', error);
        });
    } else {
        alert('Please select a gender');
    }
});

document.getElementById('start-chat-btn').addEventListener('click', () => {
    // Implement your chat start logic here
    alert('Chat started!');
});

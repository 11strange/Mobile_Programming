// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmsuFKHt2RZqv8QtlXb-BrakQe2tU3wSk",
  authDomain: "ballmandu-6f18b.firebaseapp.com",
  projectId: "ballmandu-6f18b",
  storageBucket: "ballmandu-6f18b.firebasestorage.app",
  messagingSenderId: "916990990751",
  appId: "1:916990990751:web:7101033ca4a9bdd5e4c5aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function writeContactData(userID, firstname, lastname, phone, email, address) {
  return set(ref(db, 'contacts/' + userID), {
    userID: userID,
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    email: email,
    address: address
  });
}

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const userID    = document.getElementById('userID').value.trim();
  const firstname = document.getElementById('firstname').value.trim();
  const lastname  = document.getElementById('lastname').value.trim();
  const phone     = document.getElementById('phone').value.trim();
  const email     = document.getElementById('email').value.trim();
  const address   = document.getElementById('address').value.trim();

  const msgEl = document.getElementById('message');

  writeContactData(userID, firstname, lastname, phone, email, address)
    .then(() => {
      msgEl.textContent = 'Contact saved successfully!';
      msgEl.className = 'success';
      document.getElementById('contactForm').reset();
    })
    .catch((error) => {
      msgEl.textContent = 'Error: ' + error.message;
      msgEl.className = 'error';
    });
});

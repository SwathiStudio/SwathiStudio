// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDYcm-wrAizrEATgRVbpBe-O42mPo7RE7A",
    authDomain: "swathistudio-fe630.firebaseapp.com",
    databaseURL: "https://swathistudio-fe630-default-rtdb.firebaseio.com",
    projectId: "swathistudio-fe630",
    storageBucket: "swathistudio-fe630.appspot.com",
    messagingSenderId: "637418483680",
    appId: "1:637418483680:web:56652925fd208b7f218585"
};

firebase.initializeApp(firebaseConfig);




// }
var session = false;

// Get the email and password elements from the HTML
var email = document.getElementById("log_email");
var password = document.getElementById("log_password");


// Add a login event listener to the login button
document.getElementById("login-button").addEventListener("click", function () {
    // Get the email and password values
    var emailValue = email.value;
    var passwordValue = password.value;



    // Sign in with email and password
    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then(function (user) {
            // User is signed in
            
            alert("Logged in ", user.email);
        })
        .catch(function (error) {
            // Handle errors
            console.log("Error: ", error.message);
        });

});


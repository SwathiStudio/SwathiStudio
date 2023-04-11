
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




const getElementVal = (id) =>{
    return document.getElementById(id).value;
}

// var session = "inactive";

// document.getElementById("formreg").addEventListener("submit", createuser);
// function createuser(e) {
//     e.preventDefault();

//     var regname = getElementVal("reg_name");
//     var regemail = getElementVal("reg_email");
//     var regpassword = getElementVal("reg_pswd");
//     var regcnfpassword = getElementVal("reg_cnfpswd");

//     console.log(regname, regemail, regcnfpassword);

//     if (regpassword==regcnfpassword) {
//         saveData(regname, regemail, regcnfpassword);
        
        

//     } else {
//         alert("something went wrong!");
//     }
//     document.getElementById("formreg").reset();

    
// }

// // var reg_user = firebase.database().ref('Users/');
// var reg_user = firebase.database().ref('Users/');
// const saveData = (regname, regemail, regcnfpassword) => {
    
    
//     // var create_reg_user = reg_user.push();



//                                             // create_reg_user.set(ref(getDatabase,"users/"+ regname),{
//                                             //     name: regname,
//                                             //     email: regemail,
//                                             //     password : regcnfpassword
//                                             // })
//                                             // .then(() => {
//                                             //     alert("Registered!!");
//                                             // })
//                                             // .catch((error) => {
//                                             //     alert("error"+ error);
//                                             // })




//         firebase.database().ref('Users/'+ regname).set({
//         name: regname,
//         email: regemail,
//         password : regcnfpassword
//     })
//     .then(() =>{
//         alert("Registered :)");
//         session = "active";
//         if (session=="active") {
//             window.location.href='index.html';
//         }
//         else{
//             alert("something went wrong!!")
//         }
            
        

//     })
//     .catch((error) =>{
//         alert("error : " + error);
//     })
    
    
// }



document.getElementById("formreg").addEventListener("submit", createuser);
function createuser(e) {
    e.preventDefault();
    var email = document.getElementById("reg_email");
    var password = document.getElementById("reg_pswd");

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(function(user) {
            if (email.value === '' || !email.checkValidity()) {
                alert('Please enter a valid email address');
                email.focus();
                return;
            }

            // Check if password is empty or less than 6 characters long
            if (password.value === '' || password.value.length < 6) {
                alert('Please enter a password that is at least 6 characters long');
                password.focus();
                return;
            }
            alert("User registered: ", user);
            window.location.href = "login.html";
        })
        .catch(function(error) {
            console.log("Error registering user: ", error);
        });
}



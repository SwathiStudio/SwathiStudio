document.addEventListener("DOMContentLoaded", function () {
  // Show the "Instructor Requests" screen by default
  document.querySelector("#instructor-requests-screen").style.display = "block";
  document.querySelector("#addVideo-screen").style.display = "none";
  // // Hide the "Add Admin" screen
  document.querySelector("#add-admin-screen").style.display = "none";


  // Handle the click event on the "Instructor Requests" option
  document.querySelector("#instructor-requests").addEventListener("click", function () {
    document.querySelector("#instructor-requests-screen").style.display = "block";
    document.querySelector("#addVideo-screen").style.display = "none";
    document.querySelector("#add-admin-screen").style.display = "none";

  });

  document.querySelector("#add-video").addEventListener("click", function () {
    document.querySelector("#instructor-requests-screen").style.display = "none";
    document.querySelector("#addVideo-screen").style.display = "block";
    document.querySelector("#add-admin-screen").style.display = "none";

  });


  // Handle the click event on the "Add Admin" option
  document.querySelector("#add-admin").addEventListener("click", function () {
    document.querySelector("#add-admin-screen").style.display = "block";
    document.querySelector("#instructor-requests-screen").style.display = "none";
    document.querySelector("#addVideo-screen").style.display = "none";


  });
});


//----------------------------------------------------------------------------------------------------------------


// Initialize Firebase
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

// Get reference to the database
var database = firebase.database();

//----------------------------------------------------------------------------------------------------------------

// Get reference to the requests node
var requestsRef = database.ref("Instructors");

// Listen for changes to the requests
requestsRef.on("value", function (snapshot) {
  // Get the requests data
  var requests = snapshot.val();

  // Get reference to the requests table
  var requestsTable = document.getElementById("requests");

  // Clear any existing requests from the table
  requestsTable.innerHTML = "";

  // Loop through the requests data
  for (var key in requests) {
    if (requests.hasOwnProperty(key)) {
      var request = requests[key];

      if (!request.hasOwnProperty("status")) {

        // Create a new row for the request
        var row = document.createElement("tr");

        // Create cells for the name, email, and requestedOn fields
        var nameCell = document.createElement("td");
        nameCell.textContent = request.name;
        row.appendChild(nameCell);

        var danceStyleCell = document.createElement("td");
        danceStyleCell.textContent = request.danceStyle;
        row.appendChild(danceStyleCell);


        var certificationsCell = document.createElement("td");
        certificationsCell.textContent = request.certifications;
        row.appendChild(certificationsCell);


        var phoneCell = document.createElement("td");
        phoneCell.textContent = request.phone;
        row.appendChild(phoneCell);

        // Create a cell for the action buttons
        var actionCell = document.createElement("td");

        // Create the approve button
        var approveButton = document.createElement("button");
        approveButton.textContent = "Approve";
        approveButton.addEventListener("click", function () {
          // Update the request status in the database
          database.ref("Instructors/" + key).update({
            status: "approved"
          });
        });
        actionCell.appendChild(approveButton);

        // Create the deny button
        var denyButton = document.createElement("button");
        denyButton.textContent = "Deny";
        denyButton.classList.add("deny");
        denyButton.addEventListener("click", function () {
          // Update the request status in the database
          database.ref("Instructors/" + key).update({
            status: "denied"
          });
        });
        actionCell.appendChild(denyButton);

        row.appendChild(actionCell);

        requestsTable.appendChild(row);
      }
    }
  }
});


//----------------------------------------------------------------------------------------------------------------


const adminIdInput = document.querySelector("#admin-id");
const adminPasswordInput = document.querySelector("#admin-password");
const addAdminform = document.querySelector("#admin-form");

addAdminform.addEventListener("submit", (event) => {
  event.preventDefault();
  const adminId = adminIdInput.value;
  const adminPassword = adminPasswordInput.value;

  const adminRef = firebase.database().ref("admins");
  adminRef.push({
    id: adminId,
    password: adminPassword
  });

  alert("Admin added successfully!");
  adminIdInput.value = "";
  adminPasswordInput.value = "";

});


//----------------------------------------------------------------------------------------------------------------

// Get a reference to the storage service
var storageRef = firebase.storage().ref();

// Get a reference to the video file input element
var fileInput = document.getElementById('video_upload');

// Get a reference to the progress bar element
var progressBar = document.getElementById('upload-progress');

// Add a submit event listener to the form
document.getElementById('video-upload-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get the selected file
  var file = fileInput.files[0];
  if (!file) {
    alert('Please select a video file to upload.');
    return;
  }

  // Create a reference to the video file in Firebase Storage
  var category = document.getElementById('dance_style_category').value;
  var videoRef = storageRef.child('videos/' + category + '/' + file.name);


  // Upload the video file to Firebase Storage
  var uploadTask = videoRef.put(file);

  uploadTask.on('state_changed', function (snapshot) {
    // Track the upload progress
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    progressBar.value = progress;
  }, function (error) {
    // Handle unsuccessful uploads
    console.error('Error uploading video: ', error);
  }, function () {
    // Handle successful uploads
    alert('Video uploaded successfully');
  });
});


//--------------------------------------------------------------------------------------------------------


// On click of logout button
document.getElementById('logout').addEventListener('click', function() {
  // Clear session storage
  sessionStorage.clear();
  // Redirect to index page
  window.location.href = 'index.html';
});



// On load of admin page
window.onload = function() {
  // Check if user is logged in
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    // Redirect to login page
    window.location.href = 'login.html';
  }
};

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


//------------------------------------------------------------------------------------------------------------


// Show the loader when the page starts loading
document.addEventListener('DOMContentLoaded', function () {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
});

//----------------------------------------------------------------------------------------------------------------




// Reference to the database
var database = firebase.database();

// Reference to the Instructors node in the database
const dbRef = firebase.database().ref('Instructors');

const searchInput = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const searchPopup = document.getElementById('search-popup');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  dbRef.orderByChild('name').startAt(searchTerm).endAt(searchTerm + "\uf8ff").once('value', (snapshot) => {
    if (snapshot.exists()) {
      const instructors = snapshot.val();
      const instructorNames = Object.values(instructors).map(instructor => instructor.name);

      // Clear previous search results
      searchResults.innerHTML = '';

      // Create HTML elements for each search result
      instructorNames.forEach(name => {
        const resultElement = document.createElement('li');
        resultElement.textContent = name;
        resultElement.classList.add('search-result');

        // Attach a click event listener to each element that redirects to the instructor's profile page
        resultElement.addEventListener('click', () => {
          // Replace this with code that redirects to the instructor's profile page
          window.alert(`Redirecting to ${name}'s profile page`);
          searchPopup.classList.remove('show');
        });

        searchResults.appendChild(resultElement);
      });

      // Show the popup
      searchPopup.classList.add('show');
    } else {
      searchResults.innerHTML = '<li>No matching instructors found</li>';
      // Show the popup
      searchPopup.classList.add('show');
    }
  });
});

// Hide the popup when the user clicks outside of it
document.addEventListener('click', (event) => {
  if (!searchPopup.contains(event.target) && event.target !== searchButton) {
    searchPopup.classList.remove('show');
  }
});



//------------------------------------------------------------------------------------------------------------------

var database = firebase.database();
var user = firebase.auth().currentUser;
// var userID = user.uid;

// Get a reference to the form element
var form = document.querySelector('.instructor-form');

// Add a submit event listener to the form
form.addEventListener('submit', function (event) {
  event.preventDefault();

  var user = firebase.auth().currentUser;
  // Get the values of the form fields
  var name = form.querySelector('#name').value;
  var phone = form.querySelector('#phone').value;
  var danceStyle = form.querySelector('#dance-style').value;
  var certifications = form.querySelector('#certifications').value;

  // Get the current user
  // var user = firebase.auth().currentUser;

  if (user) {
    // If a user is logged in, get their UID
    var uid = user.uid;
    // Get a reference to the 'Instructors' node for the current user
    var instructorsRef = database.ref('Instructors/' + uid);
    // Push the form data to the 'Instructors' node
    instructorsRef.set({
      name: name,
      phone: phone,
      danceStyle: danceStyle,
      certifications: certifications,
    });
    // Clear the form fields
    form.querySelector('#name').value = '';
    form.querySelector('#phone').value = '';
    form.querySelector('#dance-style').value = '';
    form.querySelector('#certifications').value = '';
    // Close the popup
    form.querySelector('#instructor-close-btn').click();
    alert("Request submitted");
  } else {
    // If no user is logged in, display an error message
    alert('You must be logged in to submit the form.');
  }
});

//------------------------------------------------------------------------------------------------



// Get a reference to the navbar elements
const myVideosLink = document.querySelector('.navbar a[href="myvids.html"]');
const uploadForm = document.querySelector('#upload-form');
const instructorUpdate = document.querySelector("#instructor-link")

// Get the current user's ID from Firebase authentication
const currentUser = firebase.auth().currentUser;
const currentUserId = currentUser ? currentUser.uid : null;

// Check if the current user is an approved instructor
firebase.database().ref('Instructors').orderByChild('uid').equalTo(currentUserId).once('value', function (snapshot) {
  const instructor = snapshot.val();
  if (instructor && Object.keys(instructor).length > 0 && instructor[Object.keys(instructor)[0]].status === 'approved') {
    // If the user is an approved instructor, show the "My Videos" link and the upload form
    myVideosLink.style.display = 'flex';
    uploadForm.style.display = 'flex';
    instructorUpdate.innerHTML = "   You are an Instructor"
    var inst_link = document.getElementById("instructor-link");
    inst_link.replaceWith(...inst_link.childNodes);
  } else {
    // Otherwise, hide the "My Videos" link and the upload form
    myVideosLink.style.display = 'none';
    uploadForm.style.display = 'none';
  }
});



const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', () => {
  firebase.auth().signOut().then(function () {
    alert('User signed out');
    window.history.replaceState({}, '', '/login.html');
    window.location.reload();
  }).catch(function (error) {
    console.error('Error signing out user: ', error);
  });
});


//-------------------------------------------------------------------------------------------------------------------------------




// Hide the loader when the page has finished loading
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
});



//-----------------------------------------------------------------------------------------------------------------



function showPopup(danceStyle) {
  const popup = document.querySelector('.popup');
  const closeButton = popup.querySelector('.close');
  const videosContainer = popup.querySelector('.videos');

  // Show the popup
  popup.style.display = 'block';

  // Load videos from Firebase Storage
  const storageRef = firebase.storage().ref(`videos/${danceStyle}/`);
  storageRef.listAll().then((result) => {
    const videos = result.items;
    if (videos.length > 0) {
      // Clear the previous content of the videos container
      videosContainer.innerHTML = '';

      // Create and append video elements for each video
      videos.forEach((video) => {
        video.getDownloadURL().then((url) => {
          const videoElement = document.createElement('iframe');
          videoElement.setAttribute('src', url);
          videoElement.setAttribute('width', '100%');
          videoElement.setAttribute('height', '315');
          videosContainer.appendChild(videoElement);
        });
      });

      // Set the videos container as a grid container
      videosContainer.style.display = 'grid';
      videosContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
      videosContainer.style.gridGap = '1rem';
      videosContainer.style.padding = '1rem';
    } else {
      // Display a message if no videos are found for the selected dance style
      videosContainer.innerHTML = 'No videos found';
    }
  });

  // Add an event listener to the close button to hide the popup
  closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

// Add event listeners to the dance style links
var danceStyleLinks = document.querySelectorAll('.stylebox-container a');
danceStyleLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    var danceStyle = link.querySelector('p').textContent.toLowerCase();
    showPopup(danceStyle);
  });
});

//----------------------------------------------------------------------------------------------------


// Get the admin login link and popup elements
var adminLoginLink = document.getElementById('admin_login');
var adminLoginPopup = document.getElementById('admin-login-popup');

// Add a click event listener to the admin login link
adminLoginLink.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default link behavior

  // Show the admin login popup
  adminLoginPopup.style.display = 'block';
});

// Add a submit event listener to the admin login form
var adminLoginForm = adminLoginPopup.querySelector('form');
adminLoginForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the admin ID and password
  var adminId = document.getElementById('admin-id').value;
  var adminPassword = document.getElementById('admin-password').value;

  // TODO: Add login authentication logic here

  // Hide the admin login popup
  adminLoginPopup.style.display = 'none';
});


document.getElementById('close-admin-login-popup').addEventListener('click', function () {
  document.getElementById('admin-login-popup').style.display = 'none';
});

//---------------------------------------------------------------------------------------------------------------


const adminIdInput = document.querySelector("#admin-id");
const adminPasswordInput = document.querySelector("#admin-password");
const loginForm = document.querySelector("#admin_login_form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const adminId = adminIdInput.value;
  const adminPassword = adminPasswordInput.value;

  const adminRef = firebase.database().ref("admins");
  adminRef.orderByChild("id").equalTo(adminId).once("value", function (snapshot) {
    if (snapshot.exists()) {
      const admin = snapshot.val()[Object.keys(snapshot.val())[0]];
      if (admin.password === adminPassword) {
        alert("Login successful!");
        // After successful login
        sessionStorage.setItem('loggedIn', 'true');

        window.location.href = "admin.html";
      } else {
        alert("Incorrect password. Please try again.");
      }
    } else {
      alert("Admin with ID " + adminId + " does not exist.");
    }
  });
});

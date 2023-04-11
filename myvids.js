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




const showVideosButton = document.getElementById('show-videos-button');
const videoList = document.getElementById('video-list');
const loadingSpinner = document.getElementById('loading-spinner');





firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    showVideosButton.addEventListener('click', () => {
      // code to retrieve videos
      const user = firebase.auth().currentUser;
    loadingSpinner.style.display = 'block';
    // Create a storage reference
    const storageRef = firebase.storage().ref();

    // Create a reference to the videos folder for the logged in user
    const videosRef = storageRef.child(`videos/${user.uid}`);

    // Get a list of all the videos in the folder
    videosRef.listAll().then((result) => {
      videoList.innerHTML = '';
      result.items.forEach((videoRef) => {
        // Get the download URL for each video
        videoRef.getDownloadURL().then((url) => {
          // Create a new video element for each video
          const video = document.createElement('video');
          video.width = 320;
          video.height = 240;
          video.controls = true;
          video.src = url;

          // Append the video element to the video list
          const videoList = document.getElementById('video-list');
          videoList.appendChild(video);
        });
      });
      loadingSpinner.style.display = 'none';
    }).catch(function (error) {
      console.log("Error in fetching videos", error);
    });
    });
  } else {
    console.error('User is not logged in');
  }
});



const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', () => {
  firebase.auth().signOut().then(function () {
    console.log('User signed out');
  }).catch(function (error) {
    console.error('Error signing out user: ', error);
  });
});



// const firebaseConfig = {
//     apiKey: "AIzaSyDYcm-wrAizrEATgRVbpBe-O42mPo7RE7A",
//     authDomain: "swathistudio-fe630.firebaseapp.com",
//     databaseURL: "https://swathistudio-fe630-default-rtdb.firebaseio.com",
//     projectId: "swathistudio-fe630",
//     storageBucket: "swathistudio-fe630.appspot.com",
//     messagingSenderId: "637418483680",
//     appId: "1:637418483680:web:56652925fd208b7f218585"
// };

// firebase.initializeApp(firebaseConfig);

// Listen for form submit
document.getElementById('upload-form').addEventListener('submit', uploadVideo);

function uploadVideo(event) {
  event.preventDefault();

  // Get the current user
  const user = firebase.auth().currentUser;

  // Check if user is logged in
  if (user) {
    // Get the video file
    const videoFile = document.getElementById('video-input').files[0];

    // Create a storage reference
    const storageRef = firebase.storage().ref();

    // Create a reference to the video file for the logged in user
    const videoRef = storageRef.child(`videos/${user.uid}/${videoFile.name}`);

    // Upload the video file
    const task = videoRef.put(videoFile);

    // Listen for upload progress
    task.on('state_changed', (snapshot) => {
      // Get the upload progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    }, (error) => {
      // Handle error
      console.error(error);
    }, () => {
      // Get the download URL
      task.snapshot.ref.getDownloadURL().then((url) => {
        // Store the download URL in the Realtime Database
        firebase.database().ref(`users/${user.uid}/videos`).push({
          name: videoFile.name,
          url: url
        });
      });
    });
  } else {
    // Handle case where user is not logged in
    console.error('User is not logged in');
  }
}

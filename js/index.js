// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
// User is signed in, see docs for a list of available properties
// https://firebase.google.com/docs/reference/js/v8/firebase.User
// var uid = user.uid;

document.getElementById("logout").onclick = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "signin.html";
    })
    .catch((error) => {
      // An error happened.
    });
};
//   }
// });

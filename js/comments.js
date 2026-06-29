firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((userDoc) => {
        let user = userDoc.data();
        // console.log(user);
      })
      .catch((error) => {
        let errorMessage = error.message;
        console.error(errorMessage);
      });

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
          let errorMessage = error.message;
          console.error(errorMessage);
        });
    };
  } else {
    window.location.href = "../signin.html";
  }
});

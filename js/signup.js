// 1. Create User Account using Email & Password
document.getElementById("signup").onclick = () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          name,
          email: user.email,
          userId: user.uid,
          createdAt: user.metadata.creationTime,
        })
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorMessage);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
};

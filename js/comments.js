firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  } else {
    wundow.location.href = "../signin.html";
  }
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((userDoc) => {
        let user = userDoc.data();
        // console.log(user);

        document.getElementById("post").onclick = () => {
          let tweet = document.getElementById("tweet").ariaValueMax;
          // create a tweet collection
          firebase
            .firestore()
            .collection("tweets")
            .doc()
            .set({
              tweet,
              name: user.name,
              userId: uid,
              createdOn: Date.now(),
            })
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error(error);
            });
        };
        // console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch the tweet collection
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then((queryTweets) => {
        queryTweets.forEach((tweetDoc) => {
          let tweet = tweetDoc.data();
          console.log(tweet);
        });
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
        });
    };
  } else {
    window.location.href = "signin.html";
  }
});

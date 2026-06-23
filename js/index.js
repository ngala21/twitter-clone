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
          let tweet = document.getElementById("tweet").value;
          // Create a tweet collection
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
        console.error(error);
      });

    // Fetch the tweet collection
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then((queryTweets) => {
        queryTweets.forEach((tweetDoc) => {
          let tweet = tweetDoc.data();
          // console.log(tweet);

          let tweetHTML = generateTweetHTML(tweet);

          //* Append each tweet to our tweetContainer
          document
            .getElementById("tweetContainer")
            .insertAdjacentHTML("afterbegin", tweetHTML);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    // ..
    function generateTweetHTML(tweet) {
      return `
        <div class="tweet">
              <img
                src="./images/profile-image.jpg"
                class="tweet-avatar"
                alt="Avatar"
              />

              <div class="tweet-content">
                <div class="tweet-header">
                  <span class="tweet-name">${tweet.name}</span>
                  <span class="tweet-username">@${tweet.name}</span>
                </div>

                <div class="tweet-text">${tweet.tweet}</div>

                <div class="tweet-actions">
                  <div class="tweet-action">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                      ></path>
                    </svg>
                    <span>2</span>
                  </div>

                  <div class="tweet-action">
                    <svg viewBox="0 0 24 24">
                      <path d="M17 1l4 4-4 4"></path>
                      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                      <path d="M7 23l-4-4 4-4"></path>
                      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                    </svg>
                    <span>200</span>
                  </div>

                  <div class="tweet-action">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      ></path>
                    </svg>
                    <span>2.4M</span>
                  </div>

                  <div class="tweet-action">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
                      ></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                  </div>
                </div>
              </div>
            </div>`;
    }
  } else {
    window.location.href = "../signin.html";
  }
  //

  // Fetch the tweet collection
  // firebase
  //   .firestore()
  //   .collection("tweets")
  //   .get()
  //   .then((queryTweets) => {
  //     queryTweets.forEach((tweetDoc) => {
  //       let tweet = tweetDoc.data();
  //       console.log(tweet);
  //     });
  //   });
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
  // } else {
  //   window.location.href = "signin.html";
  // }
});

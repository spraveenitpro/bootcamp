var apiroot = "https://wp.local/wp-json";
var articleContainer = document.querySelector("main#main");
var listPosts = {};

/**
 *  init - Initialize the listing of posts
 */

listPosts.init = function() {
  console.log("Welcome to REST!!");
  fetch(apiroot + "/wp/v2/posts/")
    .then(response => {
      if (response.status !== 200) {
        console.log("Problem with status code: " + response.status);
        return;
      }
      response.json().then(posts => {
        listPosts.clearPosts();
        listPosts.render(posts);
      });
    })
    .catch(function(err) {
      console.log("Error", err);
    });
};

listPosts.init();

/**
 *render - Display posts on the page
 *
 * @param {*} posts
 */
listPosts.render = function(posts) {
  for (let post of posts) {
    listPosts.renderPost(post);
    //console.log(post);
  }
};

/**
 * ClearPosts - Clear posts from the page
 */

listPosts.clearPosts = function() {
  console.log("clear posts");
};

/**
 * rendePost - Displays the individual post on the page
 *
 *  @param {Object} post Individual Post
 *
 */

listPosts.renderPost = function(post) {
  //console.log(post.title);
  var articleEl = document.createElement("article");

  var titleEl = document.createElement("h2");
  var titleLinkEl = document.createElement("a");
  var title = document.createTextNode("");

  titleEl.classList.add("entry-title");
  titleLinkEl.appendChild(title);
  titleLinkEl.innerHTML = post.title.rendered;
  titleLinkEl.href = post.link;
  titleLinkEl.target = "_blank";
  titleEl.appendChild(titleLinkEl);

  var contentEl = document.createElement("div");
  var content = document.createTextNode("");

  contentEl.classList.add("entry-content");
  contentEl.appendChild(content);
  contentEl.innerHTML = post.content.rendered;

  articleEl.classList.add("post");
  articleEl.appendChild(titleEl);
  articleEl.appendChild(contentEl);

  articleContainer.appendChild(articleEl);
};

// Import components
import { render as Posts, clear as clearPosts } from "./Posts";

// Import configs
import { state, setState } from "../state";
import { getEl, createEl } from "../helpers.js";
import { main, backBtn, editor } from "../config";

import { loadPost } from "./Editor";
/**
 * Displays a post on the page from state.post
 *
 * @param {Object} event - Event object
 */
export function render(event) {
  // Setup the post article element
  const article = createEl("article");
  article.classList.add("post");
  article.innerHTML = `
      <p><a id="${backBtn}" href="#">&lt; Back to Posts</a></p>
      <h1 class="entry-title">${state.post.title.rendered}</h1>
      <div class="entry-content">${state.post.content.rendered}</div>
    `;

  // Attach event listeners to back button
  article.querySelector(`#${backBtn}`).addEventListener("click", event => {
    event.preventDefault();
    setState("post", null);
    Posts();
  });

  // If logged in then display the edit links

  if (state.loggedIn) {
    article.appendChild(editLink(state.post));
  }

  // Clear the posts from the page
  clearPosts();

  // Add the post to the page
  getEl(main).append(article);
}

/**
 * Creates an Edit link to the post
 *
 * @export
 * @param {Object} post The Post to be edited
 */
export function editLink(post) {
  const link = createEl("a");
  link.href = "#edit-post";
  link.classList.add("edit");
  link.innerText = "Edit";

  link.addEventListener("click", () => {
    setState("editorPost", post.id);
    console.log(state.editorPost);
    loadPost();
  });

  return link;
}

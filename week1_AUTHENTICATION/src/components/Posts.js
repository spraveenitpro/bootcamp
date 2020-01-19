// Import Libraries

import axios from "axios";

// Import configs

import { state, setState } from "../state";
import { getEl, createEl } from "../helpers";
import { main } from "../config";

export function init(event) {
  if (event) event.preventDefault();

  axios
    .get(state.restUrl + "wp/v2/posts", {
      params: {
        per_page: 5
      }
    })
    .then(({ data: posts }) => {
      setState("posts", posts);
      render();
    });
}
/**
 * Render single post to the page from state
 */

export function render() {
  clear();
  state.posts.map(post => {
    const article = createEl("article");
    article.classList.add("post");
    article.innerHTML = `
        <h2 class="entry-title">
          <a href="#${post.slug}">${post.title.rendered}</a>
        
        </h2>
         <div class="entry-content">${post.excerpt.rendered}</div>
    
    `;
    article.querySelector(".entry-title a").addEventListener("click", event => {
      event.preventDefault();
    });
    getEl(main).appendChild(article);
  });
}
/**
 * Clears the main post Area
 */

export function clear() {
  getEl(main).innerHTML = "";
}

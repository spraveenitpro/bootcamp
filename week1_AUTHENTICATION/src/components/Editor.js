// Import configs
import { state } from "../state";
import { getEl, isRendered } from "../helpers";
import { save } from "../crud";
import { primary, main, editor, editorTitle, editorContent } from "../config";
import axios from "axios";
import Cookies from "js-cookie";

/**
 * render - Displays the editor on the page
 *
 * @export
 */
export function render() {
  // Make sure user is logged in or editor is not already rendered
  if (state.loggedIn !== true || isRendered(editor)) {
    return;
  }

  // Setup the editor form
  const form = document.createElement("form");
  form.id = editor;
  form.innerHTML = `
    <h3 class="add-new-post">Add New Post</h3>
    <h3><input id="${editorTitle}" type="text" name="title" placeholder="Enter title here" value=""></h3>
    <div id="content-editor"></div>
    <p><button class="button">Save</button></p>
  `;

  // Add the login form to the page
  getEl(primary).insertBefore(form, getEl(main));

  // Initialize the quill editor
  var quill = new Quill(`#${editorContent}`, {
    theme: "snow"
  });

  // Add listener to save button that calls save
  getEl(editor).addEventListener("submit", process);
}

/**
 * Load Post within the editor
 *
 * @export
 */
export function loadPost() {
  // Get the token for an authorized request
  const token = Cookies.get(state.token);

  // Setup an authenticated request for posts
  axios
    .get(state.restUrl + "wp/v2/posts/" + state.editorPost, {
      // Set context to edit to get raw post content for editing
      params: {
        context: "edit"
      },
      // Set headers for authenticated request
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
    .then(response => {
      // Go back up to the edit form
      window.scrollTo(0, 50);
      // Set the value of the post title input field
      getEl(editorTitle).value = response.data.title.raw;
      // Set the value of the post content from the editor
      const contentEditor = Quill.find(getEl(editorContent));
      // Set the editor to receive the raw content for editing
      contentEditor.root.innerHTML = response.data.content.raw;
      // Make sure to bind the post to the save method
    });
}

/**
 * Processes the saving or updating of the form
 *
 * @export
 * @param {Object} event Event object
 */
export function process(event) {
  // Get the Quill editor
  const quillEditor = Quill.find(getEl(editorContent));
  // Setup post object to save with updated content
  const post = {
    // Get the post id
    id: state.editorPost,
    // Get the editor title
    title: getEl(editorTitle).value,
    // Get the editor content
    content: quillEditor.root.innerHTML,
    // Set the status to publish
    status: "publish"
  };

  // Prevent default even behavior
  event.preventDefault();

  console.log(post);
  // Quick and dirty validation
  if (!post.title || !post.content) {
    alert("All fields required");
    return;
  }

  // Finally save the post
  save(post);
}

/**
 * clear - Clear the data from the editor form
 *
 * @export
 */
export function clear() {
  // Set the editor title field to empty
  getEl(editorTitle).value = "";
  // Get the Quill editor
  const quillEditor = Quill.find(getEl(editorContent));
  // Clear the editor content
  quillEditor.root.innerHTML = "";
  // Set the form method back to post
  setState("editorPost", null);
}

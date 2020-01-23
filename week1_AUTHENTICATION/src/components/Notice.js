import { wrapper, message as messageEl } from "../config";
import { getEl, createEl, removeEl } from "../helpers";

/**
 *
 * Render Messages when performing actions
 * @export
 * @param {*} type
 */
export function render(type) {
  const messages = {
    saved: "This post has been saved!",
    loggedin: "Welcome! You are logged in!",
    loggedout: "You are logged out",
    updated: "This post has been updated!",
    required: "All fields are required!",
    failed: "This action failed :(",
    deleted: "This post has been deleted!"
  };

  // Setup notice markup

  const message = createEl("div");
  message.id = messageEl;
  message.classList.add(type);
  message.innerHTML = `<p>${messages[type]}</p>`;

  // Remove Message if already displayed

  removeEl(messageEl);
  // Get the container for the page
  const container = getEl(wrapper);
  container.insertBefore(message, container.childNodes[0]);

  setTimeout(() => {
    removeEl(messageEl);
  }, 1600);
}

// Import libraries
import axios from "axios";

// Import configs
import { state, setState } from "../state";
import { getEl } from "../helpers";
import { siteName, siteDescription } from "../config";

/**
 * Gets the site information and call it to render
 *  @export
 */

export function init() {
  getEl(siteName)
    .querySelector("a")
    .addEventListener("click", event => {
      event.preventDefault();
    });

  axios
    .get(state.restUrl)
    .then(({ data: apiInfo }) => {
      setState("siteName", apiInfo.name);
      setState("siteDescription", apiInfo.description);
      update();
    })
    .catch(error => {
      console.error(error);
    });
}
/**
 * Updated the Header with the current site name and description
 * @export
 */

export function update() {
  getEl(siteName).querySelector("a").innerText = state.siteName;
  getEl(siteDescription).innerText = state.siteDescription;
}

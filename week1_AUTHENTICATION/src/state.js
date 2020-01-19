// Set state object with values that are changed programatically
const state = {
  restUrl: "https://woocommerce.mystagingwebsite.com/wp-json/",
  siteName: "Name of the Site",
  siteDescription: "Another Decoupled Site",
  posts: null,
  post: null
};
/**
 * Handles updating the state
 *
 * @param {string} toSet The property from state to set
 * @param {*} newValue The new value to set
 */
const setState = (toSet, newValue) => {
  state[toSet] = newValue;
};

//setState("restUrl", "google.com");
export { state, setState };

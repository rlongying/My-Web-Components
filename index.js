import bindTagSelectEvents from './components/tagselect/tags.js';
import { includeHTML } from './utils.js';
window.onload = async function () {
  // loading all UIs
  await includeHTML();
  bindTagSelectEvents();
};

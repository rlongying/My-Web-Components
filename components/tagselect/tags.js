import { bindEvent, findParentWithClass } from '../../utils.js';

function toggleDropDown(e) {
  let tagselectContainer = findParentWithClass(e.target, 'tags-select');

  if (!tagselectContainer) {
    return;
  }

  const dropdown = tagselectContainer.querySelector('.dropdown-list');
  dropdown.classList.toggle('hidden');
}

function clearInput(e) {
  const tagselectContainer = findParentWithClass(e.target, 'tags-select');
  if (!tagselectContainer) {
    return;
  }
  const inputs = tagselectContainer.querySelector('.inputs');
  while (inputs.firstChild) {
    inputs.removeChild(inputs.lastChild);
  }
}

function closeTag(e) {
  const tagContainer = findParentWithClass(e.target, 'tag');
  if (!tagContainer) {
    return;
  }
  tagContainer.remove();
}

export default function bindTagSelectEvents() {
  const dropdownControls = document.querySelectorAll('.dropdown-control');
  bindEvent(dropdownControls, 'click', toggleDropDown);
  //   for (let i = 0; i < dropdownControls.length; i++) {
  //     dropdownControls[i].addEventListener('click', toggleDropDown);
  //   }

  const inputs = document.querySelectorAll('.inputs');
  bindEvent(inputs, 'click', toggleDropDown);
  //   for (let i = 0; i < inputs.length; i++) {
  //     inputs[i].addEventListener('click', toggleDropDown);
  //   }

  const clearInputButtons = document.querySelectorAll('.clear-input');
  bindEvent(clearInputButtons, 'click', clearInput);
  //   for (let i = 0; i < clearInputButtons.length; i++) {
  //     clearInputButtons[i].addEventListener('click', clearInput);
  //   }

  const tags = document.querySelectorAll('.tag');
  bindEvent(tags, 'click', (e) => {
    e.stopPropagation();
  });
  //   for (let i = 0; i < clearInputButtons.length; i++) {
  //     tags[i].addEventListener('click', function (e) {
  //       e.stopPropagation();
  //     });
  //   }

  const closeTags = document.querySelectorAll('.close-tag');
  bindEvent(closeTags, 'click', closeTag);
}

import { bindEvents, findParentWithClass, bindEvent } from '../../utils.js';

function toggleDropDown(e) {
  let tagselectContainer = findParentWithClass(e.target, 'tags-select');

  if (!tagselectContainer) {
    return;
  }

  const dropdown = tagselectContainer.querySelector('.dropdown-list');
  dropdown.classList.toggle('hidden');
}

function stopEventPropagation(e) {
  e.stopPropagation();
}

function onClearTagsClick(e) {
  // stop the event from trigging the click event of its parent
  // container, which will toggle the dropdown list
  e.stopPropagation();
  const tagselectContainer = findParentWithClass(e.target, 'tags-select');
  if (!tagselectContainer) {
    return;
  }
  clearTags(tagselectContainer);
  clearInputs(tagselectContainer);
  resetOptions(tagselectContainer);
}

function resetOptions(select) {
  select.querySelectorAll('option').forEach((option) => {
    option.selected = false;
  });
}

function createTag(text) {
  const tagDiv = document.createElement('div');
  tagDiv.classList.add('tag');
  bindEvent(tagDiv, 'click', stopEventPropagation);

  const tagTextContainer = document.createElement('span');
  tagTextContainer.classList.add('tag-text');
  tagTextContainer.textContent = text;
  tagDiv.appendChild(tagTextContainer);

  const closeTagContainer = document.createElement('span');
  closeTagContainer.classList.add('close-tag');
  closeTagContainer.innerHTML = '&#215;';
  bindEvent(closeTagContainer, 'click', closeTag);
  tagDiv.appendChild(closeTagContainer);
  return tagDiv;
}

function addTag(select, text) {
  const inputsContainer = select.querySelector('.inputs');
  inputsContainer.appendChild(createTag(text));
}

function clearTags(select) {
  const tags = select.querySelector('.inputs');
  // clear tags
  while (tags.firstChild) {
    tags.removeChild(tags.lastChild);
  }
}

function clearInputs(select) {
  // clear input tag
  const inputs = select.querySelectorAll('input');
  inputs.forEach((input) => {
    input.remove();
  });
}

function closeTag(e) {
  const tagContainer = findParentWithClass(e.target, 'tag');
  const select = findParentWithClass(e.target, 'tags-select');
  const textContent = tagContainer.querySelector('.tag-text').textContent;
  if (!tagContainer) {
    return;
  }
  tagContainer.remove();

  // de select option
  const options = select.querySelectorAll('option');
  let value = null;
  for (let i = 0; i < options.length; i++) {
    if (options[i].textContent === textContent) {
      options[i].selected = false;
      value = options[i].value;
      break;
    }
  }

  // remove input
  removeInput(select, value);
}

function addInput(select, value, name) {
  const input = createHiddenInput(value, name);
  select.appendChild(input);
}

function removeInput(select, value) {
  const inputs = select.querySelectorAll('input');
  inputs.forEach((input) => {
    if (input.value === value) {
      input.remove();
    }
  });
}

function createHiddenInput(value, name) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  return input;
}

function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

// function modifyInputs(select, inputs) {
//   inputs.forEach((input) => {
//     select.appendChild(input);
//   });
// }

function modifyOptions(dropdown, options) {
  options.forEach((option) => {
    dropdown.appendChild(option);
  });
}

export function bindData(data, select, name) {
  const dropdown = select.querySelector('.dropdown-list');
  let inputs = [];
  let options = [];
  function selectOption(e) {
    const option = e.target;
    if (option.selected) {
      return;
    }
    option.selected = true;
    addInput(select, option.value, name);
    addTag(select, option.textContent);
  }
  data.forEach((option) => {
    const optionElement = createOption(option.value, option.text);
    options.push(optionElement);
    bindEvent(optionElement, 'click', selectOption);
  });
  modifyOptions(dropdown, options);
}

function closeAllSelect(current) {
  document.querySelectorAll('.dropdown-list').forEach((dropdown) => {
    if (dropdown != current && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });
}

export default function bindTagSelectEvents() {
  const dropdownControls = document.querySelectorAll('.dropdown-control');
  bindEvents(dropdownControls, 'click', toggleDropDown);
  //   for (let i = 0; i < dropdownControls.length; i++) {
  //     dropdownControls[i].addEventListener('click', toggleDropDown);
  //   }

  const inputs = document.querySelectorAll('.inputs');
  bindEvents(inputs, 'click', toggleDropDown);
  //   for (let i = 0; i < inputs.length; i++) {
  //     inputs[i].addEventListener('click', toggleDropDown);
  //   }

  const clearInputButtons = document.querySelectorAll('.clear-input');
  bindEvents(clearInputButtons, 'click', onClearTagsClick);
  //   for (let i = 0; i < clearInputButtons.length; i++) {
  //     clearInputButtons[i].addEventListener('click', clearInput);
  //   }

  //   const tags = document.querySelectorAll('.tag');
  //   bindEvents(tags, 'click', stopEventPropagation);
  //   for (let i = 0; i < clearInputButtons.length; i++) {
  //     tags[i].addEventListener('click', function (e) {
  //       e.stopPropagation();
  //     });
  //   }

  //   const closeTags = document.querySelectorAll('.close-tag');
  //   bindEvents(closeTags, 'click', closeTag);

  // click outer of dropdown list will hide it.
  document.addEventListener('click', closeAllSelect);

  //   document.querySelectorAll('.tags-select').forEach((select) => {
  //     select.addEventListener('click', function (e) {
  //       e.stopPropagation();

  //     });
  //   });

  document.querySelectorAll('.tags-input').forEach((input) => {
    input.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextElementSibling.classList.toggle('hidden');
    });
  });
}

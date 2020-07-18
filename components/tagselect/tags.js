function toggleDropDown(e) {
  const outerContainer = e.target.parentNode.parentNode;
  const dropdown = outerContainer.querySelector('.dropdown-list');
  dropdown.classList.toggle('hidden');
}

function clearInput(e) {
  const outerContainer = e.target.parentNode;
  const inputs = outerContainer.querySelector('.inputs');
  while (inputs.firstChild) {
    inputs.removeChild(inputs.lastChild);
  }
}

function closeTag(e) {
  e.target.parentNode.remove();
}

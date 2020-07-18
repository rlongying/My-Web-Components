function renderElement(element, file) {
  return new Promise((resolver, reject) => {
    /* Make an HTTP request using the attribute value as the file name: */
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          element.innerHTML = this.responseText;
        }
        if (this.status == 404) {
          element.innerHTML = 'Page not found.';
          reject('loading failed...');
        }
        /* Remove the attribute, and call this function once more: */
        element.removeAttribute('w3-include-html');
        includeHTML();
        resolver('success');
      }
    };
    xhr.open('GET', file, true);
    xhr.send();
  });
}

/* this function is directly copied from: https://www.w3schools.com/howto/howto_html_include.asp with only a few changes of variable names */
async function includeHTML() {
  var elements, element, file, xhr;
  /* Loop through a collection of all HTML elements: */
  elements = document.body.getElementsByTagName('*');
  for (let i = 0; i < elements.length; i++) {
    element = elements[i];
    /*search for elements with a certain attribute */
    file = element.getAttribute('w3-include-html');
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      await renderElement(element, file);
      /* Exit the function: */
      return;
    }
  }
}

const bindEvent = (elements, eventType, event) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, event);
  }
};

window.onload = async function () {
  console.log('hello');
  await includeHTML();

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
};

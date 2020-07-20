export async function renderElement(element, file) {
  let xhr;
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
        // await includeHTML();
        resolver('success');
      }
    };
    xhr.open('GET', file, true);
    xhr.send();
  });
}

/* this function is directly copied from: https://www.w3schools.com/howto/howto_html_include.asp with only a few changes of variable names */
export async function includeHTML() {
  var elements, element, file;
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
      // return;
    }
  }
}

/**
 * bind events for a list of elements
 * @param {HTMLElement} elements
 * @param {string} eventType
 * @param {function} handler
 */
export const bindEvents = (elements, eventType, handler) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, handler);
  }
};

export const bindEvent = (element, eventType, handler) => {
  element.addEventListener(eventType, handler);
};

/**
 * find the parent node with a specified class name
 * return null if not found
 * @param {HTMLElement} cur
 * @param {string} className
 * @returns parent node if found, otherwise null
 */
export function findParentWithClass(cur, className) {
  // find the container of tags select
  while (
    cur.classList &&
    !cur.classList.contains(className) &&
    cur.nodeName.toLowerCase() != 'body'
  ) {
    cur = cur.parentNode;
  }

  if (!cur.classList || !cur.classList.contains(className)) {
    // no match found
    return null;
  }
  return cur;
}

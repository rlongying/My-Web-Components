import bindTagSelectEvents, { bindData } from './components/tagselect/tags.js';
import { includeHTML } from './utils.js';
window.onload = async function () {
  // loading all UIs
  await includeHTML();
  bindTagSelectEvents();
  const data1 = [
    {
      value: 1,
      text: 'hello',
    },
    {
      value: 2,
      text: 'hello2',
    },
    {
      value: 3,
      text: 'hello3',
    },
  ];

  const data2 = [
    {
      value: 11,
      text: 'word',
    },
    {
      value: 22,
      text: 'word',
    },
    {
      value: 33,
      text: 'word33',
    },
  ];

  const select = document.querySelectorAll('.tags-select');
  bindData(data1, select[0], 'test1');
  bindData(data2, select[1], 'test2');
};

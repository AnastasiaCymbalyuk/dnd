/* eslint-disable no-param-reassign */

// появление формы
export default function showForm(elem) {
  const parent = elem.closest('.form_box');
  const form = parent.querySelector('.form_task');
  elem.style.display = 'none';
  form.style.display = 'block';
}

// появление ссылки
export function closeForm(name) {
  const form = document.querySelector(`form[name=${name}]`);
  const parentForm = form.closest('.form_box');
  const link = parentForm.querySelector('.link_add');
  form.style.display = 'none';
  link.style.display = 'inline';
}

// добавление объектов из формы
export function renderingTask(obj, text) {
  obj.insertAdjacentHTML('beforeend', `
  <div class="task" draggable="true">
    <p class="li">${text}</p><span class="close_text">&#x2716;</span>
  </div>
`);
}

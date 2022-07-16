import { renderingTask } from './dom';

export default class Save {
  constructor() {
    this.nameClass = ['todo', 'in_progress', 'done'];
  }

  // запись в память

  updateSave() {
    for (const elem of this.nameClass) {
      const tasks = document.querySelector(`.${elem}`);
      const list = tasks.querySelectorAll('.li');
      if (list.length > 0) {
        const arr = [];
        for (const item of list) {
          arr.push(item.textContent);
        }
        localStorage[elem] = JSON.stringify(arr);
      } else {
        localStorage.removeItem(elem);
      }
    }
  }

  // загрузка из памяти
  renderingSave() {
    for (const elem of this.nameClass) {
      const li = JSON.parse(localStorage[elem]);
      const task = document.querySelector(`.${elem}`);
      for (const item of li) {
        renderingTask(task, item);
      }
    }
  }
}

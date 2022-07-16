import { closeForm, renderingTask } from './dom';
import Save from './save';

export default class Task {
  constructor(name, elem) {
    this.name = name;
    this.elem = elem;
  }

  addTask() {
    const task = document.querySelector(`.${this.name}`);
    this.elem.forEach((element) => {
      if (element.name === 'text') {
        renderingTask(task, element.value);
        new Save().updateSave();
      }
    });
    closeForm(this.name);
  }
}

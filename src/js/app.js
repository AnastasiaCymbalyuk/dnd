import showForm, { closeForm } from './dom';
import Task from './value';
import Save from './save';

const link = document.querySelectorAll('.link_add');
const close = document.querySelectorAll('.close_task');
const task = document.querySelectorAll('.form_task');
const tasksBox = document.querySelectorAll('.tasks_box');
const locSave = new Save();

// загрузка из памяти при обновлении страницы
document.addEventListener('DOMContentLoaded', () => {
  locSave.renderingSave();
});

// появление формы
for (const item of link) {
  item.addEventListener('click', (event) => {
    showForm(event.target);
  });
}

// закрытие формы
for (const item of close) {
  item.addEventListener('click', (event) => {
    const nameForm = event.target.closest('.form_task').name;
    closeForm(nameForm);
  });
}

// создание новой задачи через форму
for (const item of task) {
  item.addEventListener('submit', (event) => {
    event.preventDefault();
    const { name } = event.target;
    const elem = [...event.target.elements];
    const obj = new Task(name, elem);
    obj.addTask();
    locSave.updateSave();
  });
}

// начало дропа

// не понимаю как можно изменить курсор без mousedown/mouseleave/mouseup?
// сделать dnd через эти события не получилось т.к событие click
// которое вызывается после mouseup перекрывает обработчик события на
// крестике который удаляет задачу попытки перевесить обработчик
// не помогли как и попытки работы с погружением и всплытием
// как навесить обработчик события на задачу чтобы он не конфликтовал с dnd?

// не понимаю каким образом при наведении карточки необходимо создавать
// выделенное место в возможной позиции через какое событие и как получить доступ
// к этому месту и как создать саму область ? через временный dom элемент
// или какие-то отступы?

function startDnd(event) {
  const tsk = event.target.closest('.task');
  const { width, height } = tsk.getBoundingClientRect();
  tsk.style.position = 'absolute';
  tsk.style.width = `${width}px`;
  tsk.style.height = `${height}px`;
  tsk.style.zIndex = 1000;
  const shiftX = event.clientX - tsk.getBoundingClientRect().left;
  const shiftY = event.clientY - tsk.getBoundingClientRect().top;
  let droppableBelow;
  function onOver(e) {
    e.preventDefault();
  }
  tsk.addEventListener('dragover', onOver);
  function onDrag(e) {
    tsk.style.left = `${e.pageX - shiftX}px`;
    tsk.style.top = `${e.pageY - shiftY}px`;
    tsk.hidden = true;
    const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    tsk.hidden = false;
    droppableBelow = elemBelow.closest('.tasks_box');
  }
  tsk.addEventListener('drag', onDrag);
  function onSeup() {
    if (droppableBelow) {
      droppableBelow.append(this);
      locSave.updateSave();
    }
  }
  tsk.addEventListener('drop', onSeup);
}

// конец дропа
function endDnd(event) {
  const tsk = event.target.closest('.task');
  tsk.style.position = 'relative';
  tsk.style.cursor = 'auto';
  tsk.style.height = null;
  tsk.style.width = null;
  tsk.style.zIndex = null;
  tsk.style.top = null;
  tsk.style.left = null;
}

// удаление задачи
for (const item of tasksBox) {
  item.addEventListener('click', (event) => {
    if (event.target.classList.contains('close_text')) {
      const parent = event.target.closest('.task');
      parent.remove();
      locSave.updateSave();
    }
  });

  // появление возможности удаления
  item.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('task')) {
      const active = event.target.querySelector('.close_text');
      active.style.display = 'inline';
    }
  });

  // исчезновение возможности удаления
  item.addEventListener('mouseout', (event) => {
    if (!event.relatedTarget.closest('.task')) {
      const active = event.target.querySelector('.close_text');
      active.style.display = 'none';
    }
  });

  // подготовка к перемещению
  item.addEventListener('dragstart', startDnd);
  item.addEventListener('dragend', endDnd);
}

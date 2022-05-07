import Project from './Project';
import Task from './Task';
import Priority from './Priority';

const projectsElement = document.querySelector('#projects');
const projectTitleElement = document.querySelector('#content header h2');
const projectTasksElement = document.querySelector('#tasks');

const projectClasses = [
  'project',
  'cursor-pointer',
  'p-2',
  'hover:bg-gray-100',
  'active:bg-gray-300',
];

const baseProjectElement = document.createElement('li');
baseProjectElement.classList.add(...projectClasses);

const newProjectButton = document.querySelector('#new-project');
const newProjectDialog = document.querySelector('#new-project-dialog');

const newTaskButton = document.querySelector('#new-task');
const newTaskDialog = document.querySelector('#new-task-dialog');

// TODO import existing projects. If empty, create default project

const projects = [];
let currentProject;

if (!projects.length) {
  createProject({ title: 'Default Project' });

  let task1 = new Task('Example Task', {
    description: 'A short description, if needed',
    deadline: Date.now(),
    priority: Priority.LOW,
    isDone: false,
  });

  let task2 = new Task('Second Example', {
    description: 'This one is high priority, which is why the checkbox is red!',
    deadline: Date.now(),
    priority: Priority.HIGH,
    isDone: false,
  });

  task1.element = createTaskElement(task1);
  task2.element = createTaskElement(task2);

  currentProject.addTask(task1);
  currentProject.addTask(task2);
}

// Latest-created project is the default on page load
currentProject = projects[projects.length - 1];

newProjectButton.addEventListener('click', () => {
  // Always present user with an empty form
  newProjectDialog.querySelector('form').reset();
  newProjectDialog.showModal();
});

newTaskButton.addEventListener('click', () => {
  // Always present user with an empty form
  newTaskDialog.querySelector('form').reset();
  newTaskDialog.showModal();
});

newProjectDialog.addEventListener('close', () => {
  if (newProjectDialog.returnValue === 'save') {
    const data = Object.fromEntries(
      new FormData(newProjectDialog.querySelector('form'))
    );

    if (data.title) {
      createProject(data);
    }
  }
});

newTaskDialog.addEventListener('close', () => {
  if (newTaskDialog.returnValue === 'save') {
    const data = Object.fromEntries(
      new FormData(newTaskDialog.querySelector('form'))
    );

    if (data.title) {
      createTask(data);
    }
  }
});

function createProject(data) {
  const project = new Project(data.title);
  projects.push(project);
  project.element = createProjectElement(project);
  projectsElement.prepend(project.element);
  changeProject(project);
}

function createTask(data) {
  const task = new Task(data.title, {
    description: data.description,
    deadline: data.deadline,
    priority: data.priority ? Priority.HIGH : Priority.LOW,
    isDone: false,
  });

  currentProject.addTask(task);
  task.element = createTaskElement(task);
}

function createProjectElement(project) {
  const element = baseProjectElement.cloneNode();
  element.textContent = project.title;
  element.classList.add('active');
  element.addEventListener('click', changeProject.bind(null, project));

  return element;
}

function createTaskElement(task) {
  const highPriorityCheckboxClasses =
    'bg-red-200 border-red-600 hover:bg-red-300 active:bg-red-400';
  const lowPriorityCheckboxClasses =
    'bg-neutral-200 border-neutral-500 hover:bg-neutral-300 active:bg-neutral-400';

  const taskElement = `
    <div class="task pt-4 first:pt-0 grid grid-cols-[auto,1fr,auto] items-center gap-x-4 gap-y-1.5">
      <div
        class="checkbox cursor-pointer w-6 h-6 border-2 ${
          task.priority === Priority.HIGH
            ? highPriorityCheckboxClasses
            : lowPriorityCheckboxClasses
        }">
      </div>
      <h3 class="title text-lg">${task.title}</h3>
      <div class="deadline text-lg bg-gray-200 px-2">${task.deadline}</div>
      <p class="description pb-2 col-start-2 row-start-2 text-sm col-span-2 border-b-2 border-gray-200">${
        task.description
      }</p>
    </div>`;

  projectTasksElement.insertAdjacentHTML('beforeend', taskElement);
  return projectTasksElement.lastElementChild;
}

function changeProject(project) {
  updateCurrentProject(project);
  updateProjectSection();
}

function updateCurrentProject(project) {
  if (currentProject) {
    currentProject.element.classList.remove('active');
  }

  project.element.classList.add('active');
  currentProject = project;
}

function updateProjectSection() {
  projectTitleElement.textContent = currentProject.title;
  projectTasksElement.innerHTML = null;
  currentProject.tasks.forEach((task) =>
    projectTasksElement.append(task.element)
  );
}

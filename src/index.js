import { format, parseISO } from 'date-fns';
import Project from './Project';
import Task from './Task';
import Priority from './Priority';

const projectsElement = document.querySelector('#projects');
const projectTitleElement = document.querySelector('#content header h2');
const projectTasksElement = document.querySelector('#tasks');

const newProjectButton = document.querySelector('#new-project');
const newProjectDialog = document.querySelector('#new-project-dialog');

const editProjectDialog = document.querySelector('#edit-project-dialog');

const newTaskButton = document.querySelector('#new-task');
const newTaskDialog = document.querySelector('#new-task-dialog');

const editTaskDialog = document.querySelector('#edit-task-dialog');

// TODO import existing projects. If empty, create default project

const projects = [];
let currentProject;

if (projects.length === 0) {
  createDefaultProject();
}

// Latest-created project is the default on page load
updateCurrentProject(projects[projects.length - 1]);

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

projectTitleElement.addEventListener('click', () => {
  editProjectDialog.querySelector('form').reset();
  editProjectDialog.showModal();
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

editProjectDialog.addEventListener('close', editProjectHandler);

editTaskDialog.addEventListener('close', () => {
  if (editTaskDialog.returnValue === 'save') {
    const data = Object.fromEntries(
      new FormData(editTaskDialog.querySelector('form'))
    );

    editTask(editTaskDialog.task, data);
    // TODO update the task's element
    // TODO refresh UI
  } else if (editTaskDialog.returnValue === 'delete') {
    // TODO delete the task from the project
    // TODO refresh UI
  }
});

function createDefaultProject() {
  createProject({ title: 'Default Project' });

  createTask({
    title: 'Example Task',
    description: 'A short description, if needed',
    deadline: '2022-05-07',
    priority: false,
    isDone: false,
  });

  createTask({
    title: 'Second Example',
    description: 'This one is high priority, which is why the checkbox is red!',
    deadline: '2022-05-08',
    priority: true,
    isDone: false,
  });

  updateProjectSection();
}

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
  const markup = `<li class="active project cursor-pointer p-2 hover:bg-gray-100 active:bg-gray-300">${project.title}</li>`;

  const projectElement = new DOMParser().parseFromString(markup, 'text/html')
    .body.firstChild;

  projectElement.addEventListener('click', changeProject.bind(null, project));

  return projectElement;
}

function createTaskElement(task) {
  const highPriorityCheckboxClasses =
    'bg-red-200 border-red-600 hover:bg-red-300 active:bg-red-400';
  const lowPriorityCheckboxClasses =
    'bg-neutral-200 border-neutral-500 hover:bg-neutral-300 active:bg-neutral-400';

  const markup = `
    <div class="task pt-4 first:pt-0 grid grid-cols-[auto,1fr,auto] items-center gap-x-4 gap-y-1.5">
      <div
        class="checkbox cursor-pointer w-6 h-6 border-2 ${
          task.priority === Priority.HIGH
            ? highPriorityCheckboxClasses
            : lowPriorityCheckboxClasses
        }">
      </div>
      <h3 class="title text-lg">${task.title}</h3>
      <div class="deadline text-lg bg-gray-200 px-2">${format(
        parseISO(task.deadline),
        'MMM d, yyyy'
      )}</div>
      <p class="description pb-2 col-start-2 row-start-2 text-sm col-span-2 border-b-2 border-gray-200">${
        task.description
      }</p>
    </div>`;

  const taskElement = new DOMParser().parseFromString(markup, 'text/html').body
    .firstChild;

  taskElement.addEventListener('click', () => {
    editTaskDialog.task = task;
    populateEditTaskDialog();
    editTaskDialog.showModal();
  });

  return taskElement;
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
  showProjectSection();
  projectTitleElement.textContent = currentProject.title;
  projectTasksElement.innerHTML = null;
  currentProject.tasks.forEach((task) =>
    projectTasksElement.append(task.element)
  );
}

function editProjectHandler() {
  if (editProjectDialog.returnValue === 'save') {
    const data = Object.fromEntries(
      new FormData(editProjectDialog.querySelector('form'))
    );

    currentProject.title = data.title;
    projectsElement.querySelector('.active').textContent = data.title;
    updateProjectSection();
  } else if (editProjectDialog.returnValue === 'delete') {
    deleteCurrentProject();
  }
}

function populateEditTaskDialog() {
  editTaskDialog.querySelector('#title').value = editTaskDialog.task.title;

  editTaskDialog.querySelector('#deadline').value =
    editTaskDialog.task.deadline;

  editTaskDialog.querySelector('#description').value =
    editTaskDialog.task.description;

  editTaskDialog.querySelector('#priority').checked =
    editTaskDialog.task.priority === Priority.HIGH;
}

function deleteCurrentProject() {
  const projectIndex = projects.indexOf(currentProject);
  projects.splice(projectIndex, 1);
  currentProject = null;
  projectsElement.querySelector('.active').remove();

  if (projects.length > 0) {
    // Simulate project elements "moving up" when one above them is deleted
    if (projectIndex - 1 >= 0) {
      // projectIndex - 1 necessary because we're
      // displaying projects in reverse order
      changeProject(projects[projectIndex - 1]);
    } else if (projects[projectIndex]) {
      // Activate the project above the deleted project
      changeProject(projects[projectIndex]);
    } else {
      // Activate the "bottom" project in the list
      changeProject(projects[projects.length - 1]);
    }
  } else {
    hideProjectSection();
  }
}

function editTask(task, data) {
  task.title = data.title;
  task.deadline = data.deadline;
  task.description = data.description;

  // Checkboxes show up in forms if checked, and not if theyre false
  if (data.priority) task.priority = Priority.HIGH;
}

function hideProjectSection() {
  document.querySelector('#content').style.opacity = 0;
}

function showProjectSection() {
  document.querySelector('#content').style.opacity = null;
}

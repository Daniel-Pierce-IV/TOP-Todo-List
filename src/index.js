import Project from './Project';

const projectsElement = document.querySelector('#projects');
const projectTitleElement = document.querySelector('#content header h2');

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

// TODO import existing projects. If empty, create default project

const projects = [];
let currentProject;

if (!projects.length) {
  createProject({ title: 'Default Project' });
}

// Latest-created project is the default on page load
currentProject = projects[projects.length - 1];

newProjectButton.addEventListener('click', () => {
  // Always present user with an empty form
  newProjectDialog.querySelector('form').reset();
  newProjectDialog.showModal();
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

function createProject(data) {
  const project = new Project(data.title);
  projects.push(project);
  project.element = createProjectElement(project);
  projectsElement.prepend(project.element);
  changeProject(project);
}

function createProjectElement(project) {
  const element = baseProjectElement.cloneNode();
  element.textContent = project.title;
  element.classList.add('active');
  element.addEventListener('click', changeProject.bind(null, project));

  return element;
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
}

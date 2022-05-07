import Project from './Project';

const projectClasses = [
  'project',
  'cursor-pointer',
  'p-2',
  'hover:bg-gray-100',
  'active:bg-gray-300',
];

// TODO import existing projects. If empty, create default project

const projects = [new Project('Default Project')];

const projectsElement = document.querySelector('#projects');
const baseProjectElement = document.createElement('li');
baseProjectElement.classList.add(...projectClasses);

const newProjectButton = document.querySelector('#new-project');
const newProjectDialog = document.querySelector('#new-project-dialog');

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

  // Update DOM
  removeActiveClass(projectsElement.querySelectorAll('.project'));
  const projectElement = createProjectElement(project);
  projectsElement.prepend(projectElement);
}

function createProjectElement(project) {
  const projectElement = baseProjectElement.cloneNode();
  projectElement.textContent = project.title;
  projectElement.classList.add('active');
  return projectElement;
}

function removeActiveClass(elements) {
  if (elements.forEach) {
    projectsElement.querySelectorAll('.project').forEach((projectElement) => {
      projectElement.classList.remove('active');
    });
  } else {
    elements.classList.remove('active');
  }
}

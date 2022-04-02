import Project from './Project';
import Task from './Task';

describe('Projects', () => {
    test('have a title', () => {
        const project = new Project('Project Title');
        expect(project.title).toBe('Project Title');
    });

    test('can have tasks', () => {
        const project = new Project('Project Title', [
            new Task('Task #1'),
            new Task('Task #2')
        ]);

        expect(project.tasks.length).toBe(2);
        expect(project.tasks[0].title).toBe('Task #1');
        expect(project.tasks[1].title).toBe('Task #2');
    });
});
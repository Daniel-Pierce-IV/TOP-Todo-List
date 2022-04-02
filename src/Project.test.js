import Project from './Project';

describe('Projects', () => {
    test('have a title', () => {
        const project = new Project('Project Title');
        expect(project.title).toBe('Project Title');
    });
});
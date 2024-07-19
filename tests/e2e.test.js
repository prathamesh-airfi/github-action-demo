const request = require('supertest');
const app = require('../src/app');

describe('Todo API', () => {
    let todoId;

    test('should create a new todo', async () => {
        const response = await request(app)
            .post('/todos')
            .send({ title: 'E2E Test Todo', description: 'E2E Test Description' });
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('E2E Test Todo');
        todoId = response.body.id;
    });

    test('should get all todos', async () => {
        const response = await request(app).get('/todos');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test('should update a todo', async () => {
        const response = await request(app)
            .put(`/todos/${todoId}`)
            .send({ title: 'Updated E2E Test Todo', description: 'Updated E2E Test Description' });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated E2E Test Todo');
    });

    test('should delete a todo', async () => {
        const response = await request(app).delete(`/todos/${todoId}`);
        expect(response.status).toBe(204);
    });
});
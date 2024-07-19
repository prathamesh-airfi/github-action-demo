const todoController = require('../src/todoController');

describe('Todo Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {}
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    test('should get all todos', () => {
        todoController.getTodos(req, res);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });

    test('should create a new todo', () => {
        req.body = { title: 'Test Todo', description: 'Test Description' };
        todoController.createTodo(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Todo', description: 'Test Description' }));
    });

    test('should update a todo', () => {
        todoController.createTodo({ body: { title: 'Old Title', description: 'Old Description' } }, res);
        req.params.id = 1;
        req.body = { title: 'New Title', description: 'New Description' };
        todoController.updateTodo(req, res);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Title', description: 'New Description' }));
    });

    test('should delete a todo', () => {
        todoController.createTodo({ body: { title: 'Test Todo', description: 'Test Description' } }, res);
        req.params.id = 1;
        todoController.deleteTodo(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });
});
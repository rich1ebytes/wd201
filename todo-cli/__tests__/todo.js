const todoList = require('../todo');

const { all, markAsComplete, add } = todoList();

describe("TodoList Test Suite", () => {
    beforeAll(() => {
        add({
            title: "new todo",
            completed: false,
            dueDate: new Date().toISOString().slice(0, 10),
        });
    });

    test("Should add new todo", () => {
        const todoItemsCount = all.length;

        add({
            title: "Test todo",
            completed: false,
            dueDate: new Date().toISOString().slice(0, 10),
        });

        expect(all.length).toBe(todoItemsCount + 1);
    });

    test("Should mark a todo as complete", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });
    test("Should retrieve all overdue items", () => {
        const overdueItem = overdue();
        overdueItem.forEach((todo) => {
            expect(new Date(todo.dueDate) < new Date()).toBe(true);
        });
    });

    test("Should retrieve all due today items", () => {
        const todayItem = dueToday();
        todayItem.forEach((todo) => {
            expect(todo.dueDate).toBe(new Date().toISOString().slice(0, 10));
        });
    });

    test("Should retrieve alll the due later items", () => {
        const laterItem = dueLater();
        laterItem.forEach((todo) => {
            expect(new Date(todo.dueDate) > new Date()).toBe(true);
        });
    });
});
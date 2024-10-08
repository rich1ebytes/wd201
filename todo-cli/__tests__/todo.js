const todoList = require('../todo');
let todos;

describe("TodoList Test Suite", () => {
    beforeEach(() => {
        todos = todoList(); 
    });

    test("Should add new todo", () => {
        const todoItemsCount = todos.all.length;
        todos.add({
            title: "Finish Work",
            completed: false,
            dueDate: "2024-10-03"
        });
        expect(todos.all.length).toBe(todoItemsCount + 1);
    });

    test("Should mark a todo as complete", () => {
        todos.add({
            title: "Complete me",
            completed: false,
            dueDate: "2024-10-03"
        });
        expect(todos.all[0].completed).toBe(false);
        todos.markAsComplete(0);
        expect(todos.all[0].completed).toBe(true);
    });

    test('Should retrieve overdue items', () => {
        const dateToday = new Date();
        const formattedDate = (d) => d.toISOString().split('T')[0];
        const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
        
        //overdue todo
        todos.add({
            title: 'Complete project',
            dueDate: yesterday,
            completed: false
        });

        const overdueItems = todos.overdue();
        expect(overdueItems.length).toBe(1); 
    });

    test('Should retrieve due today items', () => {
        const dateToday = new Date();
        const formattedDate = (d) => d.toISOString().split('T')[0];
        const today = formattedDate(dateToday);
        
        todos.add({
            title: 'Do laundry',
            dueDate: today,
            completed: false
        });

        const todayItems = todos.dueToday();
        expect(todayItems.length).toBe(1); 
    });

    test('Should retrieve due later items', () => {
        const dateToday = new Date();
        const formattedDate = (d) => d.toISOString().split('T')[0];
        const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 1)));
        
        // due later
        todos.add({
            title: 'Take the dog for a walk',
            dueDate: tomorrow,
            completed: false
        });

        const laterItems = todos.dueLater();
        expect(laterItems.length).toBe(1); 
    });
});

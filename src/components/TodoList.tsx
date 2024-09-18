import React, { useEffect } from 'react';
import { useTodoStore } from '../store/todoStore';

const TodoList: React.FC = () => {
    const { todos, fetchTodos, loading, error } = useTodoStore();

    useEffect(() => {
        fetchTodos().then(() => {});
    }, [fetchTodos]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <ul className="">
                {todos.map((todo) => (
                    <li key={todo.id} className="mb-2 p-4 bg-gray-100 rounded shadow">
                        <h2 className="text-lg font-semibold">{todo.todo}</h2>
                        <p>{todo.todo}</p>
                        <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
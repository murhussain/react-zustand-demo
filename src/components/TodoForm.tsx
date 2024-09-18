import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

const TodoForm: React.FC = () => {
    const [todo, setTodo] = useState('');
    const [userId] = useState(1)
    const { addTodo } = useTodoStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTodo({ todo, completed: false, userId });
        setTodo('');
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4 bg-white shadow rounded">
            <h1 className="text-xl font-bold mb-4">Add New Todo</h1>
            <div className="mb-4">
                <label className="block mb-2">Todo</label>
                <input
                    type="text"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Todo</button>
        </form>
    );
};

export default TodoForm;
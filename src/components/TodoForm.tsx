import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

const TodoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addTodo } = useTodoStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTodo({ title, description, completed: false });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4 bg-white shadow rounded">
            <h1 className="text-xl font-bold mb-4">Add New Todo</h1>
            <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Todo</button>
        </form>
    );
};

export default TodoForm;
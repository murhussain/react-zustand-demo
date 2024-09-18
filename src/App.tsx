// src/App.tsx
import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from "./components/TodoList";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-center text-3xl font-bold py-6">Todo App</h1>
            <TodoForm />
            <TodoList />
        </div>
    );
};

export default App;
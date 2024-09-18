// src/store/todoStore.ts
import { create } from 'zustand';
import axios from '../api/axios';

export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface TodoStore {
    todos: Todo[];
    todo: Todo | null;
    loading: boolean;
    error: string | null;

    fetchTodos: () => Promise<void>;
    fetchTodoById: (id: number) => Promise<void>;
    addTodo: (newTodo: Omit<Todo, 'id'>) => Promise<void>;
    updateTodo: (id: number, updatedTodo: Partial<Todo>) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    todo: null,
    loading: false,
    error: null,

    fetchTodos: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('/todos');
            set({ todos: response.data, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchTodoById: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/todos/${id}`);
            set({ todo: response.data, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addTodo: async (newTodo: Omit<Todo, 'id'>) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('/todos', newTodo);
            set((state) => ({
                todos: [...state.todos, response.data],
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    updateTodo: async (id: number, updatedTodo: Partial<Todo>) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`/todos/${id}`, updatedTodo);
            set((state) => ({
                todos: state.todos.map((todo) => (todo.id === id ? response.data : todo)),
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    deleteTodo: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/todos/${id}`);
            set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },
}));

import { create } from 'zustand';
import axiosInstance  from "../api/axios.ts";

export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

interface TodoStore {
    todos: Todo[];
    todo: Todo | null;
    loading: boolean;
    error: string | null;
    total: number;
    skip: number;
    limit: number;

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
    total: 0,  // Initial total, skip, and limit values
    skip: 0,
    limit: 30,

    fetchTodos: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get('/todos');
            const { todos, total, skip, limit } = response.data;  // Destructuring the response

            set({ todos, total, skip, limit, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchTodoById: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get(`/todos/${id}`);
            set({ todo: response.data, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addTodo: async (newTodo: Omit<Todo, 'id'>) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.post('/todos/add', newTodo);
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
            const response = await axiosInstance.put(`/todos/${id}`, updatedTodo);
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
            await axiosInstance.delete(`/todos/${id}`);
            set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },
}));
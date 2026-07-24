import axios from 'axios'

export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getTodos(): Promise<Todo[]> {
  const response = await api.get<Todo[]>('')
  return response.data
}

export async function postTodo(newTodo: { title: string }): Promise<Todo> {
  const response = await api.post<Todo>('', newTodo)
  return response.data
}

export async function toggleTodo({ id, completed }: { id: string; completed: boolean }): Promise<Todo> {
  const response = await api.put<Todo>(`/${id}`, { completed })
  return response.data
}

export async function deleteTodo(id: string): Promise<string> {
  await api.delete(`/${id}`)
  return id
}

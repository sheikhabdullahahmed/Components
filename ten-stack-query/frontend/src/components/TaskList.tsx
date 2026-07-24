import React from 'react'
import TaskItem from './TaskItem'
import type { Todo } from '../api'

interface TaskListProps {
  todos: Todo[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
  searchQuery: string
  filter: 'all' | 'active' | 'completed'
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  togglingId?: string | null
  deletingId?: string | null
}

const TaskList: React.FC<TaskListProps> = ({
  todos,
  isLoading,
  isError,
  error,
  refetch,
  searchQuery,
  filter,
  onToggle,
  onDelete,
  togglingId,
  deletingId,
}) => {
  return (
    <section className="list-panel">
      {isLoading ? (
        <div className="state-container loading">
          <div className="spinner-large"></div>
          <p>Fetching your tasks from backend server...</p>
        </div>
      ) : isError ? (
        <div className="state-container error">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error ? error.message : 'An error occurred'}</p>
          <button onClick={() => refetch()} className="btn btn-secondary">
            Retry Connection
          </button>
        </div>
      ) : todos.length === 0 ? (
        <div className="state-container empty">
          <div className="empty-icon">🏝️</div>
          <h3>No tasks found</h3>
          <p>
            {searchQuery
              ? 'Try modifying your search query'
              : filter === 'active'
              ? 'All tasks are completed! Good job!'
              : filter === 'completed'
              ? 'No completed tasks yet'
              : 'Start by adding a task above!'}
          </p>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TaskItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              isToggling={togglingId === todo.id}
              isDeleting={deletingId === todo.id}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskList

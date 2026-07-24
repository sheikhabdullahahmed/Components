import React from 'react'
import type { Todo } from '../api'

interface TaskItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
  isToggling: boolean
  isDeleting: boolean
}

const TaskItem: React.FC<TaskItemProps> = ({
  todo,
  onToggle,
  onDelete,
  isToggling,
  isDeleting,
}) => {
  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''} ${
        isDeleting ? 'deleting' : ''
      }`}
    >
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed)}
          disabled={isToggling || isDeleting}
        />
        <span className={`custom-checkbox ${isToggling ? 'animating' : ''}`}>
          {todo.completed && <span className="checkmark">✓</span>}
        </span>
      </label>

      <span className="todo-title">{todo.title}</span>

      <button
        type="button"
        className="btn-delete"
        onClick={() => onDelete(todo.id)}
        disabled={isDeleting || isToggling}
        title="Delete task"
      >
        {isDeleting ? (
          <span className="spinner-mini"></span>
        ) : (
          '✕'
        )}
      </button>
    </li>
  )
}

export default TaskItem

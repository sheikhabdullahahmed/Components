import React, { useState } from 'react'

interface TaskInputProps {
  onAdd: (title: string, onSuccess: () => void) => void
  isPending: boolean
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd, isPending }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), () => setTitle(''))
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isPending}
        className="todo-input"
      />
      <button
        type="submit"
        disabled={isPending || !title.trim()}
        className="btn btn-primary"
      >
        {isPending ? (
          <>
            <span className="spinner-mini"></span> Adding...
          </>
        ) : (
          'Add Task'
        )}
      </button>
    </form>
  )
}

export default TaskInput

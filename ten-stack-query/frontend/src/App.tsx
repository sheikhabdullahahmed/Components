import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, postTodo, toggleTodo, deleteTodo, type Todo } from './api'
import StatsPanel from './components/StatsPanel'
import TaskInput from './components/TaskInput'
import FilterPanel from './components/FilterPanel'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // 1. Fetch Todos Query
  const {
    data: todos = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  // 2. Add Todo Mutation
  const addMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  // 3. Toggle Todo Mutation
  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  // 4. Delete Todo Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleAddTodo = (title: string, onSuccess: () => void) => {
    addMutation.mutate(
      { title },
      {
        onSuccess: () => {
          onSuccess()
        },
      }
    )
  }

  const handleToggleTodo = (id: string, completed: boolean) => {
    toggleMutation.mutate({ id, completed: !completed })
  }

  const handleDeleteTodo = (id: string) => {
    deleteMutation.mutate(id)
  }

  // Filter and search todos
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false

    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // Calculate stats
  const totalTodos = todos.length
  const completedTodos = todos.filter((t) => t.completed).length
  const completionPercentage =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0

  const togglingId = toggleMutation.isPending
    ? toggleMutation.variables?.id
    : null
  const deletingId = deleteMutation.isPending ? deleteMutation.variables : null

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-wrapper">
            <span className="logo-dot animated"></span>
            <span className="logo-text">QueryFlow</span>
          </div>
          <span className="tech-badge">TanStack Query v5</span>
        </div>

        <div className="sync-indicator">
          {isFetching ? (
            <span className="badge syncing">
              <span className="spinner-mini"></span>
              Background Syncing...
            </span>
          ) : (
            <span className="badge synced">Synced</span>
          )}
        </div>
      </header>

      <main className="app-main">
        {/* Progress & Info Panel */}
        <StatsPanel
          totalTodos={totalTodos}
          completedTodos={completedTodos}
          completionPercentage={completionPercentage}
        />

        {/* Input Form & Filters */}
        <div className="controls-panel">
          <TaskInput onAdd={handleAddTodo} isPending={addMutation.isPending} />
          <FilterPanel
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Todo List Area */}
        <TaskList
          todos={filteredTodos}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
          searchQuery={searchQuery}
          filter={filter}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          togglingId={togglingId}
          deletingId={deletingId}
        />
      </main>

      <footer className="app-footer">
        <p>
          Powered by React Query & Axios. Connected directly to MongoDB. Real-time mutations, cache
          invalidation, state syncing, and storage persistence are fully active.
        </p>
      </footer>
    </div>
  )
}

export default App

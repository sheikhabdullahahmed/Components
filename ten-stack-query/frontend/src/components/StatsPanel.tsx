import React from 'react'

interface StatsPanelProps {
  totalTodos: number
  completedTodos: number
  completionPercentage: number
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  totalTodos,
  completedTodos,
  completionPercentage,
}) => {
  return (
    <section className="stats-panel">
      <div className="stats-info">
        <div>
          <h2>Task Progress</h2>
          <p className="stats-sub">Keep pushing your boundaries</p>
        </div>
        <div className="stats-numbers">
          <span className="completed-num">{completedTodos}</span>
          <span className="total-num">/{totalTodos} completed</span>
        </div>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <div className="progress-percentage">{completionPercentage}% Completed</div>
    </section>
  )
}

export default StatsPanel

import React from 'react'
import ProjectList from './components/ProjectList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>
      <ProjectList />
    </div>
  )
}

export default App;

import React from 'react'
import ProjectList from './components/ProjectList'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);      // 状态：是否正在加载
  const [error, setError] = useState(null);          // 状态：是否出错

  useEffect(() => {
    fetch('http://127.0.0.1:8000/projects/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch projects.');
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4 max-w-3xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-300 p-4 rounded shadow-sm">
              <Link to={`/projects/${project.id}`}>
                <h2 className="text-xl font-bold">{project.name}</h2>
              </Link>
              <p className="text-gray-700">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

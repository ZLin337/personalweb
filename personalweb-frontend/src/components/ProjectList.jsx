// src/components/ProjectList.jsx
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

function ProjectList() {
    const [projects, setProjects] = useState([])        // 保存项目数据
    const [loading, setLoading] = useState(true)        // 控制 loading 状态
    const [error, setError] = useState(null)            // 错误处理

    // 在组件加载完成后自动请求接口
    useEffect(() => {
        fetch('http://127.0.0.1:8000/projects')           // 调用后端 API
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setProjects(data)                            // 保存项目数据
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, [])

    // 渲染逻辑
    if (loading) return <p className="text-center mt-8">Loading...</p>
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>

    return (
        <div>
            {projects.map((project) => (
                <div key={project.id} className="mb-4 p-4 border">
                    <h2 className="text-2xl font-bold">
                        <Link to={`/projects/${project.id}`} className="text-purple-800 underline hover:text-blue-600">
                            {project.name}
                        </Link>
                    </h2>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    )
}

export default ProjectList

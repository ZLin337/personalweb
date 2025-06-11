// src/components/ProjectList.jsx

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
        <div className="max-w-4xl mx-auto mt-10 space-y-4">
            {projects.map((project) => (
                <div key={project.id} className="p-4 border rounded shadow">
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                    <p className="text-gray-600">{project.description}</p>
                </div>
            ))}
        </div>
    )
}

export default ProjectList

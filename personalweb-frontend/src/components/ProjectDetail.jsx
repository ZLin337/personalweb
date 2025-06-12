import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/projects/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch project");
                return res.json();
            })
            .then(data => setProject(data))
            .catch(err => setError(err.message));
    }, [id]);

    if (error) return <div className="text-red-600">{error}</div>;
    if (!project) return <div>Loading...</div>;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <p>{project.description}</p>
        </div>
    );
}

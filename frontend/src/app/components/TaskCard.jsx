"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

function TaskCard({ tasks }) {

    const router = useRouter()
    const [edit, setEdit] = useState(false)

    const [newTitle, setNewTitle] = useState(tasks.title)
    const [newDescription, setNewDescription] = useState(tasks.description)

    const handleDelete = async (id) => {
        if (window.confirm('Seguro que deseas eliminar esta tarea?')){
            const apiUrl = process.env.BACKEND_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/api/tasks/${id}`, {
            method: "DELETE",
        })
            if(res.status === 204){
                router.refresh()
            }
        }
    }

    const handleTaskDone = async (id) => {
        const apiUrl = process.env.BACKEND_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/tasks/${id}/done/`, {
        method: "POST",
        })
        if(res.status === 200){
            router.refresh()
        }
    }

    const handleUpdate = async (id) => {
        const apiUrl = process.env.BACKEND_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/tasks/${id}/`, {
            method: "PUT",
            body: JSON.stringify({ title: newTitle, description: newDescription }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            const data = await res.json();
            setNewTitle(data.title);
            setNewDescription(data.description);
            setEdit(!edit);
        } else {
            console.error("Failed to update task:", res.statusText);
        }
    }

return (
    <div key={tasks.id} 
        className="bg-slate-500 px-4 py-3 mb-2 rounded-md text-slate-200 
        flex justify-between items-center"
    >
        <div className="flex flex-col">
            {!edit ? (
            <h2 className="font-bold">
                {newTitle}
                {tasks.done && <span>✅</span>}
            </h2>
            ) : (
                <input type="text" placeholder={tasks.title} 
                className="p-2 bg-slate-500 border-none outline-none text-green"
                onChange={e => setNewTitle(e.target.value)}
                />
            )}
            {!edit ? (
            <p>{newDescription}</p>
            ) : (
                <textarea type="text" placeholder={tasks.description} 
                className="p-2 bg-slate-500 border-none outline-none text-green w-full"
                rows={1}
                onChange={e => setNewDescription(e.target.value)}
                />
            )}
        </div>
        <div className=" flex justify-between gap-x-2">
            {edit && (
                    <button
                        className={"bg-white text-black rounded-md p-2"}
                        onClick={() => handleUpdate(tasks.id)}>
                        Confirm Changes
                    </button>
                )}
            <button 
                className={
                    tasks.done ? "bg-gray-800 text-white rounded-md p-2" : "bg-green-500 text-white rounded-md p-2"}
                onClick={() => handleTaskDone(tasks.id)}>
                {tasks.done ? "Not Done" : "Done"}
            </button>
            <button 
                className={"bg-red-500 text-white rounded-md p-2"}
                onClick={() => handleDelete(tasks.id)}>
            Delete
            </button>
            <button  
                className="bg-indigo-500 text-white rounded-md p-2"
                onClick={() => setEdit(!edit)}
            >
            Update
            </button>            
        </div>
    </div>
)
}

export default TaskCard
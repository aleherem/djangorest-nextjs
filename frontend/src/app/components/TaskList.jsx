import TaskCard from "./TaskCard";

async function loadTask() {
    const apiUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const res = await fetch(`${apiUrl}/api/tasks/`);
    const tasks = await res.json();
    return tasks;
}

async function TaskList() {
    const tasks = await loadTask();
    console.log(tasks);

    return (
        <div className='bg-slate-700 p-4 w-full'>
            <h1>Task List</h1>
            {tasks.map((tasks) =>(
                <TaskCard tasks={tasks} key={tasks.id}/>
            ))}
        </div>
    )
}
;
export default TaskList
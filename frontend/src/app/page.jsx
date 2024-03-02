
import TaskList from "./components/TaskList"
import FormTask from "./components/FormTask"

export const dynamic = "force-dynamic"

function page() {
  return (
    <div className="container mx-auto">
      <h1>Task Page</h1>
      <div className="flex gap-x-10">
      <FormTask/>
      <TaskList/>
      </div>
    </div>
  )
}

export default page
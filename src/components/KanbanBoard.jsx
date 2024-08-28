import { useRef } from "react"


const TaskCard = (props) => {
  return (
    <div className={`h-16 w-44 bg-white border-2 m-auto my-2 p-2 shadow-sm rounded-lg last:mb-5 cursor-pointer`}
      onDragStart={(e) => props.draggedItem.current = e.target}
      onDragEnd={() => props.draggedItem.current = null}
      draggable={true}
    >
      <p>{props.task.title}</p>
    </div>
  )
}

const TaskStatusField = (props) => {
  const handleAddTask = (e) => {
    e.preventDefault()
    if (e.target.classList.contains('dragzone')) {
      e.target.appendChild(props.draggedItem.current)
      e.target.classList.remove('bg-green-200')
    }
  }

  const handleDragEnter = (e) => {
    if (e.target.classList.contains('dragzone')) {
      e.target.classList.add('bg-green-200')
    }
  }

  const handleDragLeave = (e) => {
    e.target.classList.remove('bg-green-200')
  }
  return (
    <>
      <div className="h-fit min-h-48 w-48 bg-[#f7f8f9] shadow-lg flex flex-col rounded-md mt-4">
        <p className="text-center p-2 font-semibold">{props.status}</p>
        <div className="dragzone flex flex-col h-full grow rounded-md"
          onDrop={handleAddTask}
          onDragOver={e => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {props.tasks ? props.tasks.map((task) => {
            return <TaskCard task={task} key={task.id} draggedItem={props.draggedItem}/>
          }) : null}
        </div>
      </div>
    </>
  )
}

const tasks = [
  {
    id: 1,
    title: 'Task 1',
  },
  {
    id: 2,
    title: 'Task 2',
  },
  {
    id: 3,
    title: 'Task 3',
  },
]
const KanbanBoard = () => {
  const draggedItem = useRef(null)
  return (
    <>
      <div className="min-h-screen bg-purple-400 flex-1 relative flex justify-around">
        <TaskStatusField status='To-Do' tasks={tasks} draggedItem={draggedItem}/>
        <TaskStatusField status='Doing' draggedItem={draggedItem}/>
        <TaskStatusField status='Done' draggedItem={draggedItem}/>
      </div>
    </>
  )
}

export default KanbanBoard
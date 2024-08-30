import { useMemo, useRef, useState } from "react"

import EditModal from "./EditModal"

const TaskCard = (props) => {
  const [showEdit, setShowEdit] = useState(false)
  
  const handleDragStart = (event) => {
    props.draggedItem.current.dom = event.target
    props.draggedItem.current.component = props.task
  }

  const handleShowEdit = () => {
    setShowEdit(!showEdit)
  }
  return (
    <>
      {showEdit && <EditModal showEdit={showEdit} setShowEdit={setShowEdit} todo={props.task}
        setTodoValue={props.setTodoValue}
        setTime={props.setTime}
        setDate={props.setDate}
        setCategory={props.setCategory}
        handleUpdateTodo={props.handleUpdateTodo}
        handleDeleteTodo={props.handleDeleteTodo}/>}

      <div className={`h-16 w-11/12 bg-white border-2 m-auto my-2 p-2 shadow-sm rounded-lg last:mb-5 cursor-pointer relative overflow-hidden`}
        onDragStart={handleDragStart}
        onDragEnd={() => props.draggedItem.current = {dom:null, component:null}}
        draggable={true}
        onClick={handleShowEdit}
      >
        <p className="overflow-hidden truncate">{props.task.title}</p>
        <p className="text-xs absolute bottom-1 text-gray-400">{props.task.date}</p>
      </div>
    </>
  )
}

const TaskStatusField = (props) => {
  const handleAddTask = (e) => {
    e.preventDefault()
    if (e.target.classList.contains('dragzone')) {
      // e.target.appendChild(props.draggedItem.current.dom)
      e.target.classList.remove('bg-green-200')
      props.handleChangeStatus(props.draggedItem.current.component, props.status.toLowerCase())
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
      <div className="h-fit min-h-48 w-56 md:w-1/4 bg-[#f7f8f9] shadow-lg flex flex-col rounded-md mt-4">
        <p className="text-center p-2 font-semibold">{props.status}</p>
        <div className="dragzone flex flex-col h-full grow rounded-md"
          onDrop={handleAddTask}
          onDragOver={e => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {props.tasks ? props.tasks.map((task) => {
            return <TaskCard task={task} key={task.id} draggedItem={props.draggedItem} 
              setTodoValue={props.setTodoValue}
              setTime={props.setTime}
              setDate={props.setDate}
              setCategory={props.setCategory}
              handleUpdateTodo={props.handleUpdateTodo}
              handleDeleteTodo={props.handleDeleteTodo}
            />
          }) : null}
        </div>
      </div>
    </>
  )
}
const KanbanBoard = (props) => {
  const draggedItem = useRef({dom:null, component:null})
  const filterTasks = (status) => {
    return props.todolist.filter(todo => todo.status === status)
  }

  const todoTask = useMemo(() => filterTasks('to-do'), [props.todolist])
  const doingTask = useMemo(() => filterTasks('doing'), [props.todolist])
  const doneTask = useMemo(() => filterTasks('done'), [props.todolist])

  // const todoTask = filterTasks('to-do')
  // const doingTask = filterTasks('doing')
  // const doneTask = filterTasks('done')

  const switchTasks = {
    'to-do': todoTask,
    'doing': doingTask,
    'done': doneTask
  }
  return (
    <>
      <div className="min-h-screen bg-purple-400 flex-1 relative flex justify-around flex-col items-center md:flex-wrap md:flex-row md:items-start">
        {/* <TaskStatusField status='To-Do' tasks={todoTask} draggedItem={draggedItem} handleChangeStatus={props.handleChangeStatus}/>
        <TaskStatusField status='Doing' tasks={doingTask} draggedItem={draggedItem} handleChangeStatus={props.handleChangeStatus}/>
        <TaskStatusField status='Done' tasks={doneTask} draggedItem={draggedItem} handleChangeStatus={props.handleChangeStatus}/> */}
        {['To-do', 'Doing', 'Done'].map(status => {
          return <TaskStatusField 
            key={status} 
            status={status} 
            tasks={switchTasks[status.toLowerCase()]} 
            draggedItem={draggedItem} 
            handleChangeStatus={props.handleChangeStatus}
            setTodoValue={props.setTodoValue}
            setTime={props.setTime}
            setDate={props.setDate}
            setCategory={props.setCategory}
            handleUpdateTodo={props.handleUpdateTodo}
            handleDeleteTodo={props.handleDeleteTodo}
          />
        })}
      </div>
    </>
  )
}

export default KanbanBoard
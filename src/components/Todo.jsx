import { useState } from 'react'
import EditModal from './EditModal'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const Todo = (props) => {
  const [showEdit, setShowEdit] = useState(false)
  
  const todo = props.todo
  const styleComplete = {
    textDecoration: 'line-through',
    opacity: 0.7
  }
  const handleCategory = (todo) => {
    switch (todo.category.toLowerCase()) {
    case 'work': return 'bg-yellow-300'
    case 'personal': return 'bg-rose-300'
    case 'freelance': return 'bg-blue-300'
    }
  }
  
  const handleShowEdit = (e) => {
    const cls = e.target.className.toString()
    if (cls.includes("icon") || (e.target.tagName.toString() === "svg") || (e.target.tagName.toString() === "path")) {
      return
    }
    setShowEdit(!showEdit)
  }
  
  return (
    <>
      {showEdit && <EditModal showEdit={showEdit} setShowEdit={setShowEdit} todo={todo}
        setTodoValue={props.setTodoValue}
        setTime={props.setTime}
        setDate={props.setDate}
        setCategory={props.setCategory}
        handleUpdateTodo={props.handleUpdateTodo}
        handleDeleteTodo={props.handleDeleteTodo}/>}
  
      <div style={todo.complete ?styleComplete:null} 
        className='w-4/5 p-4 bg-white rounded-2xl m-2 grid grid-cols-[5%_50%_auto_auto] md:grid-cols-[5%_60%_auto_auto] gap-x-2 items-center container'
  
        onClick={handleShowEdit}
      >
        <div className={`${handleCategory(todo)} justify-self-center w-4 h-4 rounded-full`}></div>
        <div>{todo.title}</div>
        <div className=''>{todo.time}</div>
        {/* <div>{todo.complete}</div> */}
        {todo.complete? <CheckCircleIcon 
          className={`${todo.complete ? 'text-purple-500' : ''} w-7 h-7 justify-self-end hover:opacity-50 cursor-pointer icon`}
          onClick={() => props.handleToggleComplete(todo)}
        /> :
          <div 
            className='w-7 h-7 bg-white rounded-full border-2 border-gray-300 justify-self-end cursor-pointer hover:opacity-50 icon'
            onClick={() => props.handleToggleComplete(todo)}
          ></div>
        }
      </div>
    </>
  )
}

export default Todo
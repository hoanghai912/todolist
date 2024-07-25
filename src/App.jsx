import { useState, useEffect } from 'react'

import todos from './services/todos'
import './index.css'

import 
{ CalendarIcon, 
  CalendarDaysIcon,
  CheckCircleIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline"


const Menu = () => {
  return (
    <div className='p-4 justify-center'>
      <div className='flex items-center'>
        <UserCircleIcon className='w-16 h-16 mx-3'/>
        <div>
          <p>Do-it</p>
          <p className='text-purple-500 font-semibold'>Welcoming to Todo List</p>
        </div>
      </div>
      <div className='h-[2px] bg-purple-500 w-3/5 m-auto mt-7'></div>

      <div className='flex items-center p-5'>
        <CalendarIcon className='w-7 h-7 text-purple-500 mr-3'/>
        <p className='text-lg'>Today tasks</p>
      </div>
      <div className='flex items-center p-5'>
        <CalendarDaysIcon className='w-7 h-7 mr-3'/>
        <p className='text-lg'>Scheduled tasks</p>
      </div>
      <div className='flex items-center p-5'>
        <Cog6ToothIcon className='w-7 h-7 mr-3'/>
        <p className='text-lg'>Settings</p>
      </div>
    </div>
  )
}

const InputTask = (props) => {
  
  return (
    <form 
      className='grid grid-cols-[6%_80%_auto] bg-white w-5/6 m-auto px-4 my-10 py-3 gap-x-3 rounded-2xl'
      onSubmit={props.handleAddTodo}
    >
      <div className='flex items-center justify-between'>
        <div style={styles.dot} className="bg-rose-300"></div>
        <div style={styles.dot} className="bg-blue-300"></div>
        <div style={styles.dot} className="bg-yellow-300"></div>
      </div>

      <input 
        placeholder='What is your next task?' 
        className='outline-0' 
        onChange={(e) => props.setTodoValue(e.target.value)}
      />

      <div className='justify-self-end'>... ...</div>
    </form>
  )
}

const Todo = (props) => {
  const todo = props.todo
  const styleComplete = {
    textDecoration: 'line-through',
    opacity: 0.7
  }
  const handleCategory = (todo) => {
    switch (todo.category) {
      case 'work': return 'bg-yellow-300'
      case 'personal': return 'bg-rose-300'
      case 'freelance': return 'bg-blue-300'
    }
  }

  return (
    <>
      <div style={todo.complete ?styleComplete:null} className='w-4/5 p-4 bg-white rounded-2xl m-2 grid grid-cols-[5%_60%_auto_auto] gap-x-2 items-center'>
        <div style={styles.dot} className={`${handleCategory(todo)} justify-self-center`}></div>
        <div>{todo.title}</div>
        <div className=''>{todo.time}</div>
        {/* <div>{todo.complete}</div> */}
        {todo.complete? <CheckCircleIcon 
          className={`${todo.complete ? 'text-purple-500' : ''} w-7 h-7 justify-self-end hover:opacity-50 cursor-pointer`}
          onClick={() => props.handleToggleComplete(todo)}
        /> :
        <div 
          className='w-7 h-7 bg-white rounded-full border-2 border-gray-300 justify-self-end cursor-pointer hover:opacity-50'
          onClick={() => props.handleToggleComplete(todo)}
        ></div>}
      </div>
    </>
  )
}
const Container = (props) => {
  return (
    <>
      <div className='min-h-screen bg-purple-400 flex-1'>
        <h2 className='text-white text-center my-2'>Today main focus <div className='font-bold'>Example To-do</div></h2>
        <InputTask handleAddTodo={props.handleAddTodo} setTodoValue={props.setTodoValue}/>
    
        <div className='flex flex-col items-center'>
          {props.todos.map(todo => <Todo key={todo.id} todo={todo} handleToggleComplete={props.handleToggleComplete}/>)}
        </div>
      </div>
    </>
  )
  
}

function App() {
  const [todolist, setTodolist] = useState([])
  const [todoValue, setTodoValue] = useState('')

  useEffect(() => {
    todos.getAll()
      .then(initialValues => setTodolist(initialValues))
  }, [])

  
  const handleAddTodo = (event) => {
    event.preventDefault()
    if (!todoValue) {
      alert('Please input your todo')
      return
    }
    const currentDate = new Date()
    const newTodo = {
      title: todoValue,
      category: 'work',
      complete: false,
      time: currentDate.toLocaleTimeString(),
      date: currentDate.toDateString()
    }
    todos.create(newTodo)
      .then(response => {
        setTodolist(todolist.concat(response))
      })
  }

  const handleToggleComplete = (todo) => {
    const updatedTodo = { ...todo, complete: !todo.complete }
    todos.update(todo.id, updatedTodo)
      .then(response => {
        setTodolist(todolist.map(p_todo => p_todo.id === todo.id ? response : p_todo))
      })
  }

  return (
    <>
      <div className='main-container flex'>
        <Menu />
        <Container 
          todos={todolist} 
          handleAddTodo={handleAddTodo} 
          setTodoValue={setTodoValue}
          handleToggleComplete={handleToggleComplete}
        />
      </div>
    </>
  )
}

export default App


const styles = {
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
  }
}
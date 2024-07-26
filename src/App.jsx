import { useState, useEffect } from 'react'

import todos from './services/todos'
import './index.css'

import 
{ CalendarIcon, 
  CalendarDaysIcon,
  CheckCircleIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ClockIcon,
  BriefcaseIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline"


const Menu = (props) => {
  const styleSelected = {
    color: '#a855f7'
  }
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

      <div className='flex items-center p-5 cursor-pointer' style={props.selectedOption === 'today' ? styleSelected : null}
        onClick={() => props.setSelectedOption('today')}
      >
        <CalendarIcon className='w-7 h-7 mr-3'/>
        <p className='text-lg'>Today tasks</p>
      </div>
      
      <div className='ml-14'>
        <div className='flex items-center gap-x-2'>
          <div className='w-5 h-5 bg-rose-300 rounded-full'></div>
          <div>Personal</div>
        </div>

        <div className='flex items-center gap-x-2'>
          <div className='w-5 h-5 bg-blue-300 rounded-full'></div>
          <div>Freelance</div>
        </div>

        <div className='flex items-center gap-x-2'>
          <div className='w-5 h-5 bg-yellow-300 rounded-full'></div>
          <div>Work</div>
        </div>
      </div>
      

      <div className='flex items-center p-5 cursor-pointer' style={props.selectedOption === 'scheduled' ? styleSelected : null}
        onClick={() => props.setSelectedOption('scheduled')}
      >
        <CalendarDaysIcon className='w-7 h-7 mr-3'/>
        <p className='text-lg'>Scheduled tasks</p>
      </div>
      <div className='flex items-center p-5 cursor-pointer' style={props.selectedOption === 'settings' ? styleSelected : null}
        onClick={() => props.setSelectedOption('settings')}
      >
        <Cog6ToothIcon className='w-7 h-7 mr-3'/>
        <p className='text-lg'>Settings</p>
      </div>
    </div>
  )
}

const InputTask = (props) => {

  const [showOptions, setShowOptions] = useState(false)

  const handleCategory = (category) => {
    switch (category.toLowerCase()) {
      case 'work': return 'bg-yellow-300'
      case 'personal': return 'bg-rose-300'
      case 'freelance': return 'bg-blue-300'
    }
  }

  const handleShowOptions = () => {
    setShowOptions(!showOptions)
    props.setCategory('Personal')
  }

  return (
    <div className='my-10'>
      <form 
        className='grid grid-cols-[6%_65%_auto] bg-white w-5/6 m-auto px-4 py-3 gap-x-3 rounded-2xl'
        onSubmit={props.handleAddTodo}
      >
        <div className='flex items-center justify-around'>
          <div style={styles.dot} className="bg-rose-300"></div>
          <div style={styles.dot} className="bg-blue-300"></div>
          <div style={styles.dot} className="bg-yellow-300"></div>
        </div>

        <input 
          placeholder='What is your next task?' 
          className='outline-0' 
          onChange={(e) => props.setTodoValue(e.target.value)}
          value={props.todoValue}
        />

        <div className='justify-self-end'>
          <PlusCircleIcon className='w-7 h-7 hover:text-purple-500 cursor-pointer' onClick={handleShowOptions}/>
          
        </div>
        
      </form>
      {showOptions && <div>
        <input type='time' onChange={(e) => props.setTime(e.target.value)}
          className='block w-1/4 m-auto px-4 py-3 gap-x-3'
          defaultValue={new Date().getHours() + ':' + new Date().getMinutes()}
        />
        <input type='date' onChange={(e) => props.setDate(e.target.value)}
          className='block w-1/4 m-auto px-4 py-3 gap-x-3'
          defaultValue={new Date().toISOString().split('T')[0]}
        />
        <div className='flex m-auto w-1/4 justify-center bg-white rounded-b-2xl items-center'>
          <select className='p-2 rounded-full' onChange={(e) => props.setCategory(e.target.value)}>
            <option>Personal</option>
            <option>Freelance</option>
            <option>Work</option>
          </select>
          <div className={`w-5 h-5 rounded-full ml-2 ${handleCategory(props.category)}`}></div>
        </div>
        
      </div>}
      
    </div>
  )
}

const Todo = (props) => {
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

  return (
    <>
      <div style={todo.complete ?styleComplete:null} className='w-4/5 p-4 bg-white rounded-2xl m-2 grid grid-cols-[5%_60%_auto_auto] gap-x-2 items-center'>
        <div className={`${handleCategory(todo)} justify-self-center w-4 h-4 rounded-full`}></div>
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
        <InputTask 
          handleAddTodo={props.handleAddTodo} 
          setTodoValue={props.setTodoValue}
          setTime={props.setTime}
          setDate={props.setDate}
          todoValue={props.todoValue}
          category={props.category}
          setCategory={props.setCategory}
        />
    
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
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [selectedOption, setSelectedOption] = useState('today')
  const [category, setCategory] = useState('Personal')
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
    
    const currentDateTime = new Date()
    const currentDate = currentDateTime.toISOString().split('T')[0]
    const _tmpTime = currentDateTime.toLocaleTimeString('en-GB').split(':')
    const currentTime = _tmpTime[0] + ':' + _tmpTime[1]
    const newTodo = {
      title: todoValue,
      complete: false,
      time: time? time : currentTime,
      date: date? date : currentDate,
      category: category
    }
    todos.create(newTodo)
      .then(response => {
        setTodolist(todolist.concat(response))
        setTodoValue('')
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
        <Menu 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <Container 
          todos={todolist} 
          handleAddTodo={handleAddTodo} 
          setTodoValue={setTodoValue}
          todoValue={todoValue}
          setDate={setDate}
          setTime={setTime}
          handleToggleComplete={handleToggleComplete}
          category={category}
          setCategory={setCategory}
        />
      </div>
    </>
  )
}

export default App


const styles = {
  dot: {
    width: "1.25vh",
    height: "1.25vh",
    borderRadius: 100,
  }
}
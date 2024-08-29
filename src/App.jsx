import { useState, useEffect } from 'react'

import todos from './services/todos'
import './index.css'

import Menu from './components/Menu'
import TodayTask from './components/TodayTask'
import Scheduled from './components/Scheduled'

const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}

const formatTime = (date) => {
  const _tmpTime = date.toLocaleTimeString('en-GB').split(':')
  const currentTime = _tmpTime[0] + ':' + _tmpTime[1]
  return currentTime
}

function App() {
  const [todolist, setTodolist] = useState([])
  const [filteredTodos, setFilteredTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [selectedOption, setSelectedOption] = useState('today')
  const [filterCategory, setFilterCategory] = useState('all')
  const [category, setCategory] = useState('Personal')
  const [typeScheduled, setTypeScheduled] = useState('list task')

  useEffect(() => {
    todos.getAll()
      .then(initialValues => {
        setTodolist(initialValues)
        setFilteredTodos(initialValues)
      })
  }, [])

  useEffect(() => {
    if (filterCategory !== 'all') {
      setFilteredTodos(todolist.filter(todo => todo.category.toLowerCase() === filterCategory.toLowerCase()))
    }
    else setFilteredTodos(todolist)
  }, [filterCategory, todolist])

  
  const handleAddTodo = (event) => {
    event.preventDefault()
    if (!todoValue) {
      alert('Please input your todo')
      return
    }
    
    const currentDateTime = new Date()
    const newTodo = {
      title: todoValue,
      complete: false,
      time: time? time : formatTime(currentDateTime),
      date: date? date : formatDate(currentDateTime),
      category: category,
      status: 'to-do'
    }
    todos.create(newTodo)
      .then(response => {
        setTodolist(todolist.concat(response))
        setTodoValue('')
      })
  }

  const handleToggleComplete = (todo) => {
    const updatedTodo = { ...todo, complete: !todo.complete, status: !todo.complete === true ? 'done' : 'to-do' }
    todos.update(todo.id, updatedTodo)
      .then(response => {
        setTodolist(todolist.map(p_todo => p_todo.id === todo.id ? response : p_todo))
      })
  }

  const handleUpdateTodo = (todo) => {
    const newTodo = {
      id: todo.id,
      title: todoValue,
      complete: todo.complete,
      time: time,
      date: date,
      category: category,
      status: todo.status
    }
    todos.update(todo.id, newTodo)
      .then(response => {
        setTodolist(todolist.map(p_todo => p_todo.id === todo.id ? response : p_todo))
      })
      .catch(() => {
        alert('Error: This user has already been deleted')
        setTodolist(todolist.filter(p_todo => p_todo.id !== todo.id))
      })
  }

  const handleDeleteTodo = (id) => {
    todos.deleteTodo(id)
      .then(() => {
        setTodolist(todolist.filter(todo => todo.id !== id))
      })
      .catch(() => {
        alert('Error: This user has already been deleted')
        setTodolist(todolist.filter(todo => todo.id !== id))
      })
  }

  const handleChangeStatus = (todo, p_status) => {
    const updatedTodo = { ...todo, status: p_status, complete: p_status === 'done' ? true : false }
    todos.update(todo.id, updatedTodo)
      .then(responseTodo => {
        setTodolist(todolist.map(todo => todo.id === responseTodo.id ? responseTodo : todo))
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <div className='main-container flex'>
        <Menu 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          typeScheduled={typeScheduled}
          setTypeScheduled={setTypeScheduled}
        />
        {selectedOption === 'today' && <TodayTask 
          todos={filteredTodos} 
          handleAddTodo={handleAddTodo} 
          setTodoValue={setTodoValue}
          todoValue={todoValue}
          setDate={setDate}
          setTime={setTime}
          handleToggleComplete={handleToggleComplete}
          category={category}
          setCategory={setCategory}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
        />}
        {selectedOption === 'scheduled' && <Scheduled 
          todolist={todolist}
          handleToggleComplete={handleToggleComplete}
          setTodoValue={setTodoValue}
          setTime={setTime}
          setDate={setDate}
          setCategory={setCategory}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          typeScheduled={typeScheduled}
          handleChangeStatus={handleChangeStatus}
        />}
        {/* {selectedOption === 'settings' && <KanbanBoard />} */}
      </div>
    </>
  )
}

export default App

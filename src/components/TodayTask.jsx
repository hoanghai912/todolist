import InputTask from "./InputTask"
import Todo from "./Todo"

const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}


const TodayTask = (props) => {
  const currentDate = formatDate(new Date())
  const todayTodos = props.todos.filter(todo => todo.date === currentDate)
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
          {todayTodos.map(todo => <Todo key={todo.id} todo={todo}
            handleToggleComplete={props.handleToggleComplete}
            setTodoValue={props.setTodoValue}
            setTime={props.setTime}
            setDate={props.setDate}
            setCategory={props.setCategory}
            handleUpdateTodo={props.handleUpdateTodo}
            handleDeleteTodo={props.handleDeleteTodo}
          />)}
        </div>
      </div>
    </>
  )

}

export default TodayTask
import Todo from "./Todo"
import KanbanBoard from './KanbanBoard'

const Scheduled = (props) => {
  const onlyUnique = (value, index, array) => {
    return array.indexOf(value) === index
  }
  const dateList = props.todolist.map(element => element.date).filter(onlyUnique).sort()
  const todoData = dateList.map(element => props.todolist.filter(value => value.date === element))
  // console.log(todoData)
  return (
    <div className='min-h-screen bg-purple-400 flex-1 flex justify-center items-center'>
      {props.typeScheduled === 'kanban board' ?
        <KanbanBoard 
          todolist={props.todolist} 
          handleChangeStatus={props.handleChangeStatus}
        />
        : 
        (
          <div className='w-[80%] py-10'>
            {dateList.map((date, index) => {
              return (
                <div key={date} className='pb-10'>
                  <p className='text-2xl text-white mb-4 font-semibold'>{date}</p>
                  {todoData[index].map(todo => {
                    return (
                      <Todo key={todo.id} todo={todo}
                        handleToggleComplete={props.handleToggleComplete}
                        setTodoValue={props.setTodoValue}
                        setTime={props.setTime}
                        setDate={props.setDate}
                        setCategory={props.setCategory}
                        handleUpdateTodo={props.handleUpdateTodo}
                        handleDeleteTodo={props.handleDeleteTodo}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}

    </div>
  )
}

export default Scheduled
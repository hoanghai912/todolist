import { useEffect } from 'react'
const formatDate = (date) => {
    return date.toISOString().split('T')[0]
}

const formatTime = (date) => {
    const _tmpTime = date.toLocaleTimeString('en-GB').split(':')
    const currentTime = _tmpTime[0] + ':' + _tmpTime[1]
    return currentTime
}

const EditModal = (props) => {

    useEffect(() => {
        props.setTodoValue(props.todo.title)
        props.setTime(props.todo.time)
        props.setDate(props.todo.date)
        props.setCategory(props.todo.category)
    }, [])

    const handleToggleModal = () => {
        const newState = !props.showEdit
        props.setShowEdit(newState)
        props.setTodoValue('')
        props.setTime(formatTime(new Date()))
        props.setDate(formatDate(new Date()))
    }

    const handleSave = () => {
        props.handleUpdateTodo(props.todo)
        handleToggleModal()
    }

    const handleDelete = (id) => {
        const confirmation = window.confirm('Delete this todo?')
        if (confirmation) {
            props.handleDeleteTodo(id)
            handleToggleModal()
        }
    }

    return (
        <div className='w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-10'>
            <div className='absolute w-1/2 h-fit bg-white z-10 rounded-2xl ps-4 pe-4 pb-4'>
                <div className='flex justify-between mt-4 items-center'>
                    <p>Edit <span className='text-purple-500 font-bold text-lg'>{props.todo.title}</span></p>
                    <button className='py-2 px-4 bg-red-400 rounded-2xl text-white hover:opacity-50 min-w-20 font-semibold'
                        onClick={() => handleDelete(props.todo.id)}
                    >Delete</button>
                </div>
                <div className='w-full h-[2px] bg-purple-500 my-2'></div>
                <div>
                    <p className='text-lg font-semibold opacity-90 mb-2'>Title</p>
                    <input defaultValue={props.todo.title} className='py-2 px-1 w-full outline-0 border-[1px] border-gray-300 rounded-lg'
                        onChange={(e) => props.setTodoValue(e.target.value)}
                    />
                </div>

                <div>
                    <p className='text-lg font-semibold opacity-90 mt-2'>Time</p>
                    <input type="time" defaultValue={props.todo.time} className='py-2 px-1'
                        onChange={(e) => props.setTime(e.target.value)}
                    />
                </div>

                <div>
                    <p className='text-lg font-semibold opacity-90'>Date</p>
                    <input type="date" defaultValue={props.todo.date} className='py-2 px-1'
                        onChange={(e) => props.setDate(e.target.value)}
                    />
                </div>

                <div>
                    <p className='text-lg font-semibold opacity-90'>Category</p>
                    <select className='py-2 px-1'
                        onChange={(e) => props.setCategory(e.target.value)}
                        defaultValue={props.todo.category.toLowerCase()}
                    >
                        <option value='personal'>Personal</option>
                        <option value='freelance'>Freelance</option>
                        <option value='work'>Work</option>
                    </select>
                </div>

                <div className='flex justify-between mt-4'>
                    <button className='py-2 px-4 bg-green-400 rounded-2xl text-white hover:opacity-50 min-w-20 font-semibold'
                        onClick={handleSave}
                    >Save</button>

                </div>
            </div>

            <div className='fixed top-0 left-0 w-full h-full bg-gray-400 div1 opacity-50'
                onClick={handleToggleModal}
            ></div>
        </div>
    )
}

export default EditModal
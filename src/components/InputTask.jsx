import { useState, useEffect } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

const formatDate = (date) => {
    return date.toISOString().split('T')[0]
}

const formatTime = (date) => {
    const _tmpTime = date.toLocaleTimeString('en-GB').split(':')
    const currentTime = _tmpTime[0] + ':' + _tmpTime[1]
    return currentTime
}

const InputTask = (props) => {

    const [showOptions, setShowOptions] = useState(false)

    useEffect(() => {
        props.setTime(formatTime(new Date()))
        props.setDate(formatDate(new Date()))
    }, [showOptions])

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
                className='grid grid-cols-[90%_auto] md:grid-cols-[6%_65%_auto] bg-white w-5/6 m-auto px-4 py-3 gap-x-3 rounded-2xl'
                onSubmit={props.handleAddTodo}
            >
                <div className='items-center justify-around hidden md:flex'>
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
                    <PlusCircleIcon className='w-7 h-7 hover:text-purple-500 cursor-pointer' onClick={handleShowOptions} />

                </div>

            </form>
            {showOptions && <div>
                <input type='time' onChange={(e) => props.setTime(e.target.value)}
                    className='block w-1/4 m-auto px-4 py-3 gap-x-3'
                    defaultValue={formatTime(new Date())}
                />
                <input type='date' onChange={(e) => props.setDate(e.target.value)}
                    className='block w-1/4 m-auto px-4 py-3 gap-x-3'
                    defaultValue={formatDate(new Date())}
                />
                <div className='flex m-auto w-1/4 justify-center bg-white rounded-b-2xl items-center'>
                    <select className='p-2 rounded-full w-[70%] text-center' onChange={(e) => props.setCategory(e.target.value)}>
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

export default InputTask

const styles = {
    dot: {
        width: "1.25vh",
        height: "1.25vh",
        borderRadius: 100,
    }
}
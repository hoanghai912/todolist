
import { UserCircleIcon, 
  CalendarIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"

import { useEffect } from "react"
const Menu = (props) => {

  useEffect(() => {

    return () => { props.setIsShowMenu(false) }
  }, [])

  const styleSelected = {
    color: '#a855f7'
  }

  const handleChangeFilterCategory = (category) => {
    props.setFilterCategory(category)
    props.setSelectedOption('today')
  }

  const handleChangeTypeScheduled = (text) => {
    const type = text.toLowerCase()
    props.setTypeScheduled(type)
    props.setSelectedOption('scheduled')
  }

  return (
    <div className='p-4 justify-center bg-white'>
      <div className='flex items-center'>
        <UserCircleIcon className='w-16 h-16 mx-3 opacity-60' />
        <div>
          <p>Do-it</p>
          <p className='text-purple-500 font-semibold'>Welcoming to Todo List</p>
        </div>
      </div>
      <div className='h-[2px] bg-purple-500 w-3/5 m-auto mt-7'></div>

      <div className='flex items-center p-5 cursor-pointer' style={props.selectedOption === 'today' ? styleSelected : null}
        onClick={() => props.setSelectedOption('today')}
      >
        <CalendarIcon className='w-7 h-7 mr-3' />
        <p className='text-lg'>Today tasks</p>
      </div>

      <div className='ml-14'>
        <div className='flex items-center gap-x-2 cursor-pointer py-2'
          onClick={() => handleChangeFilterCategory('personal')}
        >
          <div className='w-5 h-5 bg-rose-300 rounded-full'></div>
          <div style={(props.filterCategory.toLowerCase() === 'personal'
						&& props.selectedOption === 'today') ? styleSelected : null}>Personal</div>
        </div>

        <div className='flex items-center gap-x-2 cursor-pointer py-2'
          onClick={() => handleChangeFilterCategory('freelance')}
        >
          <div className='w-5 h-5 bg-blue-300 rounded-full'></div>
          <div style={(props.filterCategory.toLowerCase() === 'freelance'
						&& props.selectedOption === 'today') ? styleSelected : null}>Freelance</div>
        </div>

        <div className='flex items-center gap-x-2 cursor-pointer py-2'
          onClick={() => handleChangeFilterCategory('work')}
        >
          <div className='w-5 h-5 bg-yellow-300 rounded-full'></div>
          <div style={(props.filterCategory.toLowerCase() === 'work'
						&& props.selectedOption === 'today') ? styleSelected : null}>Work</div>
        </div>

        <div className='flex items-center gap-x-2 cursor-pointer py-2'
          onClick={() => handleChangeFilterCategory('all')}
        >
          <div className='w-5 h-5 bg-gray-300 rounded-full'></div>
          <div style={(props.filterCategory.toLowerCase() === 'all'
						&& props.selectedOption === 'today') ? styleSelected : null}>All</div>
        </div>
      </div>


      <div className='flex items-center p-5 cursor-pointer' style={props.selectedOption === 'scheduled' ? styleSelected : null}
        onClick={() => props.setSelectedOption('scheduled')}
      >
        <CalendarDaysIcon className='w-7 h-7 mr-3' />
        <p className='text-lg'>Scheduled tasks</p>
      </div>

      <div className="ml-14">
        {['List Task', 'Kanban Board'].map((text) => {
          return (
            <p key={text}
              className="py-2 cursor-pointer"
              onClick={() => handleChangeTypeScheduled(text)}
              style={props.typeScheduled === text.toLowerCase() && props.selectedOption === 'scheduled' ? styleSelected : null}
            >{text}</p>
          )
        })}
      </div>

      <div className='flex items-center p-5 cursor-pointer' style={props.selectedOption === 'settings' ? styleSelected : null}
        onClick={() => props.setSelectedOption('settings')}
      >
        <Cog6ToothIcon className='w-7 h-7 mr-3' />
        <p className='text-lg'>Settings</p>
      </div>
    </div>
  )
}

export default Menu
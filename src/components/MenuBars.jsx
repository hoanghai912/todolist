import { Bars3Icon } from '@heroicons/react/24/outline'

const MenuBars = ({ handleClickMenuBars }) => {
  // const handleClickMenuBars = () => {
  //   const menuElement = document.getElementById('menu')
  //   menuElement.classList.toggle('hidden')
  //   menuElement.classList.toggle('fixed')
  //   menuElement.classList.toggle('h-screen')
  //   menuElement.classList.toggle('z-10')
  //   const menuBar = document.getElementsByClassName('menubar')[0]
  //   menuBar.classList.toggle('top-5')
  //   menuBar.classList.toggle('bottom-2')
  //   menuBar.classList.toggle('bg-red-500')
  //   menuBar.classList.toggle('bg-white')
  //   setIsShowMenuOverlay(prev => !prev)
  // }

  return (
    <div className='menubar fixed top-5 left-6 bg-white rounded-lg p-1 hover:scale-110 cursor-pointer md:hidden z-20'
      onClick={handleClickMenuBars}
    >
      <Bars3Icon className='w-10 h-10' />
    </div>
  )
}

export default MenuBars
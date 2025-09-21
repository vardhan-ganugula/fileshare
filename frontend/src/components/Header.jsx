
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
        <nav className='flex items-center py-3 px-5 bg-white justify-between '>
            {/* logo area */}
            <div className='flex gap-3 relative overflow-hidden py-2'>
                <div className='w-9 h-9 bg-black rounded-full absolute top-0 -left-5 '></div>
                <div className='ml-7 text-md text-zinc-400'>vardhan/file-share</div>
            </div>

            {/* portfolio button */}

            <div>
                <Link to="http://vardhan-dev.in" className='py-2 px-5 bg-black rounded-full text-white font-semibold'>Portfolio</Link>
            </div>
        </nav>
    </header>
  )
}

export default Header;
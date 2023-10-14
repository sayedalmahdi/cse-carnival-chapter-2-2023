import { Link } from 'react-router-dom'
import NotFound from '../assets/NotFound.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export function HomePageRedirectButton() {
  return (
    <div className='border-t border-gray-300 mt-3 text-center'>
      <Link
        to='/'
        className='w-full py-2 px-4 bg-primary text-white font-semibold rounded hover:bg-primaryHover'
      >
        <FontAwesomeIcon icon={faHome} />  <span className='ml-2 font-semibold'>Go to Home Page</span>
      </Link>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <div className='opacity-90 flex flex-col  CenterContent'>
      <object
        type="image/svg+xml"
        data={NotFound}
        className="max-h-[500px] w-auto h-auto"
      />
      <HomePageRedirectButton />
    </div>
  )
}

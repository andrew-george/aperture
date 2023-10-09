import Link from 'next/link'
import { BsArrowUpCircleFill } from 'react-icons/bs'
import Logo from '../ui/Logo'

function Footer() {
  function scrollToTop() {
    window.scrollTo(0, 0)
  }

  //todo=> scroll to top button
  return (
    <div className="h-24 w-4/5 m-auto flex flex-col-reverse md:flex-row md:justify-between justify-around items-center">
      <Logo />

      <Link href="https://github.com/andrew-george" className="text-sm font-medium font-mono text-center">
        © Designed & Developed by <span className="font-semibold">Andrew Berty</span>
      </Link>
    </div>
  )
}

export default Footer

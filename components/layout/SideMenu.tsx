import React from 'react'
import { useAppDispatch } from '../../hooks/hooks'
import { closeSideMenu } from '../../store/uiSlice'
import Header from './Header'
import NavLink from './NavLink'

function SideMenu() {
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => dispatch(closeSideMenu())}
      className="w-screen h-screen bg-gradient-to-b from-black/70 rounded-bl-3xl rounded-br-3xl fixed backdrop-blur-xl z-50"
    >
      <div className="w-4/5 m-auto space-y-4">
        <Header />
        <div className="font-mono space-y-8 [&>*]:block">
          <NavLink href="/browse">Browse</NavLink>
          <NavLink href="/checkout">Checkout</NavLink>
        </div>
      </div>
    </div>
  )
}

export default SideMenu

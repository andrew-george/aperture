import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface UiState {
  isCartModalOpen: boolean
  cartIsShaking: boolean
  heartIsShaking: boolean
  isSideMenuOpen: boolean
}

const initialState: UiState = {
  isCartModalOpen: false,
  cartIsShaking: false,
  heartIsShaking: false,
  isSideMenuOpen: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    closeCartModal: state => {
      state.isCartModalOpen = false
    },
    openCartModal: state => {
      state.isCartModalOpen = true
    },
    setShakeCart: (state, action: PayloadAction<boolean>) => {
      state.cartIsShaking = action.payload
    },
    setShakeHeart: (state, action: PayloadAction<boolean>) => {
      state.heartIsShaking = action.payload
    },
    openSideMenu: state => {
      state.isSideMenuOpen = true
    },
    closeSideMenu: state => {
      state.isSideMenuOpen = false
    }
  }
})

export const cart = (state: RootState) => state.cart

export const { closeCartModal, openCartModal, setShakeCart, setShakeHeart, openSideMenu, closeSideMenu } =
  uiSlice.actions

export default uiSlice.reducer

import { NavBar } from 'antd-mobile'
import './index.scss'

function CustomNavBar({ children, backArrow, right, onBack }) {
  return (
    <NavBar backArrow={backArrow} right={right} onBack={onBack}>
      {children}
    </NavBar>
  )
}

export default CustomNavBar

import { AddOutline } from 'antd-mobile-icons'
import './index.scss'

function AddButton({ color, fontSize, onClick }) {
  return (
    <button className="add" style={{ backgroundColor: color }} onClick={onClick}>
      <AddOutline fontSize={fontSize} color="#fff" />
    </button>
  )
}

export default AddButton

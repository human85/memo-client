import { AddOutline } from 'antd-mobile-icons'
import './index.scss'

function AddButton({ color, fontSize, onClick }) {
  return (
    <button className="add" onClick={onClick}>
      <AddOutline color={color} fontSize={fontSize} />
    </button>
  )
}

export default AddButton

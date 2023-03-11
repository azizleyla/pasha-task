import React from 'react'
import { Img } from '../../Data/Img'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <nav>
        <ul>
          <li>
            <img src={Img.Icon1} alt="" />
          </li>
          <li>
            <img src={Img.Icon2} alt="" />
          </li>
          <li>
            <img src={Img.Icon3} alt="" />
          </li>
          <li>
            <img src={Img.Icon4} alt="" />
          </li>
          <li>
            <img src={Img.Icon5} alt="" />
          </li>
          <li>
            <img src={Img.Icon6} alt="" />
          </li>
          <li>
            <img src={Img.Icon7} alt="" />
          </li>
          <li>
            <img src={Img.Icon8} alt="" />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
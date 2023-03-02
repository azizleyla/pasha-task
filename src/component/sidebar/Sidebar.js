import React from 'react'
import Icon1 from "../../assets/img/Vector.svg"
import Icon2 from "../../assets/img/Vector.png"
import Icon3 from "../../assets/img/Vector (2).svg"
import Icon4  from "../../assets/img/Vector (3).svg";
import Icon5  from "../../assets/img/Vector (4).svg";
import Icon6  from "../../assets/img/Vector (5).svg";
import Icon7  from "../../assets/img/Vector7.svg";
import Icon8 from "../../assets/img/vector6.svg";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <nav>
        <ul>
          <li>
         <img src={Icon1} alt=""/>
          </li>
          <li>
         <img src={Icon2} alt=""/>
          </li>
          <li>
         <img src={Icon3} alt=""/>
          </li>
          <li>
         <img src={Icon4} alt=""/>
          </li>
          <li>
         <img src={Icon5} alt=""/>
          </li>
          <li>
         <img src={Icon6} alt=""/>
          </li>
          <li>
         <img src={Icon7} alt=""/>
          </li>
          <li>
         <img src={Icon8} alt=""/>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
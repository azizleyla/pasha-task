import React from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import TableList from '../component/table/Table'

const Home = () => {
  return (
    <div className='container'>
    <div style={{display:"flex",gap:"100px"}}>
  <Sidebar/>
  <TableList/>
  </div>
  </div>
  )
}

export default Home
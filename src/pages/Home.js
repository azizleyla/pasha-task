import React from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import TableList from '../component/table/Table'

const Home = () => {
  return (
    <div className='container'>
      <div className='wrapper'>
        <Sidebar />
        <TableList />
      </div>
    </div>
  )
}

export default Home
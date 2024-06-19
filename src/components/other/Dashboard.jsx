import React from 'react'
import Views from './Views'
import CategoryViewsChart from './CategoryViewsChart'
import UsersPieChart from './UsersPieChart'

const Dashboard = () => {
  return (
    <div className='p-5 gap-5 h-fit w-full mb-10'>
    <h1 className='p-2 text-3xl font-bold'>DASHBOARD</h1>
    <hr />
      <div className="w-full h-[400px] mb-2  ">
        <Views />
      </div>
      <div className="w-full h-[400px] pt-5 mb-2 ">
        <CategoryViewsChart />
      </div>
      <div className="w-full h-[400px] pt-5 mb-2 ">
        <UsersPieChart />
      </div>
    </div>
  )
}

export default Dashboard
import React from 'react'
import AdminNav from '../../components/nav/AdminNav'


const AdminDashboard = () => {

  return (
    <React.Fragment>
    
      <div className="container">
        <div className="row">
          <div className="col-2"><AdminNav /></div>
          <div className="col">
          <h3> Admin Dashboard   </h3>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default AdminDashboard
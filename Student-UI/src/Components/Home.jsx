import React from 'react'
import './Styles/Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  const buttonStyles = {
    height:'200px',

  }
  return (
    <>
      <div className='pt-5 my-5'>
        <div className='home-div my-5'>
          <p>Welcome to My School Student Data management App.</p>
          <h1>Over Here we display your School Name and Logo.</h1>
          <h2>Where you can manage your Data of Students Easily and fast.</h2>
        </div>

        <Link to={'/students'} >
        <button style={buttonStyles} type="button" className="btn btn-outline-success">View Students</button>
        </Link>
        <button style={buttonStyles} type="button" className="btn btn-outline-warning">View Fees</button>
        <Link to={`/add-student`}>
        <button style={buttonStyles} type="button" className="btn btn-outline-info">Add Student</button>
        </Link>
        <button style={buttonStyles} type="button" className="btn btn-outline-danger">Delete Student</button>
      </div>
      <div className="container my-5">
      <button style={buttonStyles} type="button" className="btn btn-outline-light">Teachers Details</button>
      <button style={buttonStyles} type="button" className="btn btn-outline-light">Admission Enquiry form</button>


      </div>
    </>
  )
}

export default Home
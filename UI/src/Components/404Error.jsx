import React from 'react'
import { Link } from 'react-router-dom'
import './Styles/Error.css'

const Error = () => {
  return (
    <>

    <div id='not-found'>
        <div className='not-found'>
            <div className='notfound-404'>
                <h1>404</h1>
            </div>
            <h2>We are sorry Page Not Found</h2>
            <p className='mb-5'>The page you are serching for does not exist in our app so please try to search a valid page .</p>
        </div>
        <h1> Here are some Links which you can try.</h1>
        <div className='justify-content-between mt-5'>
            
            <Link to='/'> <button className='btn btn-success'> Home</button></Link>
            <Link to="/about"><button className='btn btn-success'> About</button></Link>
            <Link to="/contact">  <button className='btn btn-success'> Contact</button></Link>
            <Link to="/signup"> <button className='btn btn-success'> Register</button></Link>
            <Link to="/login"> <button className='btn btn-success'> Login</button></Link>
        </div>
    </div>
    
    </>
  )
}

export default Error
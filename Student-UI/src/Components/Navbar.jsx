import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link to={'/'} class="navbar-brand" href="#">SCHOOL NAME</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <Link to={'/'} class="nav-link" href="#">Home <span class="sr-only">(current)</span></Link>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <Link to={'/about'} class="nav-link" href="#">About</Link>
      </li>
      <li class="nav-item">
        <Link to={'/login'} class="nav-link" href="#">Login</Link>
      </li>
      <li class="nav-item">
        <Link to={'/signup'} class="nav-link" href="#">Register</Link>
      </li>
      <li class="nav-item">
      </li>
    </ul>
  </div>
</nav>
    </>
  )
}

export default Navbar
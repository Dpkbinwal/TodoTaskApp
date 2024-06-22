import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to='/'>
        <img src="https://i.graphicmama.com/uploads/2019/3/5c81d12ca5c93-Tasks%20Management%20Logo%20Design.jpg" alt='LOGO' className='logo'/>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link target='_blank' to="https://dpkbinwalportfolio.netlify.app/">PortFolio</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

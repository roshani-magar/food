import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({text,icon, className, onClick,to}) => {
  return (
    <Link to={to}>

    <button onClick={onClick} className='py-2 px-4 border border-white rounded-md'>
      {text}
      {icon}
      {className}
    </button>
    </Link>
  )
}

export default Button
 
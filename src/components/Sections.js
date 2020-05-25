import React from 'react'

export function Section1({title, children, style, onClick}) {
  return (
    <section onClick={onClick} className='Container' style={style}>
      {title && <h1>{title}</h1>}
      {children}
    </section>
  )
}

export function Section2({title, children, style}) {
  return (
    <section className='Container' style={style}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}

export function Row({children, style}) {
  return (
    <div className='Row'>
      {children}
    </div>
  )
}

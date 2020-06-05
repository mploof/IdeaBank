import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useTrail, animated } from 'react-spring'

function NavMenu() {

  const linkStyle = {color: 'inherit', textDecoration: 'none' };
  const [expanded, setExpanded] = useState(true)

  const optionContents = [
    <Link to='/submit' onClick={handleSelect} style={linkStyle}><h2 className='MenuText'>Submit</h2></Link>,
    <Link to='/search' onClick={handleSelect} style={linkStyle}><h2 className='MenuText'>Search</h2></Link>,
    <Link to='/browse' onClick={handleSelect} style={linkStyle}><h2 className='MenuText'>Browse</h2></Link>,
    <Link to='/about' onClick={handleSelect}  style={linkStyle}><h2 className='MenuText'>About</h2></Link>,
  ]

  const springConfig = {mass: 1, tension: 210, friction: 20, velocity: 0}
  const [trail, set] = useTrail(optionContents.length, () => ({
    opacity: 1,
    height: '50px',
    maxWidth: '100px',
    config: springConfig
  }))

  const options = trail.map(({opacity, height, maxWidth}, index) =>
    {
      return (
        <animated.div key={index} className='MenuItem' style={{height, opacity}}>
          <animated.div style={height}>
            {optionContents[index]}
          </animated.div>
        </animated.div>
      )
    }
  )

  function handleClick() {
    setExpanded(previous => !previous)
  }

  function handleSelect() {
    setExpanded(false)
  }

  useEffect(() =>
    {
      set({
        opacity: expanded ? 1 : 0,
        maxWidth: expanded ? '350px' : '0px',
        height: expanded ? '50px' : '0px',
      })
    }, [expanded]
  )

  return (
    <div className='NavMenu'>
      <div className='TitleBlock' onClick={handleClick} >
       <h1>The Idea Bank</h1>
      </div>
      <div>
        {options}
      </div>
    </div>
  );
}


export default NavMenu;

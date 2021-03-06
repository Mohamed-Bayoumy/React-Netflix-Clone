import React, { useEffect, useState } from 'react'
import './styles/nav.scss'
function Nav() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                handleShow(true);
            }
            else {
                handleShow(false);
            }
        })
        return () => window.removeEventListener('scroll')
    }, [])
    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <img className="nav__logo" src='https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png' alt='Netflix Logo'>
            </img>

            <img className="nav__avatar" src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt='Avatar'>
            </img>
        </div>
    )
}

export default Nav

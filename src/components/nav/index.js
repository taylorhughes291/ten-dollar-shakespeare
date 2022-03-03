import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faBars } from '@fortawesome/free-solid-svg-icons'
import dateFormat from 'dateformat'
import { useMediaQuery } from 'react-responsive'

const Nav = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////

    const [visible, setVisible] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const isTablet = useMediaQuery({
        query: '(min-width: 768px)'
      })

    /////////////////////////////
    // Functions
    /////////////////////////////

    const subEntries = props.entries.map((item, index) => {
        return (
            <Link
                to={'/post/' + item.sys.id}
                key={index}
                onClick={() => toggleMenu(true)}
            >
                <li 
                    className='sub-menu-item'
                >
                    <div className='item-wrapper'>
                        <div className='sub-item'>
                        {dateFormat(item.fields.dateOfProduction, "m/d/yy") + ' - ' + item.fields.title}
                        </div>
                        <div className='menu-background'></div>
                    </div>
                </li>
            </Link>
        )
    })
    const subUpcoming = props.upcoming.map((item, index) => {
        return (
            <Link
                to={'/upcoming/' + item.sys.id}
                key={index}
                onClick={() => toggleMenu(true)}
            >
                <li 
                    className='sub-menu-item'
                >
                    <div className='item-wrapper'>
                        <div className='sub-item'>
                            {dateFormat(item.fields.dateOfProduction, "m/d/yy") + ' - ' + item.fields.title}
                        </div>
                        <div className='menu-background'></div>
                    </div>
                </li>
            </Link>
        )
    })

    function toggleMenu(isNewPage = false) {
        if (visible) {
            setVisible(false)
        } else {
            setVisible(true)
        }

        if (isNewPage) {
            window.scrollTo(0, 0)
        }
    }

    /////////////////////////////
    // Render
    /////////////////////////////

    useEffect(() => {
        if (!visible) {
            setIsLoaded(true)
        }
    }, [])

    const loaded = () => {
        return (
            <div 
                id='nav'
                className={isTablet ? 'scroll-menu' : (visible ? 'scroll-menu' : 'scroll-back-menu')}
            >
                <div 
                    id='blocker'
                    className={isTablet ? 'fade' : (visible ? 'fade' : 'fade-reverse')}
                ></div>
                <div 
                    id='mobile-nav'
                    onClick={() => toggleMenu()}
                >
                    <FontAwesomeIcon 
                        className={visible ? 'hidden bars' : 'bars'}
                        color='#FAC8C6'
                        icon={faBars} 
                        size="2x"
                    />
                    <FontAwesomeIcon
                        className={visible ? 'close' : 'hidden close'}
                        icon={faX}
                        color='#FAC8C6'
                        size='2x'
                    />
                </div>
                <div 
                    id='full-menu'
                >
                    <ul id='all-menu'>
                        <li 
                            className='menu-item'
                        >
                            <div className='item-wrapper'>
                            <Link
                                to='/'
                                onClick={() => toggleMenu(true)}
                            >
                                <div className='full-item'>
                                    Home
                                </div>
                                <div className='menu-background'></div>
                            </Link>
                            </div>
                        </li>
                        <li className='menu-item'>
                            <div className='item-wrapper'>
                                <Link
                                    to='/postlist'
                                    onClick={() => toggleMenu(true)}
                                >
                                    <div className='full-item'>
                                        Posts
                                    </div>
                                    <div className='menu-background'></div>
                                </Link>
                            </div>
                            <ul 
                                id='sub-menu'
                            >
                                {subEntries}
                            </ul>
                        </li>
                        <li className='menu-item'>
                            <div className='item-wrapper'>
                                <Link
                                    to='/upcoming'
                                    onClick={() => toggleMenu(true)}
                                >
                                    <div className='full-item'>
                                        Upcoming
                                    </div>
                                    <div className='menu-background'></div>
                                </Link>
                            </div>
                            <ul
                                id='sub-menu'
                            >
                                {subUpcoming}
                            </ul>
                        </li>
                        <li className='menu-item'>
                            <div className='item-wrapper'>
                                <Link
                                    to='/about'
                                    onClick={() => toggleMenu(true)}
                                >
                                    <div className='full-item'>
                                        About
                                    </div>
                                    <div className='menu-background'></div>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id='img-cont'>
                    <img src='/logo192.png' />
                </div>
            </div>
        )
    } 

    const loading = () => {
        return (
            <h2>Loading...</h2>
        )
    }

    return isLoaded ? loaded() : loading()
}

export default Nav
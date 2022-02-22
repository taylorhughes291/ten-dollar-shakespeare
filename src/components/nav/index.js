import {useState} from "react"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faBars } from '@fortawesome/free-solid-svg-icons'
import dateFormat, {masks} from 'dateformat'

const Nav = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////

    const [visible, setVisible] = useState(false)

    /////////////////////////////
    // Functions
    /////////////////////////////

    const subEntries = props.entries.map((item, index) => {
        return (
            <Link
                to={'/post/' + item.sys.id}
                key={index}
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
                to={'/post/' + item.sys.id}
                key={index}
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

    const toggleMenu = () => {
        if (visible) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }

    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div id='nav'>
            <div 
                id='mobile-nav'
                onClick={toggleMenu}
            >
                <FontAwesomeIcon 
                    className={visible ? 'hidden' : ''}
                    color='#FAC8C6'
                    icon={faBars} 
                    size="2x"
                />
                <FontAwesomeIcon
                    className={visible ? '' : 'hidden'}
                    icon={faX}
                    color='#FAC8C6'
                    size='2x'
                />
            </div>
            <div 
                id='full-menu'
                class={visible ? '' : 'hidden' }
            >
                <ul id='all-menu'>
                    <Link
                        to='/'
                    >
                        <li 
                            className='menu-item'
                        >
                            <div className='item-wrapper'>
                                <div className='full-item'>
                                    Home
                                </div>
                                <div className='menu-background'></div>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to='/postlist'
                    >
                        <li className='menu-item'>
                            <div className='item-wrapper'>
                                <div className='full-item'>
                                    Posts
                                </div>
                                <div className='menu-background'></div>
                            </div>
                            <ul 
                                id='sub-menu'
                            >
                                {subEntries}
                            </ul>
                        </li>
                    </Link>
                    <Link
                        to='/upcoming'
                    >
                        <li className='menu-item'>
                            <div className='item-wrapper'>
                                <div className='full-item'>
                                    Upcoming
                                </div>
                                <div className='menu-background'></div>
                            </div>
                            <ul
                                id='sub-menu'
                            >
                                {subUpcoming}
                            </ul>
                        </li>
                    </Link>
                    <Link
                        to='/about'
                    >
                    <li className='menu-item'>
                        <div className='item-wrapper'>
                                <div className='full-item'>
                                    About
                                </div>
                                <div className='menu-background'></div>
                            </div>
                    </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Nav
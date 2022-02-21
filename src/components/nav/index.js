import React from "react"
import {Link} from "react-router-dom"

const Nav = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////


    /////////////////////////////
    // Functions
    /////////////////////////////

    // TODO: Distribute upcoming and past entries.
    const subEntries = props.entries.map((item, index) => {
        return (
            <Link
                to={'/post/' + item.sys.id}
            >
                <li 
                    className='sub-menu'
                    key={index}
                >{item.fields.title}</li>
            </Link>
        )
    })
    const subUpcoming = props.upcoming.map((item, index) => {
        return (
            <Link
                to={'/post/' + item.sys.id}
            >
                <li 
                    className='sub-menu'
                    key={index}
                >{item.fields.title}</li>
            </Link>
        )
    })

    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div id='nav'>
            <ul>
                <Link
                    to='/'
                >
                    <li className='menu=item'>Home</li>
                </Link>
                <Link
                    to='/postlist'
                >
                    <li className='menu=item'>Posts
                        <ul>
                            {subEntries}
                        </ul>
                    </li>
                </Link>
                <Link
                    to='/upcoming'
                >
                    <li className='menu=item'>Upcoming
                        <ul>
                            {subUpcoming}
                        </ul>
                    </li>
                </Link>
                <Link
                    to='/about'
                >
                <li className='menu=item'>About</li>
                </Link>
            </ul>
        </div>
    )
}

export default Nav
import React from "react"

const Nav = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////


    /////////////////////////////
    // Functions
    /////////////////////////////

    // TODO: Distribute upcoming and past entries.
    const subMenu = props.entries.map((item, index) => {
        return (
            <li class='sub-menu'>{item.fields.title}</li>
        )
    })

    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div id='nav'>
            <ul>
                <li className='menu=item'>Home</li>
                <li className='menu=item'>Posts
                    <ul>
                        {subMenu}
                    </ul>
                </li>
                <li className='menu=item'>Upcoming</li>
                <li className='menu=item'>About</li>
            </ul>
        </div>
    )
}

export default Nav
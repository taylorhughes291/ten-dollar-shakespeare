import React from "react"
import dateFormat from 'dateformat'
import {Link} from "react-router-dom"

const Home = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////


    /////////////////////////////
    // Functions
    /////////////////////////////

    const recentPosts = props.entries.map((item, index) => {
        return (
            <li
                key={index}
            >
                <Link
                    to={'/post/' + item.sys.id}
                >
                    {dateFormat(item.fields.dateOfProduction, "m/d/yy") + ' - ' + item.fields.title}
                </Link>
            </li>
        )
    })

    const recentUpcoming = props.upcoming.map((item, index) => {
        const city = item.fields.city === undefined ? '' : `${item.fields.city}`
        const state = item.fields.state === undefined ? '' : `${item.fields.state}`

        return (
            <li
                key={index}
            >
                <Link
                    to={'/post/' + item.sys.id}
                >
                    {dateFormat(item.fields.dateOfProduction, "m/d/yy h:MM TT")} - {item.fields.title} - {city}, {state}
                </Link>
            </li>
        )
    })

    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div id='home'>
            <div id='hook' className='home-section'>
                <h3 className='home-title'>Welcome to the filthy masses</h3>
                <img 
                    src='/home-1.jpeg'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <p>Welcome to Ten Dollar Shakespeare! This is a Southern California based blog centered around the appreciation, review, and information distribution of cheap local Shakespeare productions around my area. I will post all upcoming dates in which I will attend, complete with pricing, and upon viewing I will write a quick report about the production and my viewing experience.<br /><br />Long has it been proven that the happiest wine drinkers are those purchasing bottles in the range of $10-$15. As somebody who fits staunchly in that category of wine-drinker I believe that this line of thought could be applied to many other parts of life, including entertainment, and is the inspiration for this page. Thank you for your patronage and enjoy!
</p>
            </div>
            <div id='recent' className='home-section'>
                <div className='section-header'>
                    <h3 className='home-title'>Recent Posts</h3>
                    <Link
                        to='/postList'
                        onClick={() => {window.scrollTo(0, 0)}}
                    >
                        <p>See All</p>
                    </Link>
                </div>
                <img 
                    src='/home-2.jpeg'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <ul>
                    {recentPosts}
                </ul>
            </div>
            <div id='upcoming' className='home-section'>
                <div className='section-header'>
                    <h3 className='home-title'>Upcoming Productions</h3>
                    <Link
                        to='/upcoming'
                        onClick={() => {window.scrollTo(0, 0)}}
                    >
                        <p>See All</p>
                    </Link>
                </div>
                <img 
                    src='/home-3.jpeg'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <ul>
                    {recentUpcoming}
                </ul>
            </div>
        </div>
    )
}

export default Home
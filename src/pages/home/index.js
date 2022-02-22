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

    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div id='home'>
            <div id='hook'>
                <h3 className='home-title'>Welcome as part of the filthy masses</h3>
                <img 
                    src='https://images.unsplash.com/photo-1571668019032-21d13bf2fca3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1144&q=80'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <p>Welcome to Ten Dollar Shakespeare! This is a Southern California based blog centered around the appreciation, review, and distribution of information of cheap local Shakespeare productions around my area. I will post all upcoming dates in which I will attend, complete with pricing, and upon viewing I will write a quick report about the production and my experience in viewing.<br /><br />Long has it been proven that the happiest wine drinkers are those purchasing bottles in the range of $10-$15. As somebody who fits staunchly in that category of wine-drinker I believe that this line of thought could be applied to many other parts of life, including entertainment, and is the inspiration for this page. Thank you for your patronage and enjoy!
</p>
            </div>
            <div id='recent'>
                <div className='section-header'>
                    <h3 className='home-title'>Recent Posts</h3>
                    <Link
                        to='/posts'
                    >
                        <p>See All</p>
                    </Link>
                </div>
                <img 
                    src='https://images.unsplash.com/photo-1529167182942-894f5ff43f34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <ul>
                    {recentPosts}
                </ul>
            </div>
            <div id='upcoming'>
            <div className='section-header'>
                    <h3 className='home-title'>Upcoming Productions</h3>
                    <Link
                        to='/upcoming'
                    >
                        <p>See All</p>
                    </Link>
                </div>
                <img 
                    src='https://images.unsplash.com/photo-1583148178209-dc3f964671ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
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
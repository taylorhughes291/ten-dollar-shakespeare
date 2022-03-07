import React from "react"
import dateFormat from 'dateformat'
import {Link} from "react-router-dom"
import UpcomingCalendar from "../../components/upcomingCalendar"


const PostList = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////

    let years = [...new Set(props.entries.map((item, index) => {
        return (
            dateFormat(item.fields.dateOfProduction, 'yyyy')
        )
    }))].sort(function(a,b){
        return new Date(b) - new Date(a)
      })

    /////////////////////////////
    // Functions
    /////////////////////////////

    const yearSections = years.map((item, index) => {
        const yearEntries = props.entries.filter((item2, index2) => {
            return (
                dateFormat(item2.fields.dateOfProduction, 'yyyy') === item
            )
        }).map((item, index) => {
            const city = item.fields.city === undefined ? '' : `${item.fields.city}`
            const state = item.fields.state === undefined ? '' : `${item.fields.state}`

            let dollarHighlighter = ''
            if (item.fields.cost <= 10) {
                dollarHighlighter += 'bold '
            }
            if (item.fields.cost === 0) {
                dollarHighlighter += 'red '
            }

            return (
                <li
                    key={index}
                    
                >
                    <Link
                        to={props.type === 'posts' ? '/post/' + item.sys.id : '/upcoming/' + item.sys.id}
                        className={props.type === 'upcoming' ? dollarHighlighter : ''}
                    >
                        {props.type === 'upcoming' ? 
                            `${dateFormat(item.fields.dateOfProduction, "ddd - m/d/yy h:MM TT")} - ${item.fields.title} - ${city}, ${state} - $${item.fields.cost}` : 
                            `${dateFormat(item.fields.dateOfProduction, "m/d/yy")} - ${item.fields.title}`}
                    </Link>
                </li>
            )
        })
        return (
            <div 
                className='year-section'
                key={index}
            >
                <div id='header-cont'>
                    <h3>{`${item} ${props.type === 'upcoming' ? 'Upcoming' : 'Posts'}`}</h3>
                    {props.type === 'upcoming' && <div id='legend'>
                        <p className='bold'>$10</p>
                        <p className='bold red'>Free</p>
                    </div>}
                </div>
                <ul>
                    {yearEntries}
                </ul>
            </div>
        )
    })

    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div
            id='posts'
        >
            {props.type === 'upcoming' && 
                <div id='calendar'>
                    <UpcomingCalendar 
                        entries={props.entries}
                    />
                </div>
            }
            {yearSections}
        </div>
    )
}

export default PostList
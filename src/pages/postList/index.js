import {useEffect, useState} from "react"
import dateFormat from 'dateformat'
import {Link} from "react-router-dom"
import loadable from '@loadable/component'


const PostList = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////

    const [displayEntries, setDisplayEntries] = useState([])
    const [filterDisplay, setFilterDisplay] = useState('all')

    let years = [...new Set(displayEntries.map((item, index) => {
        return (
            dateFormat(item.fields.dateOfProduction, 'yyyy')
        )
    }))].sort(function(a,b){
        return new Date(b) - new Date(a)
      })

    const UpcomingCalendar = loadable(() => import('../../components/upcomingCalendar'))

    /////////////////////////////
    // Functions
    /////////////////////////////

    const handleFilter = (displayOption, unfilter, filterAmount) => {
        setFilterDisplay(displayOption)
        if (unfilter) {
            setDisplayEntries(props.entries)
        } else {
            const filteredEntries = props.entries.filter((item, index) => {
                return item.fields.cost <= filterAmount
            })
            setDisplayEntries(filteredEntries)
        }
    }

    const yearSections = years.map((item, index) => {
        const yearEntries = displayEntries.filter((item2, index2) => {
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
                        {filterDisplay !== 'all' && <p
                            className='pointer'
                            onClick={() => handleFilter('all', true)}
                        >
                            All
                        </p>}
                        {filterDisplay !== 'ten' && <p 
                            className='bold pointer'
                            onClick={() => handleFilter('ten', false, 10)}
                        >
                            $10
                        </p>}
                        {filterDisplay !== 'free' && <p 
                            className='bold red pointer'
                            onClick={() => handleFilter('free', false, 0)}
                        >
                            Free
                        </p>}
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

    useEffect(() => {
        if (props.entries.length > 0) {
            setDisplayEntries(props.entries)
        }
    }, [props.entries])

    return (
        <div
            id='posts'
        >
            {props.type === 'upcoming' && 
                <div id='calendar'>
                    <UpcomingCalendar 
                        entries={displayEntries}
                    />
                </div>
            }
            {yearSections}
        </div>
    )
}

export default PostList
import {useEffect, useState} from "react"
import dateFormat from 'dateformat'
import loadable from '@loadable/component'
import { useMediaQuery } from 'react-responsive'
import PostYearEntries from "../../components/postYearEntries"
import UpcomingYearEntries from "../../components/upcomingYearEntries"


const PostList = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////

    const [displayEntries, setDisplayEntries] = useState([])
    const [filterDisplay, setFilterDisplay] = useState('all')
    const [showCalendar, setShowCalendar] = useState(false)
    const [showMap, setShowMap] = useState(false)

    let years = [...new Set(displayEntries.map((item, index) => {
        return (
            dateFormat(item.fields.dateOfProduction, 'yyyy')
        )
    }))].sort(function(a,b){
        return new Date(b) - new Date(a)
      })

    const UpcomingCalendar = loadable(() => import('../../components/upcomingCalendar'))
    const Map = loadable(() => import('../../components/map'))

    const isTabletOrDesktop = useMediaQuery({
        query: '(min-width: 767px)'
    })

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

    const handleShow = (type) => {
        if (type === 'calendar') {
            if (showCalendar) {
                setShowCalendar(false)
            } else {
                setShowCalendar(true)
            }
        } else if (type === 'map') {
            if (showMap) {
                setShowMap(false)
            } else {
                setShowMap(true)
            }
        }
    }

    const yearSections = years.map((item, index) => {

        return (
            <div 
                className={props.type === 'upcoming' ? 'upcoming year-section' : 'year-section'}
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
                <ul
                    className='year-list'
                >
                    {props.type === 'posts' && 
                        <PostYearEntries 
                            entries={displayEntries}
                            year={item}
                        />
                    }
                    {props.type === 'upcoming' && 
                        <UpcomingYearEntries 
                            entries={displayEntries}
                            year={item}
                        />
                    }
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
            {(props.type === 'upcoming' && isTabletOrDesktop) && 
                <div 
                    id='calendar'
                    className={showCalendar ? '' : 'no-padding-bottom'}
                >
                    <div className='section-header'>
                        <h3>Calendar</h3>
                        <p
                            onClick={() => handleShow('calendar')}
                            className={showCalendar ? 'hidden pointer' : 'pointer'}
                        >
                            Show
                        </p>
                        <p
                            onClick={() => handleShow('calendar')}
                            className={showCalendar ? 'pointer' : 'hidden pointer'}
                        >
                            Hide
                        </p>
                    </div>
                    {showCalendar && <div
                        id='calendar-cont'
                    >
                        <UpcomingCalendar 
                            entries={displayEntries}
                        />
                    </div>}
                </div>}
            {props.type === 'upcoming' && 
                <div 
                    id='map'
                    className={showMap ? '' : 'no-padding-bottom'}
                >
                    <div className='section-header'>
                        <h3>Map</h3>
                        <p
                            onClick={() => handleShow('map')}
                            className={showMap ? 'hidden pointer' : 'pointer'}
                        >
                            Show
                        </p>
                        <p
                            onClick={() => handleShow('map')}
                            className={showMap ? 'pointer' : 'hidden pointer'}
                        >
                            Hide
                        </p>
                    </div>
                    {showMap && <div
                        id='map-cont'
                    >
                        <Map 
                            entries={displayEntries}
                        />
                    </div>}
                </div>}
            {yearSections}
        </div>
    )
}

export default PostList
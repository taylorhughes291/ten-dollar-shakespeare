import {useEffect, useState} from "react"
import dateFormat from 'dateformat'
import {Link} from "react-router-dom"
import loadable from '@loadable/component'
import { useMediaQuery } from 'react-responsive'


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

        const PostYearEntries = () => {
            return (
                displayEntries.filter((item2, index2) => {
                    return (
                        dateFormat(item2.fields.dateOfProduction, 'yyyy') === item
                    )
                }).map((item, index) => {
                    return (
                        <li
                            key={index}
                            
                        >
                            <Link
                                to={'/post/' + item.sys.id}
                            >
                                {`${dateFormat(item.fields.dateOfProduction, "m/d/yy")} - ${item.fields.title}`}
                            </Link>
                        </li>
                    )
                })
            )
        }

        const distinctEvents = []
        for (let i = 0; i < displayEntries.length; i++) {
            if (
                !distinctEvents.some((item2, index) => {
                    return item2.fields.id === displayEntries[i].fields.id
                })
            ) {
                distinctEvents.push(displayEntries[i])
            }
        }
        const distinctEventsFormatted = distinctEvents.map((item2, index) => {
            return (
                {
                    id: item2.fields.id,
                    address: item2.fields.address,
                    city:item2.fields.city,
                    state: item2.fields.state,
                    zip: item2.fields.zip,
                    cost: item2.fields.cost,
                    productionCompany: item2.fields.productionCompany,
                    theaterLocation: item2.fields.theaterLocation,
                    theaterName: item2.fields.theaterName,
                    title: item2.fields.title,
                    website: item2.fields.website,
                    datesOfProduction: displayEntries.filter((item3, index) => {
                        return (
                            item3.fields.id === item2.fields.id
                        )
                    }).map((item3, index) => {
                        return (
                            {
                                date: item3.fields.dateOfProduction,
                                id: item3.sys.id
                            }
                        )
                    })
                }
            )
        })
        const UpcomingYearEntries = () => { 
            return distinctEventsFormatted.filter((item2, index) => {
                return item2.datesOfProduction.some((item3, index) => {
                    return dateFormat(item3.date, 'yyyy') === item
                })
            }).map((item2, index) => {
                return (
                    <li
                        key={index}
                    >
                        <h4
                            className={item2.cost === 0 ? 'red' : ''}
                        >
                            {`${item2.title} - ${item2.city}, ${item2.state} - $${item2.cost}`}
                        </h4>
                        <ul>
                            {item2.datesOfProduction.map((item3, index) => {
                                return (
                                    <Link
                                        to={'/upcoming/' + item3.id}
                                        key={index}
                                    >
                                        <li
                                            className="date-item"
                                        >{dateFormat(item3.date, 'ddd - m/d/yy h:MM TT')}</li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </li>
                )
            })
        }

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
                    {props.type === 'posts' && <PostYearEntries />}
                    {props.type === 'upcoming' && <UpcomingYearEntries />}
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
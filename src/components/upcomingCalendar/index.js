import React from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {useNavigate} from "react-router-dom"

const UpcomingCalendar = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////

    const localizer = momentLocalizer(moment)
    const navigate = useNavigate()
    
    /////////////////////////////
    // Functions
    /////////////////////////////

    const MyCalendar = () => {
        const eventCalendar = props.entries.map((item,index) => {
            return (
                {
                    title: item.fields.title,
                    start: new Date(item.fields.dateOfProduction),
                    end: new Date(item.fields.dateOfProduction),
                    id: item.sys.id
                }
            )
        })

        return (
            <div>
            <Calendar
                localizer={localizer}
                events={eventCalendar}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={event => navigate(`/upcoming/${event.id}`)}
            />
            </div>
        )
    }

    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div>
            {MyCalendar()}
        </div>
    )
} 

export default UpcomingCalendar
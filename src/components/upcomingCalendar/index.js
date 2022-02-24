import React from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const UpcomingCalendar = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////

    const localizer = momentLocalizer(moment)

    /////////////////////////////
    // Functions
    /////////////////////////////

    const MyCalendar = () => {
        const eventCalendar = props.entries.map((item,index) => {
            return (
                {
                    title: item.fields.title,
                    start: new Date(item.fields.dateOfProduction),
                    end: new Date(item.fields.dateOfProduction)
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
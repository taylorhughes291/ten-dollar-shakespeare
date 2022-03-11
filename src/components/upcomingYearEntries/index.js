import React from 'react'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'

const UpcomingYearEntries = (props) => { 
    const distinctEvents = []
    for (let i = 0; i < props.entries.length; i++) {
        if (
            !distinctEvents.some((item2, index) => {
                return item2.fields.id === props.entries[i].fields.id
            })
        ) {
            distinctEvents.push(props.entries[i])
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
                datesOfProduction: props.entries.filter((item3, index) => {
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
    return distinctEventsFormatted.filter((item2, index) => {
        return item2.datesOfProduction.some((item3, index) => {
            return dateFormat(item3.date, 'yyyy') === props.year
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

export default UpcomingYearEntries
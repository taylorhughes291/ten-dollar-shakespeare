import React from 'react'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'

const PostYearEntries = (props) => {

    return (
        props.entries.filter((item2, index2) => {
            return (
                dateFormat(item2.fields.dateOfProduction, 'yyyy') === props.year
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

export default PostYearEntries
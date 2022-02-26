import {useParams} from "react-router-dom"
import dateFormat from 'dateformat'

const Post = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////

    const postId = useParams().id
    const selectedPost = props.entries.filter((item, index) => {
        return (
            item.sys.id === postId
        )
    })[0]

    /////////////////////////////
    // Functions
    /////////////////////////////



    /////////////////////////////
    // Render
    /////////////////////////////

    const loaded = () => {
        const paragraphs = () => {
            return selectedPost.fields.content2.content.map((item, index) => {
                return (
                    <p
                        key={index}
                    >
                        {item.content[0].value}
                    </p>
                )
            })
        } 
        
        const address = selectedPost.fields.address === undefined ? '' : `${selectedPost.fields.address}`
        const city = selectedPost.fields.city === undefined ? '' : `, ${selectedPost.fields.city}`
        const state = selectedPost.fields.state === undefined ? '' : `, ${selectedPost.fields.state}`
        const zip = selectedPost.fields.zip === undefined ? '' : ` ${selectedPost.fields.zip}`
        
        return (
            <div 
                id='post'
            >
                <h2>{`${selectedPost.fields.title}`}</h2>
                <h3>{selectedPost.fields.productionCompany}</h3>
                <h3>{dateFormat(selectedPost.fields.dateOfProduction, 'm/d/yyyy, h:MM tt')}</h3>
                <div className='info-cont'>
                    <p>Cost: ${selectedPost.fields.cost}</p>
                    <p>Location: {address + city + state + zip}</p>
                    {props.type === 'upcoming' && <p>
                        <a
                            href={selectedPost.fields.website}
                            target='_blank'
                        >Website</a>
                    </p>}
                </div>
                <img src={selectedPost.fields.image.fields.file.url} alt={selectedPost.fields.image.fields.description} />
                {props.type === 'post' && paragraphs()}

            </div>
        )
    } 

    const loading = () => {
        return (
            <h2>Loading...</h2>
        )
    }

    return props.entries.length > 0 ? loaded() : loading()
}

export default Post
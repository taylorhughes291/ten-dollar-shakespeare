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
        const paragraphs = selectedPost.fields.content2.content.map((item, index) => {
            return (
                <p>
                    {item.content[0].value}
                </p>
            )
        })
        
        return (
            <div 
                id='post'
            >
                <h2>{`${selectedPost.fields.title}`}</h2>
                <h3>{selectedPost.fields.productionCompany}</h3>
                <h3>{dateFormat(selectedPost.fields.dateOfProduction, 'm/d/yyyy, h:MM tt')}</h3>
                <img src={selectedPost.fields.image.fields.file.url} alt={selectedPost.fields.image.fields.description} />
                {paragraphs}
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
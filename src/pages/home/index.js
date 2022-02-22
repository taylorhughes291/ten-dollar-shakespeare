import React from "react"

const Home = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////


    /////////////////////////////
    // Functions
    /////////////////////////////



    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div id='home'>
            <div id='hook'>
                <h3 className='home-title'>My journey as one of the filthy masses</h3>
                <img 
                    src='https://images.unsplash.com/photo-1571668019032-21d13bf2fca3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1144&q=80'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <p>Test paragraph</p>
            </div>
            <div id='recent'>
                <h3 className='home-title'>Recent Posts</h3>
                <img 
                    src='https://images.unsplash.com/photo-1529167182942-894f5ff43f34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <p>Test paragraph</p>
            </div>
            <div id='upcoming'>
                <h3 className='home-title'>Upcoming Productions</h3>
                <img 
                    src='https://images.unsplash.com/photo-1583148178209-dc3f964671ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <p>Test paragraph</p>
            </div>
        </div>
    )
}

export default Home
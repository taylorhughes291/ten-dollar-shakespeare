import dateFormat from 'dateformat'
import {Link} from "react-router-dom"
import Mailchimp from 'react-mailchimp-form'

const Home = (props) => {

    /////////////////////////////
    // Constants
    /////////////////////////////


    /////////////////////////////
    // Functions
    /////////////////////////////

    const recentPosts = props.entries.map((item, index) => {
        return (
            <li
                key={index}
            >
                <Link
                    to={'/post/' + item.sys.id}
                >
                    {dateFormat(item.fields.dateOfProduction, "m/d/yy") + ' - ' + item.fields.title}
                </Link>
            </li>
        )
    })

    const recentUpcoming = props.upcoming.map((item, index) => {
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
                className = {item.fields.cost <= 10 ? dollarHighlighter : ''}
            >
                <Link
                    to={'/post/' + item.sys.id}
                >
                    {dateFormat(item.fields.dateOfProduction, "ddd - m/d/yy h:MM TT")} - {item.fields.title} - {city}, {state} - ${item.fields.cost}
                </Link>
            </li>
        )
    })

    /////////////////////////////
    // Render
    /////////////////////////////

    return (
        <div id='home'>
            <div id='hook' className='home-section'>
                <h3 className='home-title'>Welcome to the filthy masses</h3>
                <img 
                    src='/home-1.jpeg'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <p>
                    Welcome to Ten Dollar Shakespeare! This is a Southern California based blog centered around the appreciation, review, and information distribution of cheap local Shakespeare productions around my area. I will post all upcoming dates in which I will attend, complete with pricing, and upon viewing I will write a quick report about the production and my viewing experience.<br /><br />Long has it been proven that the happiest wine drinkers are those purchasing bottles in the range of $10-$15. As somebody who fits staunchly in that category of wine-drinker I believe that this line of thought could be applied to many other parts of life, including entertainment, and is the inspiration for this page. Thank you for your patronage and enjoy!
                </p>
            </div>
            <div id='recent' className='home-section'>
                <div className='section-header'>
                    <h3 className='home-title'>Recent Posts</h3>
                    <Link
                        to='/postList'
                        onClick={() => {window.scrollTo(0, 0)}}
                    >
                        <p>See All</p>
                    </Link>
                </div>
                <img 
                    src='/home-2.jpeg'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <ul>
                    {recentPosts}
                </ul>
            </div>
            <div id='upcoming' className='home-section'>
                <div className='section-header'>
                    <h3 className='home-title'>Upcoming Productions</h3>
                    <Link
                        to='/upcoming'
                        onClick={() => {window.scrollTo(0, 0)}}
                    >
                        <p>See All</p>
                    </Link>
                </div>
                <img 
                    src='/home-3.jpeg'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <ul>
                    {recentUpcoming}
                </ul>
            </div>
            <div id='email-list' className='home-section'>
                <div className='section-header'>
                    <h3 className='home-title'>Join Our Email List</h3>

                </div>
                <img 
                    src='/home-5.jpeg'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <p>
                    Stay up to date on any new performances added, new posts written, events organized, merchandise invented, and general Bard updates. Add your email and see what happens!
                </p>
                <Mailchimp 
                    action={`https://tendollarshakespeare.${process.env.REACT_APP_MAILCHIMP_SERVER_PREFIX}.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&amp;id=${process.env.REACT_APP_MAILCHIMP_ID}`}
                    fields={[
                        {
                          name: 'EMAIL',
                          placeholder: 'hamlet@godaddy.com',
                          type: 'email',
                          required: true
                        }
                      ]}
                      messages = {
                        {
                          sending: "",
                          success: "Thank you for subscribing!",
                          error: "An unexpected internal error has occurred.",
                          empty: "You must write an e-mail.",
                          duplicate: "Too many subscribe attempts for this email address",
                          button: "Subscribe"
                        }
                      }
                      className='mailchimp'
                />
            </div>
            <div id='tip-jar' className='home-section'>
                <div className='section-header'>
                    <h3 className='home-title'>Tip Jar</h3>
                    <a
                        href='https://www.paypal.com/donate/?hosted_button_id=T7D8K7XKUJAEN'
                        onClick={() => {window.scrollTo(0, 0)}}
                    >
                        <p>Tip Here</p>
                    </a>
                </div>
                <img 
                    src='/home-4.jpeg'
                    alt='street art of william shakespeare with a man playing atuba beside it'
                />
                <p>
                    If you feel so inclined, please help support this page by making a donation at the link below. Proceeds will go to the upkeep of this page, ticket and gas costs to continue writing posts, and possibly a few pints at my local bar.
                </p>
                <a
                    href='https://www.paypal.com/donate/?hosted_button_id=T7D8K7XKUJAEN'
                    onClick={() => {window.scrollTo(0, 0)}}
                >
                    <p>Click Here to go to the Tip Jar</p>
                </a>
                <p>(Average donation: $10.)</p>
            </div>
        </div>
    )
}

export default Home
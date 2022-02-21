import './App.css';
import {useState, useEffect} from "react"
import {Routes, Route} from "react-router-dom"
import Nav from './components/nav'
import Home from './pages/home'
import PostList from './pages/postList'
import Post from './pages/post'
import About from './pages/about'
const contentful = require('contentful')

function App() {

  /////////////////////////////
  // Constants
  /////////////////////////////

  let client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_KEY,
    accessToken: process.env.REACT_APP_API_TOKEN,
  });
  const [entries, setEntries] = useState([])
  const [upcoming, setUpcoming] = useState([])


  /////////////////////////////
  // Functions
  /////////////////////////////

  
  
  /////////////////////////////
  // Render
  /////////////////////////////
  useEffect(() => {
    client.getEntries().then(function (entries) {
      const posts = []
      const upcomingEntries = []
      
      if (entries) {
        entries.items.forEach(function (entry) {
          if (!entry.fields.upcoming) {
            posts.push(entry)
          } else {
            upcomingEntries.push(entry)
          }
        });
      }


      const sortedPosts = posts.sort(function(a,b){
        return new Date(b.fields.dateOfProduction) - new Date(a.fields.dateOfProduction)
      })
      const sortedUpcoming = upcomingEntries.sort(function(a,b){
        return new Date(a.fields.dateOfProduction) - new Date(b.fields.dateOfProduction)
      })
      
      setEntries(sortedPosts)
      setUpcoming(sortedUpcoming)
    });
  }, [])


  return (
    <div className="App">
      <h1>Ten Dollar Shakespeare</h1>
      <Nav 
        entries={entries.slice(0, 5)}
        upcoming={upcoming.slice(0,5)}
      />
      <Routes>
        <Route 
          path="/"
          key="no-path"
          element={
            <Home />
          }
        >
        </Route>
        <Route
          path="/postlist"
          element = {
            <PostList />
          }
        >
        </Route>
        <Route
          path="/post/:id"
          element = {
            <Post />
          }
        >
        </Route>
        <Route
          path="/upcoming"
          element = {
            <PostList />
          }
        >
        </Route>
        <Route
          path="/about"
          element = {
            <About />
          }
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;

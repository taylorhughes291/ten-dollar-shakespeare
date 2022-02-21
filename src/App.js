import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import Nav from './components/nav'
import Home from './pages/home'
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


  /////////////////////////////
  // Functions
  /////////////////////////////

  
  
  /////////////////////////////
  // Render
  /////////////////////////////
  useEffect(() => {
    client.getEntries().then(function (entries) {
      // log the title for all the entries that have it
      const sortedEntries = entries.items.sort(function(a,b){
        return new Date(b.fields.dateOfProduction) - new Date(a.fields.dateOfProduction)
      })
      setEntries(sortedEntries)
    });
  }, [])


  return (
    <div className="App">
      <h1>Ten Dollar Shakespeare</h1>
      <Nav 
        entries={entries.slice(0, 5)}
      />
      <Home />
    </div>
  );
}

export default App;

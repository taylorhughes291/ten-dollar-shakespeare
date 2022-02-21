import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import Nav from './components/nav'
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
      setEntries(entries.items)
    });
  }, [])

  console.log(entries);

  return (
    <div className="App">
      <h1>Ten Dollar Shakespeare</h1>
      <Nav />
    </div>
  );
}

export default App;

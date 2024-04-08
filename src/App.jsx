
import { Link } from 'react-router-dom';
import './App.css'

import CoustomRoutes from './routes/CoustomRoutes';

function App() {
 

  return (
    <div className="outer-pokedex">
     <h1 id="pokedex-heading"><Link to="/" className='logo'>Pokedex</Link></h1>
    <CoustomRoutes/>
    </div>
  )
}

export default App;

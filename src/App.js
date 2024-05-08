import './App.css';
import Create from './crud/create';
import Read from './crud/read';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Update from './crud/update';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Create/>}/>
      <Route path='/read'element={<Read/>}/>
      <Route path='/update' element={<Update/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

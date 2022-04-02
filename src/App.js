
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Form } from './components/form/form';
import { Main } from './components/main/main';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/mainPage' element ={<Main/>}/>
          <Route path='/' element = {<Form/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

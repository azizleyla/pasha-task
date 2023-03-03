import logo from './logo.svg';
import './App.css';
import Sidebar from './component/sidebar/Sidebar';
import TableList from './component/table/Table';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CustomerForm from './form/CustomerForm';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>}/>
     <Route path="/create" element={<CustomerForm/>}  />
     <Route path="/edit/:id" element={<CustomerForm/>}  />
     </Routes>

    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Sidebar from './component/sidebar/Sidebar';
import TableList from './component/table/Table';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div style={{display:"flex",gap:"100px"}}>
      <Sidebar/>
      <TableList/>
      </div>
      </div>

    </div>
  );
}

export default App;

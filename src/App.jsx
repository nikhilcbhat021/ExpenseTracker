import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//<img src={reactLogo} className="logo react" alt="React logo" />
//import viteLogo from '/vite.svg'
import './App.css';
import Transaction from './components/TxnComp/Transaction';
import Card from './components/utils/Card';
import Pagination from './components/utils/Pagination';

function App() {

  const [prods, setProds] = useState([]);
  // const url = 'https://dummyjson.com/products/search?limit=100';
  const url = 'https://dummyjson.com/products/search?q=phone';

  const txns = [...Array(200)].fill((<Transaction></Transaction>),0,200)

  useEffect(() => {
    (async () => {
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data.products);

      setProds(data.products);
    });
    console.log(txns)
  }, [])
  
  return (<>
    <div style={{display:'flex', }}>
      <Card></Card>
      <div style={{height: '180px', width:'355px'}}>
        <Card></Card>
      </div>
    </div>

    <br />
    <p>Txn</p>

    <Pagination transactions={txns}></Pagination>
  </>)
}

{/* <div className="grid_">
  {
    prods.length > 0 && 
      prods.map(p => {
        return (
          <div className="grid_cell">
            <img src={p.thumbnail} alt={p.title} />
            <div className='title'>{p.title}</div>
          </div>
        )
      })
  }
</div> */}

export default App

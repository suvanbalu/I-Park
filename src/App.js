import './App.css';
import Parkingcard from './Parkingcard';
// import axios
import axios from 'axios';
// import useState
import { useState,useEffect } from 'react';
// add auto refresh

function App() {
  // create a state variable to store the data
  const [data, setData] = useState([]);
  // get the data from api
  const getData = async () => {
    const response = await axios.get('https://kwvxu8j8vl.execute-api.ap-south-1.amazonaws.com/esParkingDB');
    setData(response.data);
    console.log(data);
    // sort the data with respect to slot id
    setData(response.data.sort((a,b)=>a.Slotid-b.Slotid));

  }

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, 5000);

    // cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  // call the getData functionusing context

  const mapParkingCards = data.map((item,idx) => (
      <Parkingcard 
      key={idx}
      slot={item.Slotid} 
      id={item.CID} 
      occupied={item.occupied} />
    ))

  return (
    <div className="App h-screen w-screen bg-gradient-to-b from-red-100 to-green-100">
      <div className='pt-10 text-6xl font-bold'>I Park</div>
      <div className='pt-3 text-2xl'>Next-Generation Parking Management with IoT Integration</div>
      <div className='pt-16 text-3xl font-bold'>Parking Slots</div>
      {/* add grids of 3 cols with parking card in each of it */}
      <div className='grid grid-cols-3 gap-6 pt-3 m-6 my-6'>
      {mapParkingCards}
      
      </div>
    </div>
  );
}

export default App;

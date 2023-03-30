import './App.css';
import Parkingcard from './Parkingcard';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get('https://kwvxu8j8vl.execute-api.ap-south-1.amazonaws.com/esParkingDB');
    setData(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const mapParkingCards = data.sort((a, b) => {
    if (a.Slotid > b.Slotid)
      return 1;
    if (a.Slotid < b.Slotid)
      return -1;
    if (a.Slotid > b.Slotid)
      return 1;
    return -1;
  }).map((item, idx) => (
    <Parkingcard
      key={idx}
      slot={item.Slotid}
      id={item.CID}
      occupied={item.occupied} />
  ))

  return (
    <div className="App min-h-screen pb-12 w-screen bg-gradient-to-b from-green-100 to-green-50">
      {/* <div className='pt-10 text-6xl font-bold'>i Park</div>
      <div className='pt-3 text-2xl'>Next-Generation Parking Management with IoT Integration</div> */}
      <img src="/assets/ParkingLogo.png" alt="logo" className="pt-10 h-30 lg:h-60 mx-auto" />
      <div className='pt-16 text-3xl font-bold'>Parking Slots</div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pt-3 m-6 my-6'>
        {mapParkingCards}
      </div>
    </div>
  );
}

export default App;

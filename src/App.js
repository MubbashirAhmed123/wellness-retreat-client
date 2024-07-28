import React from 'react';
import { ToastContainer } from 'react-toastify';
import HomePage from './Pages/HomePage';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import BookingList from './Pages/BookingListPage';
import Header from './Components/Header';

const App = () => {
  const navigate=useNavigate()
  const {pathname}=useLocation()
  return (
    <div>
      <ToastContainer/>
      <Header pathname={pathname}/>
      <div className='mt-3 mx-3'>
        {pathname!=='/' && <button className='bg-black text-white px-3 py-1 rounded' onClick={()=>navigate(-1)} >Back</button>}
      </div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/booked-list' element={<BookingList/>} />

      </Routes>
    </div>
  );
};

export default App;

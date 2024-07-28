import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ pathname }) => (
    <header className="bg-blue-600 text-white text-center py-4 flex justify-around items-center">
        <h1 className="text-3xl font-bold">Wellness Retreats</h1>
        {pathname === '/' && <Link to='/booked-list' className='border px-3 py-1 rounded font-semibold '>Bookings</Link>}
    </header>
);

export default Header;

import React, { useEffect, useState } from 'react';
import baseUrl from '../baseUrl';
import { toast } from 'react-toastify';
import Pagination from '../Components/Pagination';

const BookingList = () => {
  const [bookings, setBookings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [bookingsPerPage] = useState(6)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/bookings`)
        const data=await response.json()
        if(response.ok){
            setBookings(data);

        }else{
            toast.error('Error fetching bookings:', data.messgae)

        }
      } catch (error) {
        toast.error('Error fetching bookings:', error)
      }
    };

    fetchBookings();
  }, []);

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">S.l</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">User Phone</th>
              <th className="px-4 py-2">Retreat ID</th>
              <th className="px-4 py-2">Retreat Title</th>
              <th className="px-4 py-2">Retreat Location</th>
              <th className="px-4 py-2">Retreat Price</th>
              <th className="px-4 py-2">Retreat Duration</th>
              <th className="px-4 py-2">Booking Date</th>           
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => (
              <tr key={booking.id} className="border-t border-gray-500">
                <td className="px-4 py-2">{booking.id}</td>
                <td className="px-4 py-2">{booking.user_id}</td>
                <td className="px-4 py-2">{booking.user_name}</td>
                <td className="px-4 py-2">{booking.user_email}</td>
                <td className="px-4 py-2">{booking.user_phone}</td>
                <td className="px-4 py-2">{booking.retreat_id}</td>
                <td className="px-4 py-2">{booking.retreat_title}</td>
                <td className="px-4 py-2">{booking.retreat_location}</td>
                <td className="px-4 py-2">{booking.retreat_price}</td>
                <td className="px-4 py-2">{booking.retreat_duration}</td>
                <td className="px-4 py-2">{booking.booking_date.split('T')[0] +" "+booking.booking_date.split('T')[1] }</td>              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalItems={bookings.length} itemsPerPage={bookingsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default BookingList;

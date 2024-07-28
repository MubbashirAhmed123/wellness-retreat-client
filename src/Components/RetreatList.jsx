import React, { useState, useEffect } from 'react'
import BookingForm from './BookingForm'
import Pagination from './Pagination'
import { toast } from 'react-toastify'
import baseUrl from '../baseUrl'

const RetreatList = ({ filter, search }) => {
    console.log(filter)
  const [retreats, setRetreats] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [retreatsPerPage] = useState(5)
  const [selectedRetreat, setSelectedRetreat] = useState(null)

  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/retreats`)
        if (!response.ok) {
          toast.error('Failed to fetch retreats')
        }
        const data = await response.json()
        setRetreats(data)
      } catch (error) {
        toast.error(`Error: ${error.message}`)
      }
    };
    fetchRetreats()
  }, []);

  const filteredRetreats = retreats.filter(retreat => {
    const matchesFilter = filter ? retreat.title.toLowerCase().includes(filter.toLowerCase()): true
    const matchesSearch = search ? retreat.title.toLowerCase().includes(search.toLowerCase()) : true
    return matchesFilter && matchesSearch
  });
  console.log(filteredRetreats)

  const indexOfLastRetreat = currentPage * retreatsPerPage
  const indexOfFirstRetreat = indexOfLastRetreat - retreatsPerPage
  const currentRetreats = filteredRetreats.slice(indexOfFirstRetreat, indexOfLastRetreat)

  const handleBooking = (retreat) => {
    console.log(retreat)
    setSelectedRetreat(retreat)
  };

  const closeForm = () => {
    setSelectedRetreat(null)
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentRetreats.length > 0 ? (
          currentRetreats.map((retreat) => (
            <div key={retreat.id} className="border border-gray-500 rounded-md p-4">
              <img src={retreat.image} alt={retreat.title} className="w-full h-48 object-cover rounded  " />
              <h2 className="text-xl font-bold mt-2">{retreat.title}</h2>
              <p>{retreat.description}</p>
              <p>Date: {new Date(+retreat.date).toLocaleDateString()}</p>
              <p>Location: {retreat.location}</p>
              <p>Price: ${retreat.price}</p>
              <button className="mt-2 p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:ring-1 ring-blue-500 transition" onClick={() => handleBooking(retreat)}>
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No retreats found.</p>
        )}
      </div>
      {selectedRetreat && <BookingForm retreat={selectedRetreat} closeForm={closeForm} />}
      <Pagination
        totalItems={filteredRetreats.length}
        itemsPerPage={retreatsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default RetreatList;

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import baseUrl from '../baseUrl'

const BookingForm = ({ retreat, closeForm }) => {
    const [formData, setFormData] = useState({
        user_id: '',
        user_name: '',
        user_email: '',
        user_phone: '',
        retreat_id: retreat.id,
        retreat_title: retreat.title,
        retreat_location: retreat.location,
        retreat_price: retreat.price,
        retreat_duration: retreat.duration,
        booking_date: new Date()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormData({
            user_id: '',
            user_name: '',
            user_email: '',
            user_phone: '',
        })
        try {
            const response = await fetch(`${baseUrl}/api/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                toast.error(data.error)
                return
            }

            toast.success('Booking successful!')
            closeForm();
        } catch (error) {
            toast.error(`Error booking retreat: ${error.message}`)
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded">
                <h2 className="text-2xl font-bold mb-4">Book Retreat: {retreat.title}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="retreat_id" value={retreat.id} />
                    <input type="hidden" name="retreat_title" value={retreat.title} />
                    <input type="hidden" name="retreat_location" value={retreat.location} />
                    <input type="hidden" name="retreat_price" value={retreat.price} />
                    <input type="hidden" name="retreat_duration" value={retreat.duration} />
                    <input type="hidden" name="booking_date" value={new Date()} />

                    <label className="block mb-2">
                        User ID:
                        <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} className="border border-blue-600 rounded outline-none focus:ring-1 ring-blue-500 transition p-2 w-full" required />
                    </label>
                    <label className="block mb-2">
                        Name:
                        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} className="border border-blue-600 rounded outline-none focus:ring-1 ring-blue-500 transition p-2 w-full" required />
                    </label>
                    <label className="block mb-2">
                        Email:
                        <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} className="border border-blue-600 rounded outline-none focus:ring-1 ring-blue-500 transition p-2 w-full" required />
                    </label>
                    <label className="block mb-2">
                        Phone:
                        <input type="text" name="user_phone" maxLength={10} value={formData.user_phone} onChange={handleChange} className="border border-blue-600 rounded outline-none focus:ring-1 ring-blue-500 transition p-2 w-full" required />
                    </label>
                    <button type="submit" className="mt-4 px-3 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-1 ring-blue-600 transition">Book</button>
                    <button type="button" className="mt-4 ml-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:ring-1 ring-red-500" onClick={closeForm}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;

import React, { useEffect, useState } from 'react';
import { update, updateProperty } from '../../axios/seller.axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';


const UpdatePost = ({ user }) => {
    const { post_id } = useParams();
    console.log(post_id);
    const [location, setLocation] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [carParking, setCarParking] = useState('');
    const [facilities, setFacilities] = useState('');
    const [area, setArea] = useState('');
    const [facing, setFacing] = useState('');
    const [floorNumber, setFloorNumber] = useState('');
    const [openFor, setOpenFor] = useState('');
    const [city, setCity] = useState('');
    const [rent, setRent] = useState('');
    console.log(user);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const populateData = async () => {

            try {
                const response = await update(post_id, user.token);
                console.log(response);
                const data = response.data[0];
                setLocation(data.location);
                setBedrooms(data.bedrooms);
                setBathrooms(data.bathrooms);
                setCarParking(data.carParking);
                setFacilities(data.facilities);
                setArea(data.area);
                setFacing(data.facing);
                setFloorNumber(data.floorNumber);
                setOpenFor(data.openFor);
                setCity(data.city);
                setRent(data.rent);

            }
            catch (error) {
                console.error('Error fetching properties:', error);
                toast.error('no such post');
            }

        }
        populateData();

    }, [])



    const handleSubmit = async (e) => {
        const user_id = user.user_id;
        e.preventDefault();
        const formData = {
            user_id,
            location,
            bedrooms,
            bathrooms,
            carParking,
            facilities,
            area,
            facing,
            floorNumber,
            openFor,
            city,
            rent

        };
        console.log(formData);

        try {
            const response = await updateProperty(post_id, formData, user.token);
            if (response.data) {
                toast.success('Property updated successfully');
                navigate('/viewpost');
            }
        } catch (error) {
            console.error('Error updating property:', error);
            toast.error('Failed to update property');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-center">Update Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Number of Bedrooms</label>
                        <input
                            type="number"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Number of Bathrooms</label>
                        <input
                            type="number"
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Car Parking</label>
                        <input
                            type="text"
                            value={carParking}
                            onChange={(e) => setCarParking(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Facilities Nearby</label>
                        <input
                            type="text"
                            value={facilities}
                            onChange={(e) => setFacilities(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Area (in sq ft)</label>
                        <input
                            type="number"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Facing</label>
                        <input
                            type="text"
                            value={facing}
                            onChange={(e) => setFacing(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Floor Number</label>
                        <input
                            type="number"
                            value={floorNumber}
                            onChange={(e) => setFloorNumber(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Open For (Family or Bachelors)</label>
                        <input
                            type="text"
                            value={openFor}
                            onChange={(e) => setOpenFor(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">City</label>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select a city</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Rent</label>
                        <input
                            type="number"
                            value={rent}
                            onChange={(e) => setRent(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter rent"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Update Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;


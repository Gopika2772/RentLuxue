import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getProperty, deleteProperty } from '../../axios/seller.axios';
import Navbar from '../../components/Navbar';

const ViewPost = ({ user }) => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getProperty(user.user_id, user.token);
        setProperties(response.data);
      } catch (error) {
        toast.error('Failed to fetch properties');
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [user]);

  const handleUpdate = (post_id) => {
    navigate(`/updatepost/${post_id}`);
  };

  const handleDelete = async (post_id) => {
    try {
      await deleteProperty(post_id, user.token);
      setProperties(properties.filter((property) => property.post_id !== post_id));
      toast.success('Property deleted successfully');
    } catch (error) {
      toast.error('Failed to delete property');
      console.error('Error deleting property:', error);
    }
  };

  const handleAddPost = () => {
    navigate('/post');
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Your Posts</h1>
        {properties.length === 0 ? (
          <div className="text-center">
            <p className="mb-4">You have not posted anything yet.</p>
            <button
              onClick={handleAddPost}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Add Post
            </button>
          </div>
        ) : (
          properties.map((property) => (
            <div key={property.post_id} className="p-4 mb-4 border rounded shadow-sm">
              <h2 className="text-xl font-semibold">{property.location}</h2>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <p>Car Parking: {property.carParking}</p>
              <p>Facilities: {property.facilities}</p>
              <p>Area: {property.area} sq ft</p>
              <p>Facing: {property.facing}</p>
              <p>Floor Number: {property.floorNumber}</p>
              <p>Open For: {property.openFor}</p>
              <p>City: {property.city}</p>
              <p>Rent: {property.rent}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleUpdate(property.post_id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(property.post_id)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
        {properties.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleAddPost}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Add Post
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ViewPost;

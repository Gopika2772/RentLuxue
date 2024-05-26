import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertiesByCity, toggleLikePost } from '../../axios/buyer.axios';
import Navbar from '../../components/Navbar';



const Results = ({ user }) => {
    const { city } = useParams();
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();
    const user_id = user.user_id;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await getPropertiesByCity(city);
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [city]);

    const handlePropertyClick = (user_id) => {
        navigate(`/owner/${user_id}`);
    };

    // const handleLike = async (post_id) => {
    //     try {
    //         const response = await toggleLikePost(post_id, user_id);
    //         // Update local state to reflect new like count and like status
    //         setProperties(prevProperties =>
    //             prevProperties.map(property =>
    //                 property.post_id === post_id
    //                     ? { ...property, likeCount: response.data.likeCount, liked: response.data.liked }
    //                     : property
    //             )
    //         );
    //     } catch (error) {
    //         console.error('Error toggling like:', error);
    //     }
    // };

    return (
        <>
            <Navbar></Navbar>
            <div>
                <h1 className="m-6 text-2xl font-bold">Properties in {city}</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <div
                            key={property.post_id}
                            className="p-4 border rounded-md shadow cursor-pointer"
                            onClick={() => handlePropertyClick(property.user_id)}
                        >
                            <h2 className="text-xl font-bold">{property.location}</h2>
                            <p>Bedrooms: {property.bedrooms}</p>
                            <p>Bathrooms: {property.bathrooms}</p>
                            <p>Rent: {property.rent}</p>
                            <p>Area: {property.area} sq ft</p>
                            <p>Facilities: {property.facilities}</p>
                            <p>Facing: {property.facing}</p>
                            <p>Floor Number: {property.floorNumber}</p>
                            <p>Open For: {property.openFor}</p>
                            <p>Car Parking: {property.carParking}</p>
                            {/* <div className="flex items-center mt-2">
                            <button onClick={(e) => { e.stopPropagation(); handleLike(property.post_id); }} className="mr-2">
                                <img
                                    src={property.liked ? "https://img.icons8.com/ios-filled/50/facebook-like.png" : "https://img.icons8.com/ios/50/facebook-like--v1.png"}
                                    alt="Like"
                                    width="30"
                                />
                            </button>
                            <span>Like Count: {property.likeCount}</span>
                        </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Results;

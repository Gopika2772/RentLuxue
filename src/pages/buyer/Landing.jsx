import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import house from "../../assets/house.svg";

function Landing() {
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (city) {
            navigate(`/results/${city}`);
        } else {
            alert('Please select a city');
        }
    };
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <div className='relative'>
                    <img className='w-screen h-[85vh]' src={house} alt="house" />
                </div>
                <div className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <div className='text-5xl font-bold text-black'>
                        Find Your Fresh Start
                    </div>
                    <div className='pt-2 text-2xl font-bold text-red-500'>
                        Discover millions of houses and apartments for rent
                    </div>
                    <div className="mt-6">
                        <div className="flex space-x-4">
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="px-4 py-2 border rounded-md"
                            >
                                <option value="">Select a city</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                            </select>
                            <button
                                onClick={handleSearch}
                                className="px-6 py-2 text-white bg-[#FF3754]  rounded-md "
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landing;

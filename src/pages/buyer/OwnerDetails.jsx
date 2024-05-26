import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOwnerDetails } from '../../axios/buyer.axios';

const OwnerDetails = () => {
    const { user_id } = useParams();
    const [owner, setOwner] = useState(null);

    useEffect(() => {
        const fetchOwnerDetails = async () => {
            try {
                const response = await getOwnerDetails(user_id);
                console.log('Fetched owner details:', response.data);
                setOwner(response.data);
            } catch (error) {
                console.error('Error fetching owner details:', error);
            }
        };

        fetchOwnerDetails();
    }, [user_id]);

    if (!owner) {
        return <div>Owner Doen't Exist</div>;
    }


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Owner Details</h1>
            <div className="mt-4">
                <p>Name: {owner.firstname} {owner.lastname}</p>
                <p>Email: {owner.email}</p>
                <p>Phone: {owner.phone}</p>
            </div>
        </div>
    );
};

export default OwnerDetails;

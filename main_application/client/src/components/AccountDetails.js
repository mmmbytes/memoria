import './styles/AccountDetails.css';

import { useEffect, useState } from 'react';

import { getUserDetails } from '../src/services/Account';

function AccountDetails() {
	const [userDetails, setUserDetails] = useState({
		name: '',
		email: '',
	});

	useEffect(() => {
		const fetchUserDetails = async () => {
			const userData = await getUserDetails();
			setUserDetails(userData);
		};
		// TODO: Create error handling component that displays error message to user
		fetchUserDetails().catch((error) => console.error(error.message));
	}, []);

	return (
		<div className="account-details">
			<div className="account-details__header">
				<h1 className="account-details__title">Account</h1>
				<h2 className="account-details__username">
					{userDetails.name || 'Loading...'}
				</h2>
			</div>
			<div className="account-details__personal-info">
				<h3 className="account-details__subtitle">Personal Information</h3>
				<div className="account-details__info-item">
					<p>Email: </p>
					<p>{userDetails.email || 'Loading...'}</p>
				</div>
			</div>
		</div>
	);
}

export default AccountDetails;

import './styles/AccountDetails.css';

// TODO: Fetch and display the user's actual username and email from the backend
function AccountDetails() {
	return (
		<div className="account-details">
			<div className="account-details__header">
				<h1 className="account-details__title">Account</h1>
				<h2 className="account-details__username">Placeholder Name</h2>
			</div>
			<div className="account-details__personal-info">
				<h3 className="account-details__subtitle">Personal Information</h3>
				<div className="account-details__info-item">
					<p>Email: </p>
					<p>sample.email@gmail.com</p>
				</div>
			</div>
		</div>
	);
}

export default AccountDetails;

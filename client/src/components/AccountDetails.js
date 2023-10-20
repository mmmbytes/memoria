import './styles/AccountDetails.css';

function AccountDetails() {
	return (
		<div className="account__details">
			<div className="account__details-header">
				<h1 className="account__details-title">Account</h1>
				<h2 className="account__details-username">Placeholder Name</h2>
			</div>
			<div className="account__details-personal-info">
				<h3 className="account__details-subtitle">Personal Information</h3>
				<div className="account__details-item">
					<p>Email: </p>
					<p>sample.email@gmail.com</p>
				</div>
			</div>
		</div>
	);
}

export default AccountDetails;

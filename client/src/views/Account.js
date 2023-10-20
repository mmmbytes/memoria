import './styles/Account.css';

import AccountDetails from '../components/AccountDetails';
import { DeleteAccountButton, SignOutButton } from '../components/Buttons';

function Account() {
	return (
		<div className="account">
			<div className="account__grid">
				<div className="account__details-section">
					<AccountDetails />
				</div>
				<div className="account__btn-group-1">
					<SignOutButton className="btn account__btn-signout" />
				</div>
				<div className="account__btn-group-2">
					<DeleteAccountButton className="account__btn-delete" />
				</div>
			</div>
		</div>
	);
}

export default Account;

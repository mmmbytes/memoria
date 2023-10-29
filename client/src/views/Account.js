import './styles/Account.css';

import AccountDetails from '../components/AccountDetails';
import {
	DeleteAccountButton,
	SignOutButton,
} from '../components/buttons/AccountActionsButtons';
import btnMod from '../sharedStyles/button.module.css';

function Account() {
	return (
		<div className="account">
			<div className="account__grid">
				<div className="account__details-section">
					<AccountDetails />
				</div>
				<div className="account__btn-actions-1">
					<SignOutButton
						className={`${btnMod.btn} ${btnMod.btnStyled} account__btn-signout`}
					/>
				</div>
				<div className="account__btn-actions-2">
					<DeleteAccountButton
						className={`${btnMod.btn}`}
						id="account__btn-delete"
					/>
				</div>
			</div>
		</div>
	);
}

export default Account;

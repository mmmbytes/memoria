import '../styles/DeleteAccountModal.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteAccount } from '../../api/AccountApi';
import btnMod from '../../sharedStyles/button.module.css';
import { deleteAuthCookie } from '../../utils/AccountUtils';

export function DeleteAccountButton({ className, id }) {
	const [modalOpen, setModalOpen] = useState(false);
	const navigate = useNavigate();

	const handleDeleteAccount = async (event) => {
		event.stopPropagation();

		try {
			await deleteAccount();
			deleteAuthCookie();
			navigate('/welcome');
		} catch (error) {
			// TODO: Create error handling component that displays error message to user
			console.error(error.message);
		}
	};

	return (
		<div>
			{modalOpen && (
				<div
					className="delete-account-modal"
					onClick={() => setModalOpen(false)}
				>
					<div className="delete-account-modal__container">
						<h1 className="delete-account-modal__header">
							WARNING: Irreversible Action Ahead
						</h1>
						<p className="delete-account-modal__details">
							Proceeding will permanently delete all your data. There&rsquo;s no
							turning the page back.
						</p>
						<p className="delete-account-modal__details">
							If you are certain, click <b>Delete Account</b> below to confirm.
						</p>
						<div className="delete-account-modal__action-btns">
							<button
								type="button"
								className={`${btnMod.btn} ${btnMod.btnStyled} ${btnMod.btnDelete}`}
								id="delete-account-modal__btn-delete"
								onClick={handleDeleteAccount}
							>
								Delete Account
							</button>
							<button
								type="button"
								className={`${btnMod.btn}`}
								id="delete-account-modal__btn-nevermind"
								onClick={() => setModalOpen(false)}
							>
								Nevermind
							</button>
						</div>
					</div>
				</div>
			)}
			<button
				type="button"
				className={className}
				onClick={() => setModalOpen(true)}
			>
				Delete Account
			</button>
		</div>
	);
}

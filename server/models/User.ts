import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	id: {
		type: String,
		required: true,
		unique: true,
	},
});

export default mongoose.model('User', userSchema);

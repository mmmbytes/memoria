const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const {
	createNote,
	deleteNote,
	getAllNotes,
	getLatestNote,
	updateNote,
} = require('../controllers/note');
const Note = require('../models/Note');
const { mockReqRes } = require('./utils/testHelpers');

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (const collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe('getLatestNote', () => {
	it('retrieves the latest note successfully', async () => {
		const latestNoteData = { title: 'Test Note 3', textbody: 'Test content 3' };
		const notesData = [
			{ title: 'Test Note 1', textbody: 'Test content 1' },
			{ title: 'Test Note 2', textbody: 'Test content 2' },
			latestNoteData,
		];
		for (const noteData of notesData) {
			await Note.create(noteData);
		}

		const { req, res } = mockReqRes();
		await getLatestNote(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining(latestNoteData)
		);
	});

	it('returns a 204 status when there are no notes in the database', async () => {
		const { req, res } = mockReqRes();
		await getLatestNote(req, res);

		expect(res.status).toHaveBeenCalledWith(204);
		expect(res.json).toHaveBeenCalledWith({ error: 'No notes found.' });
	});
});

describe('getAllNotes', () => {
	it('retrieves all notes successfully', async () => {
		const notesData = [
			{ title: 'Test Note 1', textbody: 'Test content 1' },
			{ title: 'Test Note 2', textbody: 'Test content 2' },
			{ title: 'Test Note 3', textbody: 'Test content 3' },
		];

		for (const noteData of notesData) {
			await Note.create(noteData);
		}

		const { req, res } = mockReqRes();
		await getAllNotes(req, res);
		const returnedNotes = res.json.mock.calls[0][0];

		expect(res.status).toHaveBeenCalledWith(200);
		for (const noteData of notesData) {
			expect(returnedNotes).toContainEqual(expect.objectContaining(noteData));
		}
		expect(returnedNotes.length).toEqual(notesData.length);
	});

	it('returns a 204 status when there are no notes in the database', async () => {
		const { req, res } = mockReqRes();
		await getAllNotes(req, res);

		expect(res.status).toHaveBeenCalledWith(204);
		expect(res.json).toHaveBeenCalledWith({ error: 'No notes found.' });
	});
});

describe('createNote', () => {
	it('creates a blank new note successfully', async () => {
		const { req, res } = mockReqRes();
		await createNote(req, res);

		const newNote = await Note.findOne({});

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				__v: newNote.__v,
				createdAt: newNote.createdAt,
				title: '',
				textbody: '',
				updatedAt: newNote.updatedAt,
			})
		);
	});

	it('returns a 500 status when there is an error creating a new note', async () => {
		const { req, res } = mockReqRes();

		jest.spyOn(Note, 'create').mockImplementationOnce(() => {
			throw new Error('Error creating a new note.');
		});

		await createNote(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			error: 'Error creating a new note.',
		});

		jest.restoreAllMocks();
	});
});

describe('updateNote', () => {
	let existingNote;

	beforeEach(async () => {
		const noteData = { title: 'Test Note 1', textbody: 'Test content 1' };
		existingNote = await Note.create(noteData);
	});

	it('updates a note successfully', async () => {
		const { req, res } = mockReqRes(
			{ id: existingNote._id },
			{
				title: 'Updated Test Note 1',
				textbody: 'Updated Test content 1',
			}
		);
		await updateNote(req, res);

		const updatedNote = await Note.findById(existingNote._id);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				title: 'Updated Test Note 1',
				textbody: 'Updated Test content 1',
			})
		);
		expect(res.json).toHaveBeenCalledWith(updatedNote);
	});

	it('returns a 404 status when the note is not found', async () => {
		const { req, res } = mockReqRes(
			{ id: new mongoose.Types.ObjectId() },
			{
				title: 'Updated Test Note 1',
				textbody: 'Updated Test content 1',
			}
		);
		await updateNote(req, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: 'Note not found.' });
	});

	it('returns a 400 status when the note id is invalid', async () => {
		const { req, res } = mockReqRes(
			{ id: 'invalid-id' },
			{ title: 'Updated Test Note 1', textbody: 'Updated Test content 1' }
		);
		await updateNote(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid note id.' });
	});
});

describe('deleteNote', () => {
	let existingNote;

	beforeEach(async () => {
		const noteData = { title: 'Test Note 1', textbody: 'Test content 1' };
		existingNote = await Note.create(noteData);
	});

	it('deletes a note successfully', async () => {
		const { req, res } = mockReqRes({ id: existingNote._id });
		await deleteNote(req, res);

		const deletedNote = await Note.findById(existingNote._id);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(deletedNote).toBeNull();
	});

	it('returns the deleted note id', async () => {
		const { req, res } = mockReqRes({ id: existingNote._id });
		await deleteNote(req, res);

		expect(res.json).toHaveBeenCalledWith({
			noteId: existingNote._id,
		});
	});

	it('returns a 404 status when the note is not found', async () => {
		const { req, res } = mockReqRes({ id: new mongoose.Types.ObjectId() });
		await deleteNote(req, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: 'Note not found.' });
	});

	it('returns a 400 status when the note id is invalid', async () => {
		const { req, res } = mockReqRes({ id: 'invalid-id' });
		await deleteNote(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid note id.' });
	});

	it("returns a 500 status when there's a database error", async () => {
		const { req, res } = mockReqRes({ id: existingNote._id });

		jest.spyOn(Note, 'findByIdAndDelete').mockImplementationOnce(() => {
			throw new Error('Error deleting note.');
		});

		await deleteNote(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting note.' });

		jest.restoreAllMocks();
	});
});

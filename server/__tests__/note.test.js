const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const {
	createNote,
	deleteNote,
	getAllNotes,
	getLatestNote,
	getNote,
	updateNote,
} = require('../controllers/note');
const Note = require('../models/Note');
const { mockReqRes } = require('./utils/testHelpers');

let mongoServer;

const sub = 'test-sub';

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
	jest.clearAllMocks();
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe('getLatestNote', () => {
	it('retrieves the latest note successfully', async () => {
		const latestNoteData = {
			title: 'Test Note 3',
			textbody: 'Test content 3',
			sub,
		};
		const notesData = [
			{ title: 'Test Note 1', textbody: 'Test content 1', sub },
			{ title: 'Test Note 2', textbody: 'Test content 2', sub },
			latestNoteData,
		];
		for (const noteData of notesData) {
			await Note.create(noteData);
		}

		const { req, res } = mockReqRes({}, {}, sub);
		await getLatestNote(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining(latestNoteData)
		);
	});

	it('returns a 204 status when there are no notes in the database', async () => {
		const { req, res } = mockReqRes({}, {}, sub);

		await getLatestNote(req, res);

		expect(res.status).toHaveBeenCalledWith(204);
		expect(res.end).toHaveBeenCalled();
	});
});

describe('getNote', () => {
	it('retrieves a note successfully', async () => {
		let existingNote;
		const notesData = [
			{ title: 'Test Note 1', textbody: 'Test content 1', sub },
			{ title: 'Test Note 2', textbody: 'Test content 2', sub },
			{ title: 'Test Note 3', textbody: 'Test content 3', sub },
		];

		for (const noteData of notesData) {
			if (noteData.title === 'Test Note 1') {
				existingNote = await Note.create(noteData);
			} else {
				await Note.create(noteData);
			}
		}
		const { req, res } = mockReqRes({ id: existingNote._id }, {}, sub);
		await getNote(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				title: 'Test Note 1',
				textbody: 'Test content 1',
				sub,
			})
		);
	});

	it('returns a 400 status when the note id is invalid', async () => {
		const { req, res } = mockReqRes({ id: 'invalid-id' }, {}, sub);
		await getNote(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			statusCode: 400,
			message: 'Invalid note id',
		});
	});

	it('returns a 404 status when the note is not found', async () => {
		const { req, res } = mockReqRes(
			{ id: new mongoose.Types.ObjectId() },
			{},
			sub
		);
		await getNote(req, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			statusCode: 404,
			message: 'Note not found',
		});
	});
});

describe('getAllNotes', () => {
	it('retrieves all notes successfully', async () => {
		const notesData = [
			{ title: 'Test Note 1', textbody: 'Test content 1', sub },
			{ title: 'Test Note 2', textbody: 'Test content 2', sub },
			{ title: 'Test Note 3', textbody: 'Test content 3', sub },
		];

		for (const noteData of notesData) {
			await Note.create(noteData);
		}

		const { req, res } = mockReqRes({}, {}, sub);
		await getAllNotes(req, res);
		const returnedNotes = res.json.mock.calls[0][0];

		expect(res.status).toHaveBeenCalledWith(200);
		for (const noteData of notesData) {
			expect(returnedNotes).toContainEqual(expect.objectContaining(noteData));
		}
		expect(returnedNotes.length).toEqual(notesData.length);
	});

	it('returns a 204 status when there are no notes in the database', async () => {
		const { req, res } = mockReqRes({}, {}, sub);
		await getAllNotes(req, res);

		expect(res.status).toHaveBeenCalledWith(204);
		expect(res.end).toHaveBeenCalled();
	});
});

describe('createNote', () => {
	it('creates a blank new note successfully', async () => {
		const { req, res } = mockReqRes({}, {}, sub);
		await createNote(req, res);

		const newNote = await Note.findOne({ sub });

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				__v: newNote.__v,
				createdAt: newNote.createdAt,
				title: '',
				textbody: '',
				sub,
				updatedAt: newNote.updatedAt,
			})
		);
	});

	it('returns a 500 status when there is an error creating a new note', async () => {
		const { req, res } = mockReqRes({}, {}, sub);

		jest.spyOn(Note, 'create').mockImplementationOnce(() => {
			throw new Error('Error creating a new note');
		});

		await createNote(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			statusCode: 500,
			message: 'Error creating a new note',
		});
	});
});

describe('updateNote', () => {
	let existingNote;

	beforeEach(async () => {
		const noteData = { title: 'Test Note 1', textbody: 'Test content 1', sub };
		existingNote = await Note.create(noteData);
	});

	it('updates a note successfully', async () => {
		const { req, res } = mockReqRes(
			{ id: existingNote._id },
			{
				title: 'Updated Test Note 1',
				textbody: 'Updated Test content 1',
				sub,
			},
			sub
		);
		await updateNote(req, res);

		const updatedNote = await Note.findOne({ _id: existingNote._id, sub });

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				title: 'Updated Test Note 1',
				textbody: 'Updated Test content 1',
				sub,
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
				sub,
			},
			sub
		);
		await updateNote(req, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			statusCode: 404,
			message: 'Error saving note. Note not found.',
		});
	});

	it('returns a 400 status when the note id is invalid', async () => {
		const { req, res } = mockReqRes(
			{ id: 'invalid-id' },
			{ title: 'Updated Test Note 1', textbody: 'Updated Test content 1', sub },
			sub
		);
		await updateNote(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			statusCode: 400,
			message: 'Error saving note. Invalid note id.',
		});
	});
});

describe('deleteNote', () => {
	let existingNote;

	beforeEach(async () => {
		const noteData = { title: 'Test Note 1', textbody: 'Test content 1', sub };
		existingNote = await Note.create(noteData);
	});

	it('deletes a note successfully', async () => {
		const { req, res } = mockReqRes({ id: existingNote._id }, {}, sub);
		await deleteNote(req, res);

		const deletedNote = await Note.findOne(existingNote._id, sub);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(deletedNote).toBeNull();
	});

	it('returns the deleted note id', async () => {
		const { req, res } = mockReqRes({ id: existingNote._id }, {}, sub);
		await deleteNote(req, res);

		expect(res.json).toHaveBeenCalledWith({
			noteId: existingNote._id,
		});
	});

	it('returns a 404 status when the note is not found', async () => {
		const { req, res } = mockReqRes(
			{ id: new mongoose.Types.ObjectId() },
			{},
			sub
		);
		await deleteNote(req, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			statusCode: 404,
			message: 'Note not found',
		});
	});

	it('returns a 400 status when the note id is invalid', async () => {
		const { req, res } = mockReqRes({ id: 'invalid-id' }, {}, sub);
		await deleteNote(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			statusCode: 400,
			message: 'Invalid note id',
		});
	});

	it("returns a 500 status when there's a database error", async () => {
		const { req, res } = mockReqRes({ id: existingNote._id }, {}, sub);

		jest.spyOn(Note, 'findOneAndDelete').mockImplementationOnce(() => {
			throw new Error('Error deleting note');
		});

		await deleteNote(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			statusCode: 500,
			message: 'Error deleting note',
		});
	});
});

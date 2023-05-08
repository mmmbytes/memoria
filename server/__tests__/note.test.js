const mongoose = require("mongoose");

const {
	getLatestNote,
	getNotes,
	createNote,
	updateNote,
	deleteNote,
} = require("../controllers/note");
const Note = require("../models/Note.js");
const { mockReqRes } = require("./utils/testHelpers");

describe("getLatestNote", () => {
	it("retrieves the latest note successfully", async () => {
		const notesData = [
			{ title: "Test Note 1", textbody: "Test content 1" },
			{ title: "Test Note 2", textbody: "Test content 2" },
			{ title: "Test Note 3", textbody: "Test content 3" },
		];
		await Note.insertMany(notesData);

		const { req, res } = mockReqRes();
		await getLatestNote(req, res);

		const latestNote = await Note.findOne().sort({ updatedAt: -1 });

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(latestNote);
	});

	it("returns a 204 status when there are no notes in the database", async () => {
		const { req, res } = mockReqRes();
		await getLatestNote(req, res);

		expect(res.status).toHaveBeenCalledWith(204);
		expect(res.json).toHaveBeenCalledWith({ error: "No notes found." });
	});
});

describe("getNotes", () => {
	it("retrieves all notes successfully", async () => {
		const notesData = [
			{ title: "Test Note 1", textbody: "Test content 1" },
			{ title: "Test Note 2", textbody: "Test content 2" },
			{ title: "Test Note 3", textbody: "Test content 3" },
		];
		await Note.insertMany(notesData);

		const { req, res } = mockReqRes();
		await getNotes(req, res);

		const notes = await Note.find({});

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(notes);
	});

	it("returns a 204 status when there are no notes in the database", async () => {
		const { req, res } = mockReqRes();
		await getNotes(req, res);

		expect(res.status).toHaveBeenCalledWith(204);
		expect(res.json).toHaveBeenCalledWith({ error: "No notes found." });
	});
});

describe("createNote", () => {
	it("creates a blank new note successfully", async () => {
		const { req, res } = mockReqRes();
		await createNote(req, res);

		const newNote = await Note.findOne({});

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				__v: newNote.__v,
				createdAt: newNote.createdAt,
				title: "",
				textbody: "",
				updatedAt: newNote.updatedAt,
			})
		);
	});

	it("returns a 500 status when there is an error creating a new note", async () => {
		const { req, res } = mockReqRes();

		jest.spyOn(Note, "create").mockImplementationOnce(() => {
			throw new Error("Error creating a new note.");
		});

		await createNote(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			error: "Error creating a new note.",
		});

		jest.restoreAllMocks();
	});
});

describe("updateNote", () => {
	let existingNote;

	beforeEach(async () => {
		const noteData = { title: "Test Note 1", textbody: "Test content 1" };
		existingNote = await Note.create(noteData);
	});

	it("updates a note successfully", async () => {
		const { req, res } = mockReqRes(
			{ id: existingNote._id },
			{
				title: "Updated Test Note 1",
				textbody: "Updated Test content 1",
			}
		);
		await updateNote(req, res);

		const updatedNote = await Note.findById(existingNote._id);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(updatedNote);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				title: "Updated Test Note 1",
				textbody: "Updated Test content 1",
			})
		);
	});

	it("returns a 404 status when the note is not found", async () => {
		const { req, res } = mockReqRes(
			{ id: new mongoose.Types.ObjectId() },
			{
				title: "Updated Test Note 1",
				textbody: "Updated Test content 1",
			}
		);
		await updateNote(req, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: "Note not found." });
	});

	it("returns a 400 status when the note id is invalid", async () => {
		const { req, res } = mockReqRes(
			{ id: "invalid-id" },
			{ title: "Updated Test Note 1", textbody: "Updated Test content 1" }
		);
		await updateNote(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: "Invalid note id." });
	});
});

describe("deleteNote", () => {
	let existingNote;

	beforeEach(async () => {
		const noteData = { title: "Test Note 1", textbody: "Test content 1" };
		existingNote = await Note.create(noteData);
	});

	it("deletes a note successfully", async () => {
		const { req, res } = mockReqRes({ id: existingNote._id });
		await deleteNote(req, res);

		const deletedNote = await Note.findById(existingNote._id);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(deletedNote).toBeNull();
	});

	it("returns the deleted note id", async () => {
		const { req, res } = mockReqRes({ id: existingNote._id });
		await deleteNote(req, res);

		expect(res.json).toHaveBeenCalledWith({
			noteId: existingNote._id,
		});
	});

	it("returns a 404 status when the note is not found", async () => {
		const { req, res } = mockReqRes({ id: new mongoose.Types.ObjectId() });
		await deleteNote(req, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: "Note not found." });
	});

	it("returns a 400 status when the note id is invalid", async () => {
		const { req, res } = mockReqRes({ id: "invalid-id" });
		await deleteNote(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: "Invalid note id." });
	});

	it("returns a 500 status when there's a database error", async () => {
		const { req, res } = mockReqRes({ id: existingNote._id });

		jest.spyOn(Note, "findByIdAndDelete").mockImplementationOnce(() => {
			throw new Error("Error deleting note.");
		});

		await deleteNote(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ error: "Error deleting note." });

		jest.restoreAllMocks();
	});
});

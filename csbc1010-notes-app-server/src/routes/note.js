const express = require("express");
const router = express.Router();
const { validateNote } = require("../utils/validators");
const Note = require("../models/note.model");

/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post("/", async (req, res) => {
  console.log(
    `[POST] http://localhost:${global.port}/note - Storing a new note`,
  );

  // Check if the 'text' property is present in the request body
  if (!req.body.text) {
    return res.status(400).send('Missing required property: "text"');
  }
  const newText = req.body.text;

  try {
    // Create a new note
    const newNote = new Note({
      text: newText,
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    });

    // Save the new note to the database
    const savedNote = await newNote.save();
    console.log(savedNote);

    // Validate the note
    if (!validateNote(savedNote)) {
      return res.status(500).send("Invalid data type");
    }

    // Return the new note directly in the response
    res.status(201).json({ newNote: savedNote });
  } catch (error) {
    // Respond with an error
    console.error("Fail to insert:", error);
    res.status(500).send("Fail to insert");
  }
});

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put("/", async (req, res) => {
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`);
  const noteId = req.body._id || req.body.id;
  const newText = req.body.text;
  console.log(req.body);
  try {
    // Find the note by ID and update it
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { text: newText, lastModifiedAt: new Date() },
      { new: true, runValidators: true },
    );
    console.log(updatedNote);
    // Check if the note was found and updated
    if (!updatedNote) {
      return res.status(404).send("Note not found");
    }

    // Validate and send the formatted note as a response
    if (!validateNote(updatedNote)) {
      res.status(500).send("Invalid data type");
    }
    res.send({ updatedNote });
  } catch (error) {
    // Respond with an error
    console.error("Failed to update note:", error);
    res.status(500).send("Failed to update note");
  }
});

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete("/", async (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`);

  const noteId = req.body._id;
  try {
    // Find and delete the note by ID
    const deletedNote = await Note.findByIdAndDelete(noteId);
    // Check if the note was found and deleted
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    // If you just want to acknowledge the successful deletion, you can send an empty response
    res.status(200).send();
  } catch (error) {
    // Respond with an error
    console.error("Failed to delete note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});
module.exports = router;

const express = require("express");
const router = express.Router();
const { validateNoteArray } = require("../utils/validators");
const { validateNote } = require("../utils/validators");
const { validateArray } = require("../utils/validators");
const Note = require("../models/note.model");

/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get("/", async (req, res) => {
  try {
    console.log(
      `[GET] http://localhost:${global.port}/notes - fetching all notes`,
    );

    // Fetch all notes from the database
    const notes = await Note.find();

    // Check if notes is defined before sending the response
    if (notes) {
      // Validate the response object
      if (!validateNoteArray(notes)) {
        return res.status(500).send("Invalid data type");
      }

      // Send the notes as a response
      res.send({ notes });
    } else {
      res.send({ notes: [] }); // Send an empty array if no notes are found
    }
  } catch (error) {
    // Respond with an error
    console.error("Fail to query:", error);
    res.status(500).send("Fail to query");
  }
});

// /* ------------------------- TODO-7 - Search Notes -------------------------- */
// router.get('/search', async (req, res) => {
//   console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)
//   try {
//     const searchKey = req.query.searchKey; // Assuming the search key is passed as a query parameter
//     console.log(searchKey)

//     // Use a regex to perform a case-insensitive search
//     const regex = new RegExp(searchKey, 'i');

//     // Fetch all notes that contain the search key in the note text
//     const matchingNotes = await Note.find({ text: { $regex: regex } });

//     // Return an array of matching note objects
//     const result = matchingNotes.map(note => {
//       return {
//         id: note._id,
//         text: note.text,
//         dateCreated: note.createdAt,
//         lastModified: note.lastModifiedAt
//       };
//     });

//     res.json(result);
//   } catch (error) {
//     console.error('Failed to search notes:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// /* ------------------------- TODO-7 - Search Notes -------------------------- */
// router.get("/search/:searchKey", async (req, res) => {
//   console.log(
//     `[GET] http://localhost:${global.port}/notes/search - Searching notes`,
//   );
//   try {
//     const searchKey = req.params.searchKey; // Assuming the search key is passed as a query parameter
//     console.log(searchKey);

//     // Use a regex to perform a case-insensitive search
//     const regex = new RegExp(searchKey, "i");

//     // Fetch all notes that contain the search key in the note text
//     const matchingNotes = await Note.find({ text: { $regex: regex } });

//     // Return an array of matching note objects
//     const notes = matchingNotes.map((note) => {
//       return {
//         id: note._id,
//         text: note.text,
//         dateCreated: note.createdAt,
//         lastModified: note.lastModifiedAt
//       };
//     });

//     res.json(notes);
//   } catch (error) {
//     console.error("Failed to search notes:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

router.get("/search/:searchKey", async (req, res) => {
  console.log(
    `[GET] http://localhost:${global.port}/notes/search - Searching notes`,
  );
  try {
    const searchKey = req.params.searchKey;

    const regex = new RegExp(searchKey, "i");

    const matchingNotes = await Note.find({ text: { $regex: regex } });

    // Check if matchingNotes is defined before mapping
    if (matchingNotes) {
      const notes = matchingNotes.map((note) => ({
        id: note._id,
        text: note.text,
        dateCreated: note.createdAt,
        lastModified: note.lastModifiedAt,
      }));

      res.json({ notes });
    } else {
      res.json({ notes: [] }); // Send an empty array if no matching notes
    }
  } catch (error) {
    console.error("Failed to search notes:", error);
    res.status(500).send("Internal Server Error");
  }
});

/*
  
/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete("/", (req, res) => {
  console.log(
    `[DELETE] http://localhost:${global.port}/notes - Deleting all notes`,
  );

  Note.deleteMany()
    .then((deletedNotes) => {
      // If the response is valid, send an empty response
      res.send("all notes got deleted!");
    })
    .catch((error) => {
      // Handle errors during the deletion process
      console.error("Error deleting notes:", error);
      res.status(500).send("Fail to delete");
    });
});

/* -------------------------------------------------------------------------- */

module.exports = router;

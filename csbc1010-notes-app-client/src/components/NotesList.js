import Note from "./Note";
import AddNote from "./AddNote";

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleUpdateNote,
}) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note._id}
          _id={note._id}
          text={note.text}
          createdAt={note.createdAt}
          lastModifiedAt={note.lastModifiedAt}
          handleDeleteNote={handleDeleteNote}
          handleUpdateNote={handleUpdateNote}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;

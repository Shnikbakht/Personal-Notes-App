import { useState } from "react";
import { MdDeleteForever, MdSave } from "react-icons/md";

const Note = ({
  _id,
  text,
  createdAt,
  lastModifiedAt,
  handleDeleteNote,
  handleUpdateNote,
}) => {
  const [noteText, setNoteText] = useState(text);
  const characterLimit = 200;

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  return (
    <div className="note">
      <textarea rows="8" cols="10" value={noteText} onChange={handleChange} />
      <div>
        <small>{characterLimit - noteText.length} Remaining</small>
        <div className="note-footer">
          {createdAt === lastModifiedAt ? (
            <small>Created on: {createdAt}</small>
          ) : (
            <small>Last modify: {lastModifiedAt}</small>
          )}
          <div className="note-icons">
            <MdSave
              onClick={() => handleUpdateNote(_id, noteText)}
              className="save-icon"
              size="1.3em"
            />
            <MdDeleteForever
              onClick={() => handleDeleteNote(_id)}
              className="delete-icon"
              size="1.3em"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;

import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const api = process.env.REACT_APP_API || "http://localhost:3001";

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    console.log("should force update");
  }, [notes]);

  const fetchAll = () => {
    fetch(`${api}/notes`)
      .then((res) => res.json())
      .then((res) => setNotes(res.notes));
  };

  const addNote = (text) => {
    const newNote = { text };
    fetch(`${api}/note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((res) => setNotes([...notes, res.newNote]));
  };

  const updateNote = (_id, text) => {
    fetch(`${api}/note`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, text }),
    })
      .then((res) => res.json())
      .then((res) =>
        setNotes(
          notes.map((note) =>
            note._id === res.updatedNote._id ? res.updatedNote : note
          )
        )
      );
  };

  const deleteNote = (_id) => {
    fetch(`${api}/note`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    }).then((res) => setNotes(notes.filter((note) => note._id !== _id)));
  };

  const searchNotes = (searchKey) => {
    fetch(`${api}/notes/search/${searchKey}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => setNotes(res.notes));
  };

  const deleteAllNotes = () => {
    fetch(`${api}/notes`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => setNotes([]));
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={searchNotes} />
        <button onClick={deleteAllNotes} className="bulk-delete">
          <MdDeleteForever
            className="delete-icon"
            style={{ marginBottom: "-3px", marginRight: "5px" }}
          />
          Delete All Notes
        </button>
        <NotesList
          notes={notes}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleUpdateNote={updateNote}
        />
      </div>
    </div>
  );
};

export default App;

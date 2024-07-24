import NotesAPI from "./NoteAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();

    // SET NOTES:
    this._setNotes(notes);

    // set active note :
    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setActiveNote(note) {
    this.activeNote = note = note;
    this.view.updateActiveNote(notes[0]);
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updatedNoteList(notes);
    this.view.updateNotepreviewVisibility(notes.length > 0);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "Take Some Note",
        };
        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((n) => n.id == noteId);
        this._setActiveNote(selectedNote);
      },
      onNoteDelete: (noteId) => {
        NotesAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}

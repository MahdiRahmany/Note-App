const notes = [
  {
    id: 2,
    title: "second note",
    body: "some dummy text second",
    updated: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 1,
    title: "first note",
    body: "some dummy text second",
    updated: "2021-10-31T15:02:00.411Z",
  },
];

export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();

    const existedNote = notes.find((n) => n.id == noteToSave.id);

    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }
  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNotes = notes.filter((n) => n.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
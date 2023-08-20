"use client";
import { NoIdNote, UpdateNote } from "@/interfaces/Note";
import { createContext, useContext, useState } from "react";
import { Note } from "@prisma/client";

export const NotesContext = createContext<{
  notes: any[];
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  loadNotes: () => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  createNote: (note: NoIdNote) => Promise<void>;
  updateNote: (id: number, note: UpdateNote) => Promise<void>;
}>({
  notes: [],
  selectedNote: null,
  setSelectedNote: (note: Note | null) => {},
  loadNotes: async () => {},
  deleteNote: async (id: number) => {},
  createNote: async (note: NoIdNote) => {},
  updateNote: async (id: number, note: UpdateNote) => {},
});

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  async function loadNotes() {
    const res = await fetch(`http://localhost:3000/api/notes`);
    const data = await res.json();
    setNotes(data);
  }

  async function createNote(note: NoIdNote) {
    const res = await fetch(`/api/notes`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(note),
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
  }

  const deleteNote = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = async (id: number, note: UpdateNote) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const data = await res.json();

    setNotes(notes.map((note) => (note.id === id ? data : note)));
  };

  return (
    <NotesContext.Provider value={{ notes, loadNotes, createNote, deleteNote, selectedNote, setSelectedNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

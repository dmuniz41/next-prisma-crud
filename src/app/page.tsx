"use client";

import { useEffect } from "react";
import { NotesForm } from "../components/NotesForm";
import { useNotes } from "@/context/NotesContext";
import { NoteCard } from "@/components/NoteCard";
import { Note } from "@prisma/client";

export default function HomePage() {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <NotesForm />
        {notes.map((note: Note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
}

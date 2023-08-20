// 'use client'

import React from "react";
import { useNotes } from "@/context/NotesContext";
import { Note } from "@prisma/client";
import { HiTrash, HiPencil } from "react-icons/hi2";
export const NoteCard = ({ note }: { note: Note }) => {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    <div key={note.id} className="bg-slate-400 rounded-md p-4 my-2 flex justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <span>{note.content}</span>
        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
      </div>
      <div className=" flex gap-x-2">
        <button
          onClick={async () => {
            if (confirm("Are you sure you want to delete this note")) await deleteNote(Number(note.id));
          }}
        >
          <HiTrash className="text-2xl text-red-600"/>
        </button>
        <button onClick={()=>{setSelectedNote(note)}}><HiPencil className="text-2xl "/></button>
      </div>
    </div>
  );
};

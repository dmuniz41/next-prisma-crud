"use client";
import React, { useState, useRef, useEffect } from "react";
import { useNotes } from "@/context/NotesContext";

export const NotesForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedNote) {
      await updateNote(selectedNote.id, {
        title,
        content
      })
      setSelectedNote(null)
    } else {
      createNote({
        title,
        content,
      });
      setContent("");
      setTitle("");
      titleRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        type="text"
        name="title"
        autoFocus
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        ref={titleRef}
      />
      <textarea
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        name="title"
        placeholder="content"
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
      ></textarea>
      <div className=" flex justify-end gap-x-2">
        <button className=" text-white px-5 py-2 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" type="submit"
        disabled={!title || !content}>
          {selectedNote ? "Update" : "Create"}
        </button>
        {selectedNote && (
          <button
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
            }}
            className=" text-white px-5 py-2 bg-red-600 rounded-md hover:bg-red-700"
            type="button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

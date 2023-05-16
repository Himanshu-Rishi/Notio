import React, { useContext, useEffect } from "react";
import Notecontext from "../context/Notes/Notecontext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "./NoteItem.css";

const Noteitem = (props) => {
  const { note, updateNote } = props;
  const [bgColor, setBgColor] = useState("#ffe082");
  const context = useContext(Notecontext);
  const { deletenotes, editnotes } = context;
  const changeColor = () => {
    if (note.nature) {
      editnotes(note._id, note.title, note.description, note.tag, false);
      toast.success("Removed from Important");
    } else {
      editnotes(note._id, note.title, note.description, note.tag, true);
      toast.success("Added to Important");
    }
  };
  let myDate = note.date;
  useEffect(() => {
    if (note.nature) {
      setBgColor("red");
    } else {
      setBgColor("#ffe082");
    }
  }, [note.nature]);

  return (
    <>
      <div className="note_container">
        <div className="note__card">
          <div>
            <div className="heading">
              <p className="note__title">{note.title}</p>
              <p className="note__tag">#{note.tag}</p>
            </div>
            <div className="description__section">
              <p className="note__description">{note.description}</p>
            </div>
          </div>
          <div className="note__bottom">
            <div>
              <IconButton
                aria-label="add to important"
                onClick={changeColor}
                sx={{ color: bgColor }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                aria-label="delete the note"
                onClick={() => {
                  deletenotes(note._id);
                  toast.success("Note Deleted Successfully");
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit the note"
                onClick={() => {
                  updateNote(note);
                }}
              >
                <EditIcon />
              </IconButton>
            </div>
            <div>
              <p className="note__date">{myDate.slice(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;

import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useRef } from "react";
import React, { useState, useContext } from "react";
import Notecontext from "../context/Notes/Notecontext";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import NotesHome from "./NotesHome";
import { Toaster, toast } from "react-hot-toast";
function Home() {
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const { addnotes } = useContext(Notecontext);
  const ref_add = useRef(null);
  const refClose_add = useRef(null);
  const open = () => {
    ref_add.current.click();
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const on_add = (e) => {
    refClose_add.current.click();
    addnotes(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
    if (note.title && note.description) {
      toast.success("Note added successfully");
    } else {
      toast.error("Add valid details for Note");
    }
  };
  return (
    <>
      <Toaster reverseOrder={false} position="top-center" />
      <Container maxWidth="lg">
        <Container
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            padding: "0",
          }}
        >
          <Box>
              <Link to="/" className="links">
            <Button variant="" sx={{ marginLeft: "0" }}>
                All Notes
            </Button>
              </Link>
              <Link to="/important" className="links">
            <Button variant="">
                Important
            </Button>
              </Link>
          </Box>
          <Button variant="" startIcon={<AddIcon />} onClick={open}>
            Add
          </Button>
        </Container>

        <NotesHome />
        <button
          type="button"
          ref={ref_add}
          className="btn btn-primary d-none "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal_add"
        ></button>

        <div
          className="modal fade"
          id="exampleModal_add"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Note
                </h5>
                <Button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <CloseIcon sx={{ color: "black" }} />
                  </span>
                </Button>
              </div>
              <div className="modal-body">
                <div className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={note.title}
                      id="etitle"
                      name="title"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={note.description}
                      id="edescription"
                      name="description"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={note.tag}
                      id="etag"
                      name="tag"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  ref={refClose_add}
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={on_add}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;

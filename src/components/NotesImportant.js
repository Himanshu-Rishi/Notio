import { Button, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react';
import noteContext from "../context/Notes/Notecontext"
import Noteitem from './NoteItem';
import CloseIcon from '@mui/icons-material/Close';

const NotesImportant = () => {
    const context = useContext(noteContext);
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "", enature: "" })
    const { notes, getnotes, editnotes } = context;
    useEffect(() => {
        getnotes();
        // eslint-disable-next-line
    })
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (currentnote) => {
        ref.current.click();
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag, enature: currentnote.nature });
    }
    const handlechange = (e) => {
        editnotes(note.id, note.etitle, note.edescription, note.etag, note.enature)
        refClose.current.click();
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <Container maxWidth="lg">
            <button type="button" ref={ref} className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <Button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><CloseIcon sx={{ color: 'black' }} /></span>
                            </Button>
                        </div>
                        <div className="modal-body">
                            <div className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nature" className="form-label">Nature</label>
                                    <input type="text" className="form-control" id="enature" name="enature" value={note.enature} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handlechange}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row my-3">
                    {
                        notes.length ?
                            notes.filter((note) => {
                                return note.nature;
                            }).map((note) => {
                                return <Noteitem note={note} updateNote={updateNote} key={note._id} />
                            })
                            :
                            null
                            //    have to add text for no notes
                            
                    }
                </div>
            </div>
        </Container>
    )
}

export default NotesImportant
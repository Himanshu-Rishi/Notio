import Notecontext from "./Notecontext"
import { useState } from "react"
const Notestate = (props) => {
    const host = process.env.Backend_url;
    const [notes, setnotes] = useState([])

    // add
    const addnotes = async(title, description, tag) => {

        console.log("Adding note")
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setnotes(notes.concat(note));
    }

    // delete

    const deletenotes = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({id})
        });
        const json = await response.json();
        console.log(json)
        setnotes(notes.filter(note =>
            {
                return note._id !== id; 
            }))
    }

    // edit

    const editnotes = async (id, title, description, tag, nature) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({id, title, description, tag, nature})
        });
        const json = await response.json();
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                notes.title = title
                notes.description = description
                notes.tag = tag
                notes.nature = nature
                break;
            }
        }
        console.log(json);
        setnotes(notes)
        getnotes()
    }

    // all notes

    const getnotes = async () => {
        // API Call
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            
        });
        const json = await response.json();
        setnotes(json)
    }


    return (
        <Notecontext.Provider value={{ notes, addnotes, deletenotes, editnotes, getnotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default Notestate;
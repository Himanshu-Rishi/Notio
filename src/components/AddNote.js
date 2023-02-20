import React, {useState, useContext} from 'react'
import Notecontext from '../context/Notes/Notecontext';
const AddNote = () => {
    const [note, setnote] = useState({title: "", description: "", tag: "default"})
    const context = useContext(Notecontext);
    const { addnotes } = context;
    const handlechange = (e) =>
    {
        e.preventDefault();
        addnotes(note.title, note.description, note.tag);
        // addnotes(note);
    }
    const onChange = (e)=>
    {
        setnote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
      <div className="container my-3">
          <h2>Add Note</h2>
          <div className="my-3">
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" id="title" name="title" onChange={onChange} />
              </div>
              <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
              </div>
              <div className="mb-3">
                      <label htmlFor="description" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
              </div>
              <button type="submit" className='btn btn-primary' onClick={handlechange}>Submit</button>
          </div>
      </div>
    </>
  )
}

export default AddNote
import React, { useContext, useEffect } from 'react'
import Notecontext from '../context/Notes/Notecontext';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const Noteitem = (props) => {
    const { note, updateNote} = props;
    const [bgColor, setBgColor] = useState('black');
    const context = useContext(Notecontext);
    const { deletenotes, editnotes} = context;
    const changeColor = () => {
        if(note.nature)
        {
            editnotes(note._id, note.title, note.description, note.tag, false);
        }
        else
        {
            editnotes(note._id, note.title, note.description, note.tag, true);
        }
    }
    useEffect(() => {
      if(note.nature)
      {
        setBgColor('red');
      }
      else
      {
        setBgColor('black')
      }
    }, [note.nature])
    

        return (
          <div className="note_container">
            <Card sx={{ maxWidth: 345, margin: 1, backgroundColor: "#BDCDD6" }}>
              <CardHeader title={note.title} subheader={note.tag} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {note.description}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
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
              </CardActions>
            </Card>
          </div>
        );
    }

    export default Noteitem;
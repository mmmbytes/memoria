import { useState, useEffect } from 'react';
import './Notes.css';

function Notes() {
    const [note, setNote] = useState({title: '', textbody: ''});
    const [error, setError] = useState(null);

    const saveNote = async () => {

        const response = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const json = await response.json();

    if(!response.ok) {
        setError(json.error);
        console.log("Error saving note.", error);
    } if(response.ok) {
        setError(null);
        console.log("New note saved:", json);
    }

    }

    useEffect(() => {
        saveNote();
    }, [note]);

    function handleTextChange(e) {
        const {name, value} = e.target;
        setNote({...note, [name]: value});
    }

    return (
        <div className="notes-main">
            <div className="note-edit">
                <input 
                    type="text" id="note-title" name="title" placeholder="Title" autoFocus 
                    onChange={handleTextChange} 
                    value={note.title}
                />
                <textarea id="note-body" name="textbody" placeholder="Begin your writing journey here..."
                    onChange={handleTextChange} 
                    value={note.textbody}
                >   
                </textarea>
            </div>
        </div>
    ); 
}

export default Notes; 

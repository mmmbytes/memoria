import { useState } from 'react';
import './Main.css';

function Main() {
    const [note, setNote] = useState({title: '', body: ''});

    function handleTextChange(e) {
        const {name, value} = e.target;
        setNote({...note, [name]: value});
    }

    return (
        <div className="app-main">
            <div className="note-edit">
                <input 
                    type="text" id="note-title" name="title" placeholder="Title" autoFocus 
                    onChange={handleTextChange} 
                    value={note.title}
                />
                <textarea id="note-body" name="body" placeholder="Begin your writing journey here..."
                    onChange={handleTextChange} 
                    value={note.body}
                >   
                </textarea>
            </div>
        </div>
    ); 
}

export default Main; 

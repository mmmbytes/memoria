import './Main.css';

function Main() {
    return (
        <div className="app-main">
            <div className="note-edit">
                <input type="text" id="note-title" placeholder="Title" autoFocus />
                <textarea id="note-body" placeholder="Begin your writing journey here..."></textarea>
            </div>
        </div>
    ); 
}

export default Main; 

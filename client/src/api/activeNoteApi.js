const fetchLatestNote = async () => {
    const response = await fetch('/api/');
    const latestNote = await response.json();

    if (response.ok) {
        return latestNote;
    } else {
        console.error('Error loading note.');
        return null; 
    }
}

module.exports = {
    fetchLatestNote
};

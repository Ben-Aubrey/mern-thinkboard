import Note from "../models/Note.js"

// get all notes
export async function getAllNotes(_,res) { // use underscore (_) when req is not in use (naming convention)
    try {
        const notes = await Note.find().sort({createdAt: -1}) // -1 will sort notes in desc. order(show newestfirst)
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error in getAllNotes controller', error);
        res.status(500).json({message: "Internal server error"})
    }
}

// get note by Id
export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({message: "Note not found"})
        res.json(note);
    } catch (error) {
        console.error('Error in getAllNoteById controller', error);
        res.status(500).json({message: "Internal server error"})
    }
}

// create note
export async function createNote(req,res) {
    try {
        const {title, content} = req.body;
        const note = new Note({title, content})

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('Error in createNotes controller', error);
        res.status(500).json({message: "Internal server error"})   
    }
}

// update notes
export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content}, 
            {new: true}
        )
        if (!updatedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error in updateNotes controller', error);
        res.status(500).json({message: "Internal server error"})  
    }
}

// delete notes
export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deleteNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: 'Note deleted successfully!!!'});
    } catch (error) {
        console.error('Error in deleteNotes controller', error);
        res.status(500).json({message: "Internal server error"})    
    }
}

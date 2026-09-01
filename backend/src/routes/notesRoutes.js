import express from 'express'
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getAllNotes);      // read all notes
router.get('/:id', getNoteById);   // read notes by Id
router.post('/', createNote);      // create new note
router.put('/:id', updateNote);    // update notes by Id
router.delete('/:id', deleteNote); // delete notes by Id

export default router;

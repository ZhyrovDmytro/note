import * as express from 'express';
const Note = require('../modules/Note');
const auth = require('../middleware/isAuth');

const router = express.Router();

interface CreateNoteRequest extends express.Request {
  headline: string;
  text: string;
  userId: string;
}

interface UpdateNoteRequest extends CreateNoteRequest {
  noteId: string;
}

router.post(
  '/create',
  auth,
  async (req: CreateNoteRequest, res: express.Response) => {
    try {
      const { text, header } = req.body;

      const exist = await Note.findOne({ header });

      if (exist) {
        return res.json(exist);
      }

      const newNote = new Note({
        text,
        header,
        owner: req.headers.userId
      });

      await newNote.save();

      res.status(200).json({ newNote });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
      console.error(e);
    }
  }
);

router.put('/update',async (req: UpdateNoteRequest, res: express.Response) => {
  try {
    const { text, header, noteId } = req.body;

    const updatedNote = new Note({
      text,
      header,
      owner: req.headers.userId
    });

    Note.findByIdAndUpdate(noteId, updatedNote, {new: true});

    res.status(200).json({ updatedNote });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(e);
  }
});

router.get('/', auth, async (req: CreateNoteRequest, res: express.Response) => {
  try {
    const notes = await Note.find({ owner: req.headers.userId });

    res.json(notes);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(e);
  }
});

router.get(
  '/:id',
  auth,
  async (req: CreateNoteRequest, res: express.Response) => {
    try {
      const note = await Note.findById(req.params.id);

      res.json(note);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
      console.error(e);
    }
  }
);

router.delete(
  '/:id',
  auth,
  async (req: CreateNoteRequest, res: express.Response) => {
    try {
      const data = await Note.findByIdAndRemove(req.params.id);

      if (!data) {
        res.status(403).json({ message: 'Can"t delete' });
      } else {
        res.status(200).json({ message: 'Deleted' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
      console.error(e);
    }
  }
);

module.exports = router;

import * as express from 'express';
const Note = require('../modules/Note');
const auth = require('../middleware/isAuth');

const router = express.Router();

interface CreateNoteRequest extends express.Request {
  headline: string;
  text: string;
  userId: string;
}

router.post(
  '/create',
  auth,
  async (req: CreateNoteRequest, res: express.Response) => {
    try {
      const { text } = req.body;
      const { header } = req.body;

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
      const notes = Note.findById(req.params.id);
      res.json(notes);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
      console.error(e);
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let already_note = await Note.findOne({ title: req.body.title });
      if (already_note) {
        return res.status(400).json({
          success: false,
          error: "Sorry a note with this title already exists ...!",
        });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      success = true;
      res.status(200).json({ success: true, savedNote });
    } catch (error) {
      res.status(500).json({ success, error: "Internal Server Error" });
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag, nature } = req.body;
  let success = false;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    newNote.nature = nature;

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, error: "Note not Found ...!" });
    }

    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, error: "Not Allowed ...!" });
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    success = true;
    res.status(200).json({ success, note });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  let success = false;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, error: "Note not Found ...!" });
    }

    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, error: "Not Allowed ...!" });
    }
    success = true;
    note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, note: note });
  } catch (error) {
    res.status(500).json({ success, error: "Internal Server Error" });
  }
});

module.exports = router;

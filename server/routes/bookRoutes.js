import Express from "express";
import { Book } from "../models/bookModel.js";

const router = Express.Router();

//    CREATE a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//    DISPLAY all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).send(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//    READ a specific book
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//    UPDATE a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//    DELETE a book
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res
      .status(200)
      .send({ message: `The book ${book.title} is now deleted` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;

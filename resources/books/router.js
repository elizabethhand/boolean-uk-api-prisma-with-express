const express = require("express")
const { getBooks, getTopicBooks, getNonFiction, getAuthor, updateBook, deleteBook } = require("./controller")

const router = express.Router()

router.get("/", getBooks)

router.get("/fiction", getTopicBooks)

router.get("/non-fiction", getNonFiction)

router.get("/author/:author", getAuthor)

router.put("/:id", updateBook)

router.delete("/:id", deleteBook)

module.exports = router
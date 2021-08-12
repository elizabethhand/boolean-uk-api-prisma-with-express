const db = require("../../utils/database")
const book = require("./model")

book()

function getBooks(req, res) {
    console.log("running")

    const getBooksSQL = `
    SELECT * 
    FROM books`

    db.query(getBooksSQL)
        .then((result) => res.json({ data: result.rows }))
}

function getTopicBooks(req, res) {
    console.log("running")
    const topic = req.query.topic
    console.log(topic)

    const getTopicSQL = `
    SELECT *
    FROM books
    WHERE type='Fiction' AND topic= $1`

    db.query(getTopicSQL, [topic])
        .then((result) => res.json({ data: result.rows }))
        .catch(console.error)
}

function getNonFiction(req, res) {
    console.log('Running')
    const getNonFictionSQL = `
    SELECT *
    FROM books
    WHERE type= 'Non-Fiction'
    `

    db.query(getNonFictionSQL)
        .then((result) => res.json({ data: result.rows }))
}

function getAuthor(req, res) {
    const author = req.params.author.replace("_", " ")
    console.log(author)

    const getAuthorSQL = `
    SELECT *
    FROM books
    WHERE author= $1
    ORDER BY publicationdate DSC`

    db.query(getAuthorSQL, [author])
        .then((result) => res.json({ data: result.rows }))
}

function updateBook(req, res) {
    const updatedBook = {
        id: req.params.id,
        ...req.body
    }

    const updateBookSQL = `
    UPDATE books
    SET title= $1
    WHERE id= $2
    RETURNING *`


    db.query(updateBookSQL, [updatedBook.title, updatedBook.id])
        .then((result) => res.json({ data: result.rows[0] }))
        .catch(console.error)
}

function deleteBook(req, res) {
    console.log("running")
    const booktoDelete = {
        id: req.params.id
    }

    const deleteBookSQL = `
    DELETE FROM books
    WHERE id= $1
    RETURNING *`

    db.query(deleteBookSQL, [booktoDelete.id])
        .then((result) => res.json({ data: result.rows[0] }))
}

module.exports = { getBooks, getTopicBooks, getNonFiction, getAuthor, updateBook, deleteBook }
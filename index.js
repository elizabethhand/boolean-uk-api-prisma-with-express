const express = require("express")
const morgan = require("morgan")
const client = require("./utils/database")
const petsRouter = require("./resources/pets/router")
const booksRouter = require("./resources/books/router")
// const { getAllPets } = require("./resources/pets/controller")

const app = express()

app.use(morgan("dev"))
app.use(express.json())

// app.get("/cats", (req, res) => {
//     res.json({ message: "meow" })
// })

// app.get("/dogs", (req, res) => {
//     res.json({ message: "woof" })
// })

app.use("/pets", petsRouter)

app.use("/books", booksRouter)

app.listen(5000, () => {
    client.connect(() => console.log("Database connected"))
    console.log("Server running")
})
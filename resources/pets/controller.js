const pets = require("./model")
const db = require("../../utils/database")

pets()

function getAllPets(req, res) {
    const getAllSQL = `
 SELECT * FROM pets
 `

    db.query(getAllSQL)
        .then((result) => res.json({ data: result.rows }))
        .catch(console.error)
}

function findSinglePet(req, res) {
    const id = req.params.id

    const singlePet = `
    SELECT *
     FROM pets
     WHERE id= $1
    `

    db.query(singlePet, [id])
        .then((result) => res.json({ data: result.rows[0] }))
        .catch(console.log("Error"))
}

function createPet(req, res) {
    console.log("running")
    const newPet = {
        ...req.body
    }

    const createPetSQL = `
    INSERT INTO pets (name,age,type,breed,microchip)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `

    db.query(createPetSQL, [newPet.name, newPet.age, newPet.type, newPet.breed, newPet.microchip])
        .then((result) => res.json({ data: result.rows[0] }))
        .catch(console.error)

    console.log("running 2")
}


module.exports = { getAllPets, findSinglePet, createPet }
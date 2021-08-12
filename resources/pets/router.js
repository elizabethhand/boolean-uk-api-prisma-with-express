const express = require("express")
const { getAllPets, findSinglePet, createPet } = require("./controller")

const router = express.Router();

router.get("/", getAllPets)

router.get("/:id", findSinglePet)

router.post("/", createPet)


module.exports = router
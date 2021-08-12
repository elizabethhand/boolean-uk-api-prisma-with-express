const client = require("../../utils/database")
const { buildAnimalDatabase } = require("../../utils/mockData");


function pet() {
    function createTable() {
        const sql = `
      DROP TABLE IF EXISTS pets;

      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `;
        client.query(sql)
            .then((result) => console.log("Table made"))
            .catch(console.error)
    }

    function mockData() {
        const createPet = `
          INSERT INTO pets
            (name, age, type, breed, microchip)
          VALUES
            ($1, $2, $3, $4, $5)
        `;

        const pets = buildAnimalDatabase();

        pets.forEach((pet) => {
            client.query(createPet, Object.values(pet));
        });
    }


    // function mockData() {
    //     const createBook = `
    //         INSERT INTO pets (animal, age)
    //         VALUES ($1, $2)
    //         ON CONFLICT (animal,age) DO NOTHING;
    //         `

    //     client.query(createBook, ["cat", 1])
    //     client.query(createBook, ["dog", 2])

    //     console.log("data inserted")


    // }

    createTable()
    mockData()
}

module.exports = pet
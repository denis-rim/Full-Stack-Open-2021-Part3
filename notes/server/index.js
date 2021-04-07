const express = require("express");
const app = express();

app.use(express.json());

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/info", (req, res) => {
  res.send(`
   <p>Phonebook has info for ${persons.length} people</p>
   <p>${new Date().toString()}</p>
  `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

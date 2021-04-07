const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

let persons = [
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

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 100000000);
};

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  const existingPerson = persons.find((person) => person.name === name);

  if (existingPerson) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  if (!name) {
    return res.status(400).json({
      error: "name must be provided",
    });
  }

  if (!number) {
    return res.status(400).json({
      error: "number must be provided",
    });
  }

  const person = {
    name: name,
    number: number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

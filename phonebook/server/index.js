require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use(cors());

morgan.token("logger", (req) => JSON.stringify(req.body));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :logger"
  )
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
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

  if (!name || !number) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name,
    number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

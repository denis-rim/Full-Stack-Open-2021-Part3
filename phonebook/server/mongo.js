const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("password is required");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://darktree:${password}@phonebook.4e0kr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
});

if (name !== undefined && number !== undefined) {
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name}  ${person.number}`);
    });
    mongoose.connection.close();
  });
}

import React, { useState, useEffect } from "react";
import personServices from "./services/persons";
import FilterForm from "./components/FilterForm";
import PersonsFormInput from "./components/PersonsFormInput";
import DisplayPersons from "./components/DisplayPersons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  const { name, number } = newPerson;

  const showMessage = (message, type) => {
    setMessage({
      message,
      type,
    });

    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  useEffect(() => {
    personServices
      .get()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        showMessage("Server is unavailable", "error");
        console.error(error.response.data);
      });
  }, []);

  const resetInput = () => {
    setNewPerson({ name: "", number: "" });
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!newPerson.name || !newPerson.number) {
      alert("Name and number field must be filled");
      return;
    }

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      const result = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one? `
      );
      if (!result) {
        resetInput();
        return;
      }
      const updatePersonObj = { ...existingPerson, number: newPerson.number };

      personServices
        .update(existingPerson.id, updatePersonObj)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : response
            )
          );
          showMessage(`Updated ${newPerson.name} phone number`, "success");
          resetInput();
        })
        .catch((error) => {
          showMessage(`${error.response.data.error.message}`, "error");
          console.log(error.response.data);
        });
      return;
    }

    const newPersonObj = {
      name: newPerson.name,
      number: newPerson.number,
    };

    personServices
      .create(newPersonObj)
      .then((response) => {
        setPersons(persons.concat(response));
        showMessage(`Added ${newPerson.name}`, "success");
        resetInput();
      })
      .catch((error) => {
        console.error(error);
        showMessage(`${error.response.data.error.message}`, "error");
      });
  };

  const deletePerson = (id, name) => {
    const result = window.confirm(`Delete ${name}?`);

    if (!result) {
      return;
    }

    personServices
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        showMessage(`Deleted ${name}`, "success");
      })
      .catch((error) => {
        showMessage(
          `Information of ${name} has already removed from server`,
          "error"
        );
        console.error(error.response.data);
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setNewPerson({ ...newPerson, [name]: value });
  };

  return (
    <div className="app">
      <h2>Phonebook</h2>
      <Notification message={message} />
      <FilterForm filter={filter} setFilter={setFilter} />
      <PersonsFormInput
        name={name}
        number={number}
        handleChange={handleChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <DisplayPersons
        filter={filter}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;

import React from "react";

const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id, person.name)}>
        delete
      </button>
    </li>
  );
};

export default Person;

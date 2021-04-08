import React from "react";
import Person from "./Person";

const DisplayPersons = ({ persons, filter, deletePerson }) => {
  return (
    <div className="display-persons-container">
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((person) => {
            return (
              <Person
                key={person.id}
                person={person}
                deletePerson={deletePerson}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default DisplayPersons;

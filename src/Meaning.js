import React from "react";

export default function Meaning(props) {
  return (
    <div className="Meaning">
      <ul>
        {props.meaning.definitions.map((definition, index) => (
          <li key={index}>
            <strong>{definition.definition}</strong>
            <br />
            <em>{definition.example}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

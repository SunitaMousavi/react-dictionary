import React from "react";

export default function Meaning(props) {
  return (
    <div className="Meaning">
      <h1>{props.meaning.partOfSpeech}</h1>
      {props.meaning.definitions.map(function (definition, index) {
        return (
          <div key={index}>
            <h2>{definition.definition}</h2>
            <br />
            <em>{definition.example}</em>
          </div>
        );
      })}
    </div>
  );
}

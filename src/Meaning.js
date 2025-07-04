import React from "react";
import Synonyms from "./Synonyms";

export default function Meaning(props) {
  return (
    <div className="Meaning">
      <ul>
        <li>{props.meaning.definition}</li> {/* Show definition */}
        {props.meaning.example && <li>{props.meaning.example}</li>}{" "}
        {/* Conditionally show example if it exists */}
      </ul>
      <Synonyms synonyms={props.meaning.synonyms} /> {/* Show synonyms */}
    </div>
  );
}

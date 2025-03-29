import React from "react";
import Meaning from "./Meaning";

export default function Definition(props) {
  if (props.results) {
    return (
      <div className="Definition">
        <h2>{props.results.word}</h2>
        {props.results.meanings.map((meaning, index) => (
          <div key={index}>
            <Meaning meaning={meaning} />
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

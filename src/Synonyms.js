import React from "react";

export default function Synonyms(props) {
  if (props.synonyms) {
    return (
      <div className="Synonyms">
        {props.synonyms.map((synonyms, index) => {
          return <span key={index}>{synonyms}</span>;
        })}
      </div>
    );
  } else {
    return null;
  }
}

import React from "react";
import Meaning from "./Meaning";

export default function Results(props) {
  // If results exist, process and display them
  if (props.results) {
    const grouped = {}; // Group meanings by part of speech

    props.results.meanings.forEach((meaning) => {
      if (!grouped[meaning.partOfSpeech]) {
        grouped[meaning.partOfSpeech] = [];
      }
      grouped[meaning.partOfSpeech].push(meaning);
    });

    return (
      <div className="Results">
        <div className="WordPhoneticBox">
          <h2>{props.results.word}</h2> {/* Word */}
          <h3>{props.results.phonetic}</h3> {/* Phonetic transcription */}
        </div>

        {/* Render grouped meanings */}
        {Object.entries(grouped).map(([partOfSpeech, meanings], index) => (
          <div key={index}>
            <h4 className="PartOfSpeechTitle">{partOfSpeech}</h4>
            {meanings.map((meaning, idx) => (
              <Meaning key={idx} meaning={meaning} />
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return null; // Render nothing if no results
  }
}

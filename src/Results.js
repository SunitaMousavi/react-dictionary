import React from "react";

export default function Results({ results, onSave }) {
  if (!results) return null;

  return (
    <div className="Results">
      <h2>{results.word}</h2>

      {/* Phonetics */}
      {results.phonetics?.map((phonetic, index) => (
        <div key={index} className="phonetic">
          {phonetic.text && <span>{phonetic.text}</span>}
          {phonetic.audio && (
            <button onClick={() => new Audio(phonetic.audio).play()}>🔊</button>
          )}
        </div>
      ))}

      {/* Meanings */}
      {results.meanings?.map((meaning, index) => (
        <div key={index} className="meaning">
          <h3>{meaning.partOfSpeech}</h3>
          <ul>
            {meaning.definitions.map((def, i) => (
              <li key={i}>
                {def.definition}
                {def.example && <em> - {def.example}</em>}
              </li>
            ))}
          </ul>

          {meaning.synonyms?.length > 0 && (
            <p>
              <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
            </p>
          )}
          {meaning.antonyms?.length > 0 && (
            <p>
              <strong>Antonyms:</strong> {meaning.antonyms.join(", ")}
            </p>
          )}
        </div>
      ))}

      {/* Save word */}
      <button
        onClick={() =>
          onSave({
            word: results.word,
            phonetic: results.phonetics?.[0]?.text || "", // ✅ store phonetic text
            audio: results.phonetics?.[0]?.audio || "", // store audio
            meanings: results.meanings.map((meaning) => ({
              partOfSpeech: meaning.partOfSpeech,
              definitions: meaning.definitions.slice(0, 2).map((d) => ({
                definition: d.definition,
                example: d.example || "",
              })),
              synonyms: meaning.synonyms || [],
              antonyms: meaning.antonyms || [],
            })),
          })
        }>
        Save Word
      </button>
    </div>
  );
}

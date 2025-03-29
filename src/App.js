import books from "./image/books.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <img src={books} className="img-fluid" alt="logo" />
          </header>
      <Dictionary />
      <footer className="text-center">
        Coded by{" "}
        <a
          href="https://github.com/SunitaMousavi"
          target="_blank"
          rel="noopener noreferrer">
          Sunita Mousavi
        </a>
        , open-sourced on{" "}
        <a
          href="https://github.com/SunitaMousavi/react-dictionary"
          target="_blank"
          rel="noopener noreferrer">
          GitHub
        </a>{" "}
        and hosted on{" "}
        <a
          href="https://reactdictionaryapp-sunitamousavi.netlify.app"
          target="_blank"
          rel="noopener noreferrer">
          Netlify
        </a>
      </footer>
      </div>
    </div>
  );
}

export default App;

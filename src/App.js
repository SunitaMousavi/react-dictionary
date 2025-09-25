import "./App.css";
import "./Responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dictionary from "./Dictionary";
import Books from "./Books.png";

function App() {
  return (
    <div className="App container">
      <header className="App-header">
        <img
          src={Books}
          className="img-fluid mx-auto d-block"
          alt="Books logo"
          style={{ width: "500px", height: "auto", marginTop: "20px" }}
        />
      </header>
      <main>
        <Dictionary />
      </main>
      <footer className="App-footer text-center">
        Coded by{" "}
        <a
          href="https://github.com/SunitaMousavi"
          target="_blank"
          rel="noopener noreferrer">
          Sunita Mousavi
        </a>
        , open-sourced on{" "}
        <a
          href="https://github.com/SunitaMousavi/react-dictionary-app"
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
  );
}

export default App;

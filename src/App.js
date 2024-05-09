import "./App.css";
import WeatherForecast from "./weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>and save to reload.</p>
        <WeatherForecast />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

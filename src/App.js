import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherForecast from "./weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherForecast />
      </header>
    </div>
  );
}

export default App;

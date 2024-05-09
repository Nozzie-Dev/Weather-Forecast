import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherForecast from "./weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherForecast />
        <p>
          Noziphezinhle Nzimande's WeatherForecast source code is available on
          <a href="https://github.com/Nozzie-Dev/Weather-Forecast">Github</a>
        </p>
      </header>
    </div>
  );
}

export default App;

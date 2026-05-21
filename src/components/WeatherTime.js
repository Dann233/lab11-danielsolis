import styles from "../styles/WeatherTime.css" with { type: "css" };

const DEFAULT_CITY = "liberia+guanacaste";

class WeatherTime extends HTMLElement {

  // Propiedad publica: datos del clima
  data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
    this.#fetchWeather(); // inicia fetch desde el constructor
  }

  connectedCallback() {
    // Leer atributo ciudad como propiedad JS
    this.city = this.getAttribute("city") ?? DEFAULT_CITY;
    this.render(); // muestra loading mientras llegan los datos
  }

  // Metodo privado: fetch de datos del clima
  async #fetchWeather() {
    const city = (this.getAttribute("city") ?? DEFAULT_CITY)
      .toLowerCase().replace(" ", "+");
    const response = await fetch(`https://goweather.xyz/v2/weather/${city}`);
    this.data = await response.json();
    this.render();
  }

  // Getter: temperatura limpia
  get temperature() {
    return this.data?.temperature;
  }

  // Getter: condicion limpia
  get description() {
    return this.data?.description;
  }

  render() {
    // Mientras no haya datos, muestra animacion de carga
    if (!this.temperature) {
      this.shadowRoot.setHTMLUnsafe(/* html */`
        <span class="ciudad">${this.city ?? "..."}</span>
        <div class="dots">
          <div class="loading"></div>
          <div class="loading"></div>
          <div class="loading"></div>
        </div>
      `);
      return;
    }

    this.shadowRoot.setHTMLUnsafe(/* html */`
      <span class="ciudad"     part="ciudad">${this.city}</span>
      <span class="temperatura" part="temperatura">${this.temperature}</span>
      <span class="condicion"   part="condicion">${this.description}</span>
    `);
  }
}

customElements.define("weather-time", WeatherTime);
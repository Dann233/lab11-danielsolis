import styles from "../styles/WeatherTime.css" with { type: "css" };

const DEFAULT_CITY = "liberia+guanacaste";

class WeatherTime extends HTMLElement {

  data = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
    this.#fetchWeather();
  }

  connectedCallback() {
    this.city = this.getAttribute("city") ?? DEFAULT_CITY;
    this.render(); 
  }

  async #fetchWeather() {
    const city = (this.getAttribute("city") ?? DEFAULT_CITY)
      .toLowerCase().replace(" ", "+");
    const response = await fetch(`https://goweather.xyz/v2/weather/${city}`);
    this.data = await response.json();
    this.render();
  }

  get temperature() {
    return this.data?.temperature;
  }

  get description() {
    return this.data?.description;
  }

  render() {
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
import styles from "../styles/UserCard.css" with { type: "css" };

const DEFAULT_NAME   = "Usuario";
const DEFAULT_ROLE   = "Invitado";
const DEFAULT_AVATAR = "https://api.dicebear.com/9.x/adventurer/svg?seed=default";

class UserCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  connectedCallback() {
    // Leer atributos y guardar como propiedades JS
    this.name   = this.getAttribute("name")   ?? DEFAULT_NAME;
    this.role   = this.getAttribute("role")   ?? DEFAULT_ROLE;
    this.avatar = this.getAttribute("avatar") ?? DEFAULT_AVATAR;
    this.render();
  }

  // Metodo privado: dispara un CustomEvent que burbujea por el DOM
  // El user-dashboard lo escucha y activa el pulsing del warning-badge
  #saludar() {
    const event = new CustomEvent("usercard:saludar", {
      bubbles: true,   // burbujea por el DOM
      composed: true   // atraviesa el Shadow DOM
    });
    this.dispatchEvent(event);
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <div class="card" part="card">
        <!-- part="avatar" → estilable desde global.css con ::part(avatar) -->
        <img part="avatar" src="${this.avatar}" alt="${this.name}">
        <span class="nombre" part="nombre">${this.name}</span>
        <span class="rol"    part="rol">${this.role}</span>
        <!-- part="boton" → estilable desde global.css con ::part(boton) -->
        <button part="boton">Saludar</button>
      </div>
    `);

    // Escuchar el click del boton con querySelector sobre shadowRoot
    this.shadowRoot.querySelector("button")
      .addEventListener("click", () => this.#saludar());
  }
}

customElements.define("user-card", UserCard);
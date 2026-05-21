import styles from "../styles/UserDashboard.css" with { type: "css" };

class UserDashboard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  connectedCallback() {
    this.render();
    this.#escucharSaludo();
  }

  // Escucha el evento que dispara user-card al hacer click en Saludar
  // Cuando lo recibe, activa el atributo pulsing en warning-badge (reactividad)
  #escucharSaludo() {
    this.addEventListener("usercard:saludar", () => {
      const badge = this.querySelector("warning-badge");
      if (badge.hasAttribute("pulsing")) {
        badge.removeAttribute("pulsing");
        badge.textContent = "Sesión por expirar";
      } else {
        badge.setAttribute("pulsing", "");
        badge.textContent = "Visca el Barca";
      }
    });
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <!-- .grid envuelve el slot para que el CSS grid funcione -->
      <div class="grid">
        <slot></slot>
      </div>
    `);
  }
}

customElements.define("user-dashboard", UserDashboard);
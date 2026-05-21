import styles from "../styles/WarningBadge.css" with { type: "css" };

class WarningBadge extends HTMLElement {

  static get observedAttributes() {
    return ["pulsing"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(styles);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, old, now) {
    if (old !== now) this.render();
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <!-- El texto lo pone el dev desde afuera via slot -->
      <slot></slot>
    `);
  }
}

customElements.define("warning-badge", WarningBadge);
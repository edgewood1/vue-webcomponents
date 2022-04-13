import { html, render } from "lit-html";
import { styleMap } from "lit-html/directives/style-map.js";

(function () {
  class WebComp extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.userInfo = {};
      this.selectedList = [];
      this.page = 1;
      this.handleNameEmail = this.handleNameEmail.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleCheck = this.handleCheck.bind(this);
    }

    connectedCallback() {
      this.getModel();
      this.renderBase();
    }

    getModel = async () => { 
      const url = "https://fakestoreapi.com/products?limit=3"; 
      try {
        const response = await fetch(url);
        this.products = await response.json();
        this.renderPosts();
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    handleCheck(e) {
      const id = parseInt(e.target.id);
      const [selectedItem] = this.products.filter((obj) => obj.id === id);
      // if new id absent from list, return true
      const newId = this.selectedList.every(
        (obj) => obj.id !== selectedItem.id
      );
      // if true, add it
      if (newId) {
        this.selectedList.push(selectedItem);
      } else {
        this.selectedList = this.selectedList.filter(
          (obj) => obj.id !== selectedItem.id
        );
      }
    }

    handleNameEmail(e) {
      const source = e.composedPath()[0];
      if (source.id === "name") {
        this.userInfo.name = source.value;
      } else {
        this.userInfo.email = source.value;
      }
    }

    handleClick() {
      this.page = this.page + 1;
      if (this.page == 2) this.renderPage();
      if (this.page == 3) this.renderEnd();
    }
    // common elements
    renderBase() {
      const base = html`<div
        style=${styleMap(this.pageStyles)}
        id="modal"
      ></div>`;
      render(base, this.shadowRoot);
    }

    renderButton() {
      return html`<br /><button
          style="width:fit-content"
          @click=${this.handleClick}
        >
          Continue
        </button>`;
    }

    renderTitle() {
      return html`<p>vanilla WC + lit-html</p>`;
    }

    // page elements
    renderPosts() {
      const page = html`${this.renderTitle()}
        <div>
          ${this.products.map(
            (e) => html`<div>
              <input @change="${this.handleCheck}" id=${e.id} type="checkbox" />
              <span> ${e.title} </span>
            </div>`
          )}
        </div>
        ${this.renderButton()}`;
      render(page, this.shadowRoot.querySelector("#modal"));
    }

    renderPage() {
      const page = html`${this.renderTitle()}
        <label for="name">name</label>
        <input @input="${this.handleNameEmail}" id="name"/>
        <label for="email">email</label>
        <input @input="${this.handleNameEmail}" id="email" />
        ${this.renderButton()}`;
      render(page, this.shadowRoot.querySelector("#modal"));
    }

    renderEnd() {
      const page = html`${this.renderTitle()}
        ${this.selectedList.map(
          (item) =>
            html`<div>
              <div>Title: ${item.title}</div>
            </div>`
        )}
        <div>Name: ${this.userInfo.name}</div>
        <div>Email: ${this.userInfo.email}</div>`;
      render(page, this.shadowRoot.querySelector("#modal"));
    }

    pageStyles = {
      margin: "20px",
      padding: "20px",
      border: "1px solid black",
      "border-radius": "2%",
      width: "30vw",
      display: "flex",
      "flex-direction": "column",
      "align-content": "center",
    };
  }

  customElements.define("web-comp", WebComp);
})();

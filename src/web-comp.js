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
      this.loading = false;
      this.handleNameEmail = this.handleNameEmail.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleCheck = this.handleCheck.bind(this);
    }

    connectedCallback() {
      this.getModel();
      this.renderBase();
    }

    getModel = async () => {
      this.loading = true;
      const url = "https://fakestoreapi.com/products?limit=3"; 
      try {
        const response = await fetch(url);
        this.products = await response.json();
        this.loading = false;
        this.renderBase();
      } catch (error) {
        console.log(error);
        this.loading = false;
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
      this.renderBase();
    }

    getPage() {
      switch (this.page) {
        case 1:
          return this.renderPosts();
        case 2:
          return this.renderNameEmail();
        case 3:
          return this.renderFinal();
      }
    }
    // common elements
    renderBase() {
      const page = html`<div style=${styleMap(this.pageStyles)} id="modal">
        <p><strong>Vanilla WC + Lit-html</strong></p>
        ${this.loading ? this.spinner() : this.getPage()}
        <br />
        ${!this.loading && this.page < 3
          ? html`<button style="width:fit-content" @click=${this.handleClick}>
              Continue
            </button>`
          : ""}
      </div>`;
      render(page, this.shadowRoot);
    }

    // page elements
    renderPosts() {
      return html`
        <div>
          ${this.products.map(
            (e) => html`<div>
              <input
                @change="${this.handleCheck}"
                id=${e.id}
                type="checkbox"
                style="margin-right:10px"
              />
              <span> ${e.title} </span>
            </div>`
          )}
        </div>
      `;
    }

    renderNameEmail() {
      return html`
        <label for="name">name</label>
        <input @input="${this.handleNameEmail}" id="name" />
        <label for="email">email</label>
        <input @input="${this.handleNameEmail}" id="email" />
      `;
    }

    spinner() {
      return html`<div class="loader"></div>
        <style>
          .loader {
            border: 16px solid #f3f3f3; /* Light grey */
            border-top: 16px solid #3d8895; /* Blue */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% { 
              transform: rotate(360deg);
            }
          }
        </style>`;
    }

    renderFinal() {
      return html`${this.selectedList.map(
          (item) =>
            html`<div>
              <div>Title: ${item.title}</div>
            </div>`
        )}
        <div><strong>Name: </strong> ${this.userInfo.name}</div>
        <div><strong>Email: </strong> ${this.userInfo.email}</div>`;
    }

    pageStyles = {
      margin: "20px",
      padding: "20px",
      border: "1px solid black",
      "border-radius": "2%",
      width: "40vw",
      display: "flex",
      "flex-direction": "column",
      "align-content": "center",
      background: "turquoise",
    };
  }

  customElements.define("web-comp", WebComp);
})();

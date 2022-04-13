import { defineCustomElement } from "vue";
import Options from "./options-api.ce.vue";
import Composition from "./composition-api.ce.vue";

const optionEl = defineCustomElement(Options);
const compositionEl = defineCustomElement(Composition);

customElements.define("options-api", optionEl);
customElements.define("composition-api", compositionEl);

<script>
import { defineComponent } from "vue";

export default defineComponent({
  async created() {
    this.loading = true;
    const url = "https://fakestoreapi.com/products?limit=3";
    try {
      const response = await fetch(url);
      this.loading = false;
      this.productList = await response.json();
    } catch (err) {
      console.log(err);
      this.loading = false;
      throw err;
    }
  },
  // reactive state
  data() {
    return {
      page: 1,
      productList: [],
      selectedList: [],
      userInfo: {},
      loading: false,
    };
  },
  // functions that mutate state and trigger updates
  methods: {
    handleContinue() {
      this.page++;
    },
    handleCheck(e) {
      const id = parseInt(e.target.id);
      const [selectedItem] = this.productList.filter((obj) => obj.id === id);
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
    },
    handleNameEmail(e) {
      const source = e.composedPath()[0];
      if (source.id === "name") {
        this.userInfo.name = source.value;
      } else {
        this.userInfo.email = source.value;
      }
    },
  },
});
</script>

<template>
  <div id="modal">
    <p><strong>Options API</strong></p>
    <div v-if="!this.loading">
      <div v-if="this.page === 1">
        <div v-for="per in this.productList" :key="per.id">
          <input @change="handleCheck($event)" type="checkbox" :id="per.id" />
          <span> {{ per.title }}</span>
        </div>
      </div>
      <div v-if="this.page === 2">
        <label for="name">name</label>
        <input @input="handleNameEmail($event)" id="name" />
        <label for="email">email</label>
        <input @input="handleNameEmail($event)" id="email" />
      </div>
      <div v-if="this.page <= 2">
        <br />
        <button @click="handleContinue">Continue</button>
      </div>
      <div v-if="this.page === 3">
        <div v-for="item in this.selectedList" :key="item.id">
          <div><strong>Title: </strong> {{ item.title }}</div>
        </div>
        <div><strong>Name: </strong> {{ this.userInfo.name }}</div>
        <div><strong>Email: </strong> {{ this.userInfo.email }}</div>
      </div>
    </div>
    <div v-if="this.loading" class="loader"></div>
  </div>
</template>

<style scoped>
div#modal {
  background: turquoise;
  margin: 20px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 2%;
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-content: center;
}
[type="checkbox"] {
  margin-right: 10px;
}

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
</style>

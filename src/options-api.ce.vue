<script>
import { defineComponent } from "vue";

export default defineComponent({
  async created() {
    const url = "https://fakestoreapi.com/products?limit=3";
    try {
      const response = await fetch(url);
      this.productList = await response.json();
    } catch (err) {
      console.log(err);
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
    <p> Options API</p>
    <div v-if="this.page === 1">
      <div v-for="per in this.productList" :key="per.id">
        <input @change="handleCheck($event)" type="checkbox" :id="per.id" />
        <span> {{ per.title }}</span>
      </div>
    </div>
    <div v-if="this.page === 2">
      <label for="name">name</label>
      <input @input="handleNameEmail($event)" ref="name" id="name"/>
      <label for="email">email</label>
      <input @input="handleNameEmail($event)" ref="email" id="email" />
    </div>
    <div v-if="this.page <= 2">
      <br />
      <button @click="handleContinue">Continue</button>
    </div>
    <div v-if="this.page === 3">
      <div v-for="item in this.selectedList" :key="item.id">
        <div>Title: {{ item.title }}</div>
      </div>
      <div>Name: {{ this.userInfo.name }}</div>
      <div>Email: {{ this.userInfo.email }}</div>
    </div>
  </div>
</template>

<style scoped>
div#modal {
  margin: 20px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 2%;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-content: center;
}
</style>

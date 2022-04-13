<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { Product, StateType, UserInfo } from "./types/index";

const fetchRandomUser = async (): Promise<Product[]> => {
  const url = "https://fakestoreapi.com/products?limit=3";
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const productList: Product[] = [];
const selectedList: Product[] = [];
const userInfo: UserInfo = {} as UserInfo;

const state: StateType = reactive({
  page: 1,
  productList,
  selectedList,
  userInfo,
});

onMounted(() => {
  fetchRandomUser().then((results: Product[]) => {
    if (results) {
      state.productList = results;
    }
  });
});

function handleContinue(): void {
  state.page++;
}

function handleCheck(e): void {
  // 1, 2, 3
  const id = parseInt(e.target.id);
  const [selectedItem] = state.productList.filter((obj) => obj.id === id);
  // if new id absent from list, return true
  const newId = state.selectedList.every((obj) => obj.id !== selectedItem.id);
  // if true, add it
  if (newId) {
    state.selectedList.push(selectedItem);
  } else {
    state.selectedList = state.selectedList.filter(
      (obj) => obj.id !== selectedItem.id
    );
  }
}

function handleInput(e) {
  console.log(e);
}

function handleNameEmail(e) {
  const source = e.composedPath()[0];
  if (source.id === "name") {
    state.userInfo.name = source.value;
  }
  if (source.id === "email") {
    state.userInfo.email = source.value;
    console.log(state.userInfo);
  }
}
</script>

<template>
  <div id="modal">
    <p>Composition API</p>
    <div v-if="state.page === 1">
      <div v-for="per in state.productList" :key="per.id">
        <input @change="handleCheck($event)" type="checkbox" :id="per.id" />
        <span> {{ per.title }}</span>
      </div>
    </div>
    <div v-if="state.page === 2">
      <label for="name">name</label>
      <input @input="handleNameEmail($event)" ref="name" id="name"/>
      <label for="email">email</label>
      <input @input="handleNameEmail($event)" ref="email" id="email" />
    </div>
    <div v-if="state.page <= 2">
      <br />
      <button @click="handleContinue">Continue</button>
    </div>
    <div v-if="state.page === 3">
      <div v-for="item in state.selectedList" :key="item.id">
        <div>Title: {{ item.title }}</div>
      </div>
      <div>Name: {{ state.userInfo.name }}</div>
      <div>Email: {{ state.userInfo.email }}</div>
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

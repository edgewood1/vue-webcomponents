
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import type { Product, UserInfo, State } from '.components//types';

const fetchRandomUser = async (): Promise<Product> => {
const url = 'https://fakestoreapi.com/products?limit=3';
  try {
    const response = await fetch(url);
    return await response.json();
  } catch(error) {
    console.log(error);
    throw error;
  }
}

const state: State = reactive({
  page: 1,
  productList: [],
  selectedList : [],
  userInfo: {}
})

onMounted(() => {
  // state.productList is 
  fetchRandomUser().then((results) => {
    if (results) {    
      state.productList = results;
     
    }
  })
})

function handleContinue(e) {
  state.page++;
  if (state.page === 3) {
    const name = document.querySelector('input#name').value;
    const email = document.querySelector('input#email').value;
    state.userInfo = {name, email};
  }
}

function handleCheck(e) {
  // 1, 2, 3
  const id = parseInt(e.target.id);
  const [selectedItem] = state.productList.filter(obj => obj.id ===id);
  // if new id absent from list, return true
  const newId = state.selectedList.every(obj => (obj.id !== selectedItem.id));
  // if true, add it
  if (newId) {
    state.selectedList.push(selectedItem);
  } else {
    state.selectedList = state.selectedList.filter(obj => {obj.id !== selectedItem.id}); 
  }
}

function handleInput(e) {
  console.log(e)
}


</script>

<template >
  <div v-if="state.page === 1" v-for="(per) in state.productList">
    <input @change="handleCheck($event)" type="checkbox" :id="per.id" />
    <span> {{ per.title }}</span>
  </div>
  <div v-if="state.page === 2">
    <label @change="handleInput($event)" for="name">name</label>
    <input id="name"/>
    <label for="email">email</label>
    <input id="email" />
  </div>
  <button v-if="state.page <=2" @click="handleContinue" >Continue</button>
    <div v-if="state.page === 3">
    <div v-for="(d) in state.selectedList">
    <div> Title: {{d.title}}</div>
    </div>
    <div> Name: {{state.userInfo.name}}</div>
    <div> Email: {{state.userInfo.email}}</div>  
  </div>
</template>
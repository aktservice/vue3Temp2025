<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>

<template>
  <h1>{{ count }}</h1>
  <button class="btn btn-success" @click="increment">Increment</button>
  <button @click="decrement">Decrement</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hour = ref(0);
const mileage = ref(0);
const paid = ref('無償');
const cost = ref('金額');
</script>
<template>
  <input type="text" name="opsheet" id="opsheet-hour" v-model="hour" />
  <input type="text" name="opsheet" id="opsheet-mileage" v-model="mileage" />
  <input type="text" name="opsheet" id="opsheet-paid" v-model="paid" />
  <input type="text" name="opsheet" id="opsheet-cost" v-model="cost" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hour = ref(0);
const mileage = ref(0);
const paid = ref('無償');
const cost = ref('金額');
</script>
<template>
  <div class="input-group input-group-lg">
    <span class="input-group-text">hour</span>
    <input
      type="text"
      class="form-control"
      name="opsheet"
      id="opsheet-hour"
      v-model="hour"
    />
    <span class="input-group-text">距離</span>
    <input
      type="text"
      class="form-control"
      name="opsheet"
      id="opsheet-mileage"
      v-model="mileage"
    />
    <span class="input-group-text">請求</span>
    <input
      type="text"
      class="form-control"
      name="opsheet"
      id="opsheet-paid"
      v-model="paid"
    />
    <span class="input-group-text">金額</span>
    <input
      type="text"
      class="form-control"
      name="opsheet"
      id="opsheet-cost"
      v-model="cost"
    />
  </div>
</template>

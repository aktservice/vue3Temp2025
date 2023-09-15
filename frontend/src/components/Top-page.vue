<!-- eslint-disable vue/no-parsing-error -->
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('onload');
  google.script.run
    .withSuccessHandler((ret) => {
      const list = document.getElementById('list');
      if (list != null) {
        list.innerHTML = ret;
      }
    })
    .buildSelectOptions('1000403');
});
</script>

<template>
  <div class="mb-3">
    <label for="query">検索</label>
    <input
      class="form-control form-control-lg"
      type="text"
      id="weather"
      name="for_admin"
      list="querylist"
    />
  </div>
  <div id="list"></div>
</template>

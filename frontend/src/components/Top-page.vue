<!-- eslint-disable vue/no-parsing-error -->
<script setup lang="ts">
import { onMounted } from 'vue';
const html = '<?!=SHOPCODE ?>';

onMounted(() => {
  const bucode = document.querySelector('#mrgn')?.innerHTML;
  if (bucode == undefined) {
    console.log('err');
    return;
  }
  google.script.run
    .withSuccessHandler((ret) => {
      const list = document.getElementById('list');
      if (list != null) {
        list.innerHTML = ret;
      }
    })
    .buildSelectOptions(bucode);
});
</script>

<template>
  <div class="mb-3">
    <div v-html="html" id="mrgn"></div>
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

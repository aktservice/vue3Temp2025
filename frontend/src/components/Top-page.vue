<!-- eslint-disable vue/no-parsing-error -->
<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
const html = '<?!=SHOPCODE ?>';

onMounted(() => {
  const bucode = document.querySelector('#bucode')?.innerHTML;
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
//see "https://zenn.dev/koduki/articles/0f8fcbc9a7485b"
let returnArray: Ref<[{ title: string; data: string[] }]> = ref([
  { title: '', data: [] },
]);
const onChange = (event: any) => {
  const bucode = document.querySelector('#bucode')?.innerHTML;
  if (bucode == undefined) {
    return;
  }
  const mgrn = event.target?.value;
  console.log(mgrn);
  console.log(bucode);

  google.script.run
    .withSuccessHandler((ret: [{ title: string; data: string[] }]) => {
      returnArray.value = ret;
    })
    .getInspDataArray(mgrn, 10, bucode);
};
</script>
<style>
li {
  display: inline-block;
  list-style: none;
}
</style>

<template>
  <div class="m-3">
    <div v-html="html" id="bucode"></div>
    <label for="query">検索</label>
    <input
      class="form-control form-control-lg"
      type="text"
      id="inputmgrn"
      name="for_admin"
      list="querylist"
      @change="onChange"
    />
  </div>
  <div id="list"></div>
  <template v-for="(ret, index) in returnArray" v-bind:key="index">
    <details>
      <summary>{{ ret.title }}</summary>
      <li v-for="(l, index2) in ret.data" v-bind:key="index2">{{ l }}</li>
    </details>
  </template>
</template>

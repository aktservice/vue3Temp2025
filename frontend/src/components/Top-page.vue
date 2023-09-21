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
let returnArray: Ref<string[]> = ref([]);
const onChange = (event: any) => {
  const bucode = document.querySelector('#bucode')?.innerHTML;
  if (bucode == undefined) {
    return;
  }
  const mgrn = event.target?.value;
  console.log(mgrn);
  console.log(bucode);

  google.script.run
    .withSuccessHandler((ret: string[]) => {
      returnArray.value = ret;
    })
    .getMachineDataArray(mgrn, 10, bucode);
};
</script>

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
  <li v-for="(ret, index) in returnArray" v-bind:key="index">{{ ret }}</li>
</template>

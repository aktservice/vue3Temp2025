<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  buttonName: string;
  setValue: string;
  mgrn: string;
  btnClass: string;
}>();
const btnClick = () => {
  console.log('btnOn');
  isSpinnerShow.value = true;
  const todayDate = new Date().toString();
  const setDataArray = [todayDate, props.mgrn, props.setValue];
  console.log(setDataArray);
  google.script.run
    .withSuccessHandler(() => {
      //ここに成功時の処理
      console.log('ok');

      isSpinnerShow.value = false;
    })
    .setData(setDataArray);
};
const isSpinnerShow = ref(false);
</script>
<template>
  <div class="d-grid gap-2 m-5">
    <button :val="mgrn" :class="btnClass" :value="setValue" @click="btnClick">
      {{ buttonName }}
      <span
        v-if="isSpinnerShow"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  buttonName: string;
  setValue: string;
  mgrn: string;
  btnClass: string;
}>();
const btnClick = () => {
  console.log('btnOn');
  const todayDate = '今日の日付'; //new Date();
  const setDataArray = [todayDate, props.mgrn, props.setValue];
  console.log(setDataArray);
  google.script.run
    .withSuccessHandler(() => {
      //ここに成功時の処理
      console.log('ok');
    })
    .setData(setDataArray);
};
</script>
<template>
  <div class="d-grid gap-2 m-5">
    <button :val="mgrn" :class="btnClass" :value="setValue" @click="btnClick">
      {{ buttonName }}
    </button>
  </div>
</template>

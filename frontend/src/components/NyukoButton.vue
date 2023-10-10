<script setup lang="ts">
const props = defineProps<{
  buttonName: string;
  setValue: string;
  mgrn: string;
  btnClass: string;
}>();
const btnClick = () => {
  const todayDate = new Date();
  const setDataArray = [todayDate, props.mgrn, props.setValue];
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
    <button :class="btnClass" :value="setValue" @click="btnClick">
      {{ buttonName }}
    </button>
  </div>
</template>

<!-- eslint-disable vue/no-parsing-error -->
<script setup lang="ts">
import { Ref, onMounted, ref, computed } from 'vue';
import qrcomponent from './Qr-Component.vue';
import nyuko from './NyukoButton.vue';
//init時にテンプレート処理
//see https://developers.google.com/apps-script/guides/html/templates?hl=ja
const html = '<?!=SHOPCODE ?>';
//検索BOXのRef
const mgrn = ref('');
let bucodeRef = ref('bucode');
// ここから送信データ
const listCheck = ref([]);
const hour = ref(0);
const mileage = ref(0);
const paid = ref('選択して下さい');
const cost = ref('選択して下さい');
//マウント時に処理
onMounted(() => {
  //部門コードがない場合は一旦リターン
  const bucode = document.querySelector('#bucode')?.innerHTML;
  if (bucode == undefined) {
    console.log('err');
    return;
  }
  bucodeRef.value = bucode;
  //サーバー側からHTMLでリストが来るためVHTMLへHTMLセットで処理
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
  { title: '修理データ', data: ['詳細データ①', '詳細データ②'] },
]);

//修理データ用
const inspData = computed(() => {
  return [
    bucodeRef.value,
    hour.value,
    mileage.value,
    paid.value,
    cost.value,
    listCheck.value.join(),
  ];
});

//QRコードをセットする関数
const setQrData = (data) => {
  mgrn.value = data;
};
//bucodeの変更時処理
const bucodeChange = (e) => {
  const bucode = e.target?.value;
  if (bucode == undefined || bucode == '') {
    console.log('undefined');
    return;
  }

  const idElement = document.querySelector('#bucode');
  if (idElement !== null) {
    idElement.innerHTML = bucode;
    bucodeRef.value = bucode;
  }
  google.script.run
    .withSuccessHandler((ret) => {
      const list = document.getElementById('list');
      if (list != null) {
        list.innerHTML = ret;
      }
    })
    .buildSelectOptions(bucode);
};
//mgrn変更時の処理
const onChange = (event: any) => {
  const inMgrn = event.target?.value;
  console.log(inMgrn);
  if (inMgrn == undefined || inMgrn == '') {
    console.log('undefined');
    return;
  }

  mgrn.value = inMgrn;
  const bucode = bucodeRef.value;
  console.log(bucode);
  if (bucode == undefined) {
    console.log('err');
    return;
  }
  //const mgrn = event.target?.value;

  google.script.run
    .withSuccessHandler((ret: [{ title: string; data: string[] }]) => {
      returnArray.value = ret;
    })
    .getInspDataArray(inMgrn, 10, bucode);
};
//QRコード読み込み部分を隠す処理用
const isShow = ref(true);
const videoShow = () => {
  console.log(isShow.value);
  if (isShow.value) {
    return (isShow.value = false);
  } else {
    return (isShow.value = true);
  }
};
</script>
<style>
input[type='checkbox'] {
  transform: scale(1.5);
}
</style>

<template>
  <div class="d-grid gap-2 m-5">
    <button class="btn btn-warning" v-on:click="videoShow">
      QR読み込み中止
    </button>
  </div>
  <div v-if="isShow">
    <qrcomponent @sendData="setQrData"></qrcomponent>
  </div>

  <div class="m-5">
    <div hidden="true" v-html="html" id="bucode"></div>
    <div class="input-group input-group-lg">
      <span class="input-group-text">検索</span>
      <input
        type="text"
        class="form-control"
        id="inputmgrn"
        name="for_admin"
        list="querylist"
        @change="onChange"
        :value="mgrn"
      />
      <span class="input-group-text">部門コード</span>
      <input
        type="text"
        class="form-control"
        id="bucoderef"
        name="for_admin"
        list="bucodelist"
        @change="bucodeChange"
        :value="bucodeRef"
      />
    </div>
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
      <select
        class="form-control"
        name="opsheet"
        id="opsheet-paid"
        v-model="paid"
      >
        <option value="選択して下さい">選択して下さい</option>
        <option value="有償">有償</option>
        <option value="無償">無償</option>
      </select>
      <span class="input-group-text">燃料過不足</span>
      <select
        class="form-control"
        name="opsheet"
        id="opsheet-cost"
        v-model="cost"
      >
        <option value="選択して下さい">燃料過不足選択して下さい</option>
        <option value="有">有</option>
        <option value="無">無</option>
      </select>
    </div>
    <div id="list"></div>
  </div>

  <template v-for="(ret, index) in returnArray" v-bind:key="index">
    <div class="form-check d-grid">
      <label class="fs-3" v-bind:for="'titlecheckbox' + index">{{
        ret.title
      }}</label>
      <!--
      <input
        class="form-check-input m-3"
        type="checkbox"
        v-bind:value="ret.title"
        v-bind:id="'titlecheckbox' + index"
      />
-->
    </div>
    <details class="m-3 fs-3">
      <summary>{{ ret.title }}:詳細(不良時にチェックして下さい)</summary>
      <ul class="list-group">
        <li
          class="list-group-item m-3"
          v-for="(cont, index2) in ret.data"
          v-bind:key="index2"
        >
          <div class="form-check">
            <input
              type="checkbox"
              class="list-group-item m-3 form-check-input"
              name="checklist"
              v-bind:id="'cont' + index2"
              v-bind:value="cont"
              v-model="listCheck"
            />
            <label class="form-check-label" v-bind:for="'cont' + index2">{{
              cont
            }}</label>
          </div>
        </li>
      </ul>
    </details>
  </template>
  <nyuko
    buttonName="軽整備（整備清掃）"
    :mgrn="mgrn"
    setValue="軽整備（整備清掃）"
    btnClass="btn btn-success"
    :set-insp-data="inspData"
  ></nyuko>
  <nyuko
    buttonName="中修理（部品交換）"
    :mgrn="mgrn"
    setValue="中修理（部品交換）"
    btnClass="btn btn-info"
    :set-insp-data="inspData"
  ></nyuko>
  <nyuko
    buttonName="重修理（工場外注）"
    :mgrn="mgrn"
    setValue="重修理（工場外注）"
    btnClass="btn btn-danger"
    :set-insp-data="inspData"
  ></nyuko>
  <nyuko
    buttonName="判断不可"
    :mgrn="mgrn"
    setValue="判断不可"
    btnClass="btn btn-primary"
    v-bind:set-insp-data="inspData"
  ></nyuko>
</template>

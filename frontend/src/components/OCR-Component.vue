<script setup lang="ts">
import { ref, watch } from 'vue';

interface sendEmits {
  (event: 'sendDataByOCR', value: string): void;
}
const emits = defineEmits<sendEmits>();
const changeData = (val: string) => {
  emits('sendDataByOCR', val);
};

const refData = ref('Unable to access video stream.');
watch(refData, () => {
  changeData(refData.value);
});

const stOCR = (e: Event) => {
  let video = document.createElement('video');
  let canvas = document.getElementById('canvas') as HTMLCanvasElement;
  let ctx = canvas.getContext('2d');
  let msg = document.getElementById('msg');

  const userMedia = { video: { facingMode: 'environment' } };
  navigator.mediaDevices.getUserMedia(userMedia).then((stream) => {
    video.srcObject = stream;
    video.setAttribute('playsinline', true);
    video.play();
    const tick = startTick();
    if (tick == 'stp') {
      stream.getTracks().forEach((element) => {
        //element.stop();
      });
    }
  });

  function startTick() {
    msg.innerText = 'Loading video...';
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var isRecognizing = false;

      setInterval(function () {
        if (isRecognizing) return;
        isRecognizing = true;

        Tesseract.recognize(img, 'eng', {
          logger: function (e) {
            console.log('log');
          },
        }).then(function (result) {
          console.log(result);
          refData.value = result.data.text;

          //return 'stp';

          isRecognizing = false;
        });
      }, 200);

      //drawRect(code.location); // Rect
    }
    setTimeout(startTick, 250);
  }

  function drawRect(location) {
    drawLine(location.topLeftCorner, location.topRightCorner);
    drawLine(location.topRightCorner, location.bottomRightCorner);
    drawLine(location.bottomRightCorner, location.bottomLeftCorner);
    drawLine(location.bottomLeftCorner, location.topLeftCorner);
  }

  function drawLine(begin, end) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FF3B58';
    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }
};
</script>
<style>
#wrapper {
  margin: 0px auto 0px auto;
  width: 320px;
  height: auto;
}

#msg {
  margin: 0px;
  padding: 10px;
  background-color: lightgray;
  text-align: center;
}

#canvas {
  width: 100%;
  height: auto;
  background-color: silver;
}
</style>
<template>
  <div class="d-grid gap-2 m-5">
    <button class="btn btn-primary" @click="stOCR">OCR起動</button>
  </div>
  <h1>OCR</h1>
  <div id="wrapper">
    <div id="msg">{{ refData }}</div>
    <canvas id="canvas"></canvas>
  </div>
</template>

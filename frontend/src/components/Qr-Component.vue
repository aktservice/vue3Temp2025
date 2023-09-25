<script setup lang="ts">
import jsQR from 'jsqr';
import { onMounted } from 'vue';
onMounted((e) => {
  let video = document.createElement('video');
  let canvas: HTMLCanvasElement = document.getElementById('canvas');
  let ctx = canvas?.getContext('2d');
  let msg = document.getElementById('msg');

  const userMedia = { video: { facingMode: 'environment' } };
  navigator.mediaDevices.getUserMedia(userMedia).then((stream) => {
    video.srcObject = stream;
    video.setAttribute('playsinline', true);
    video.play();
    startTick();
  });

  function startTick() {
    msg.innerText = 'Loading video...';
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let code = jsQR(img.data, img.width, img.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        drawRect(code.location); // Rect
        msg.innerText = code.data; // Data
      } else {
        msg.innerText = 'Detecting QR-Code...';
      }
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
});
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
  <h1>jsQR</h1>
  <div id="wrapper">
    <div id="msg">Unable to access video stream.</div>
    <canvas id="canvas"></canvas>
  </div>
</template>

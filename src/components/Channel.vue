<template>
  <h1>
    Video Call<br /><small style="font-size: 14pt;">Powered by Agora.io</small>
  </h1>
  <div id="remote-container">
    <div class="icons-section">
      <img src="../assets/icons/microphone.svg" class="vedio-audio-assets" />
      <button v-on:click="handleButtonClick">
        {{ callStarted ? "LEAVE CHANNEL" : "JOIN CHANNEL" }}
      </button>
      <img src="../assets/icons/video-camera.svg" class="vedio-audio-assets" />
    </div>
  </div>

  <div v-if="callStarted">
    <div>Room is Live</div>
  </div>
</template>

<script>
import AgoraRTC from "agora-rtc-sdk";
import {
  addVideoStream,
  removeVideoStream,
} from "../helpers/agoraVedioOperators";

export default {
  name: "Channel",
  data() {
    return {
      rtc: {
        client: null,
        localStream: null,
        params: {},
      },
      callStarted: false,
    };
  },
  methods: {
    async startCall() {
      const rtcEngine = this.rtc;
      const remoteContainer = document.getElementById("remote-container");
      rtcEngine.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
      await rtcEngine.client.init("ad65498ba2f5406aad676a1ed4d34230");
      await rtcEngine.client.join(
        null,
        `my-room`,
        null,
        function(uid) {
          rtcEngine.params.uid = uid;
          rtcEngine.localStream = AgoraRTC.createStream({
            streamID: rtcEngine.params.uid,
            audio: true,
            video: true,
            screen: false,
          });

          rtcEngine.localStream.init(function() {
            rtcEngine.client.publish(rtcEngine.localStream, function(err) {
              console.error("error in publish", err);
            });
          });

          rtcEngine.client.on("stream-added", function(evt) {
            const remoteStream = evt.stream;
            const id = remoteStream.getId();
            if (id !== rtcEngine.params.uid) {
              rtcEngine.client.subscribe(remoteStream);
            }
          });

          rtcEngine.client.on("stream-subscribed", function(evt) {
            const remoteStream = evt.stream;
            let streamId = String(remoteStream.getId());
            remoteStream.play("remote-container");
            addVideoStream(streamId, remoteContainer);
          });

          rtcEngine.client.on("stream-removed", function(evt) {
            const remoteStream = evt.stream;
            let streamId = String(remoteStream.getId());
            remoteStream.stop("remote-container");
            removeVideoStream(streamId);
          });

          rtcEngine.client.on("peer-leave", function(evt) {
            let stream = evt.stream;
            let streamId = String(stream.getId());
            stream.close();
            removeVideoStream(streamId);
          });
        },
        function(err) {
          console.error("client join failed ", err);
        }
      );
      this.callStarted = true;
    },
    async endCall() {
      if (this.rtc.client && this.rtc.localStream) {
        this.rtc.client.unpublish(this.rtc.localStream);
        this.rtc.localStream.close();
        this.rtc.client.leave();
      }
      this.callStarted = false;
    },
    handleButtonClick() {
      if (this.callStarted) {
        this.endCall();
      } else {
        this.startCall();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#remote-container {
  height: 500px;
  position: relative;
  border: solid 5px #3eb37f;
  border-radius: 20px;
  overflow: auto;
  display: flex;
  width: 50%;
}
.icons-section {
  position: absolute;
  z-index: 999;
  bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  flex: 1;
  width: 100%;
}
.vedio-audio-assets {
  height: 40px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}
</style>

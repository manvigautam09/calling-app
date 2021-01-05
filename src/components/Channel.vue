<template>
  <h1>
    Video Call<br /><small style="font-size: 14pt;">Powered by Agora.io</small>
  </h1>
  <div id="remote-container"></div>
  <button v-on:click="handleButtonClick">
    {{ callStarted ? "LEAVE CHANNEL" : "JOIN CHANNEL" }}
  </button>
  <div v-if="callStarted">
    <button>Enable Vedio</button>
  </div>
</template>

<script>
import AgoraRTC from "agora-rtc-sdk";

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
      cameraStarted: false,
    };
  },
  methods: {
    async startCall() {
      const rtcEngine = this.rtc;
      rtcEngine.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
      await rtcEngine.client.init("ad65498ba2f5406aad676a1ed4d34230");
      await rtcEngine.client.join(null, `my-room`, null, function(uid) {
        rtcEngine.params.uid = uid;
        rtcEngine.localStream = AgoraRTC.createStream({
          streamID: rtcEngine.params.uid,
          audio: true,
          video: false,
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
          remoteStream.play("remote-container");
        });

        rtcEngine.client.on("stream-removed", function(evt) {
          const remoteStream = evt.stream;
          remoteStream.stop("remote-container");
        });
      });
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
      console.log("####rtc", this.rtc.client);
      if (this.callStarted) {
        this.endCall();
        console.log("####ended");
      } else {
        this.startCall();
        console.log("####started");
      }
      console.log("####rtcafter the action is called", this.rtc.client);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

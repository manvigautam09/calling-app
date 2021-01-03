<template>
  <h1>
    Video Call<br /><small style="font-size: 14pt;">Powered by Agora.io</small>
  </h1>
  <div id="remote-container"></div>
  <button v-on:click="startCall">
    JOIN CHANNEL
  </button>
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
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

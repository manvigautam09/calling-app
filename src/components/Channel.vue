<template>
  <div class="container">
    <div class="room-name">{{ channelName }}</div>
    <div id="remote-container">
      <div
        v-if="currentUser.length > 0"
        :id="currentUser"
        class="current-user-picture"
      >
        <div class="users-list" id="users-list-container">
          <div
            v-for="id in usersInRoom"
            :key="id"
            :id="id"
            class="user-picture"
          />
        </div>
      </div>
      <div class="icons-section">
        <img
          src="../assets/icons/microphone.svg"
          class="vedio-audio-assets"
          @click="toggleMic"
          v-if="audioOn"
        />
        <img
          src="../assets/icons/redMicrophone.svg"
          class="vedio-audio-assets"
          @click="toggleMic"
          v-else-if="!audioOn"
        />
        <button v-on:click="handleButtonClick">
          {{ callStarted ? 'LEAVE CHANNEL' : 'JOIN CHANNEL' }}
        </button>
        <img
          src="../assets/icons/videoCamera.svg"
          class="vedio-audio-assets"
          @click="toggleCamera"
          v-if="cameraOn"
        />
        <img
          src="../assets/icons/redVideoCamera.svg"
          class="vedio-audio-assets"
          @click="toggleCamera"
          v-else-if="!cameraOn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AgoraRTC from 'agora-rtc-sdk';

// import { removeVideoStream } from '../helpers/agoraVedioOperators';

export default {
  components: {},
  name: 'Channel',
  data() {
    return {
      rtc: {
        client: null,
        localStream: null,
        params: {}
      },
      audioOn: true,
      cameraOn: true,
      callStarted: false,
      currentUser: '',
      localStream: null,
      usersInRoom: [],
      remoteStream: null
    };
  },
  methods: {
    async startCall(channelName = 'xyz') {
      const rtcEngine = this.rtc;
      const audioStatus = this.audioOn;
      const cameraStatus = this.cameraOn;
      const addUsers = this.addUsers;
      const removeUsers = this.removeUsers;
      const addCurrentUser = this.addCurrentUser;
      const updateLocalStream = this.updateLocalStream;
      const updateRemoteStream = this.updateRemoteStream;
      AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.NONE);
      rtcEngine.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });
      await rtcEngine.client.init(process.env.VUE_APP_AGORA_KEY);
      await rtcEngine.client.join(
        null,
        channelName,
        null,
        function(uid) {
          rtcEngine.params.uid = uid;
          rtcEngine.localStream = AgoraRTC.createStream({
            streamID: rtcEngine.params.uid,
            audio: true,
            video: true,
            screen: false
          });

          rtcEngine.localStream.init(function() {
            rtcEngine.client.publish(rtcEngine.localStream, function(err) {
              console.error('error in publish', err);
            });
            if (!audioStatus) {
              rtcEngine.localStream.muteAudio();
            }
            if (!cameraStatus) {
              rtcEngine.localStream.muteVideo();
            }
            let streamId = String(rtcEngine.localStream.getId());
            updateLocalStream(rtcEngine.localStream);
            addCurrentUser(streamId);
          });

          rtcEngine.client.on('stream-added', function(evt) {
            const remoteStream = evt.stream;
            const id = remoteStream.getId();
            if (id !== rtcEngine.params.uid) {
              rtcEngine.client.subscribe(remoteStream);
            }
          });

          rtcEngine.client.on('stream-subscribed', function(evt) {
            const remoteStream = evt.stream;
            let streamId = String(remoteStream.getId());
            updateRemoteStream(remoteStream);
            addUsers(streamId);
          });

          rtcEngine.client.on('stream-removed', function(evt) {
            const remoteStream = evt.stream;
            let streamId = String(remoteStream.getId());
            remoteStream.stop(streamId);
            removeUsers(streamId);
          });

          // rtcEngine.client.on('peer-leave', function(evt) {
          //   let stream = evt.stream;
          //   let streamId = String(stream.getId());
          //   stream.close();
          //   console.log('### in this', streamId);
          //   removeUsers(streamId);
          // });
        },
        function(err) {
          console.error('client join failed ', err);
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
    addUsers(streamId) {
      this.usersInRoom = [...this.usersInRoom, streamId];
    },
    removeUsers(id) {
      this.usersInRoom = [...this.usersInRoom].filter(
        (userId) => userId !== id
      );
    },
    updateRtc(rtcEngine) {
      this.rtc = rtcEngine;
    },
    handleButtonClick() {
      if (this.callStarted) {
        this.endCall();
        this.addCurrentUser('');
        this.updateLocalStream(null);
        this.updateRemoteStream(null);
        this.usersInRoom = [];
      } else {
        this.startCall(this.channelId);
      }
    },
    async toggleMic() {
      if (this.audioOn) {
        if (this.rtc.client && this.rtc.localStream) {
          this.rtc.localStream.muteAudio();
        }
        this.audioOn = false;
      } else {
        if (this.rtc.client && this.rtc.localStream) {
          this.rtc.localStream.unmuteAudio();
        }
        this.audioOn = true;
      }
    },
    async toggleCamera() {
      if (this.cameraOn) {
        if (this.rtc.client && this.rtc.localStream) {
          this.rtc.localStream.muteVideo();
        }
        this.cameraOn = false;
      } else {
        if (this.rtc.client && this.rtc.localStream) {
          this.rtc.localStream.unmuteVideo();
        }
        this.cameraOn = true;
      }
    },
    updateRemoteStream(rStream) {
      this.remoteStream = rStream;
    },
    updateLocalStream(lStream) {
      this.localStream = lStream;
    },
    addCurrentUser(cUser) {
      this.currentUser = cUser;
    }
  },
  props: ['channelId', 'channelName'],
  updated() {
    if (this.currentUser.length > 0) {
      this.localStream.play(this.currentUser.toString());
    }
    if (this.usersInRoom.length > 0) {
      this.usersInRoom.forEach((userId) => {
        this.remoteStream.play(userId);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#remote-container {
  height: 650px;
  position: relative;
  border: solid 5px #3eb37f;
  border-radius: 20px;
  display: flex;
  width: 90%;
  flex-direction: column;
  overflow: auto;
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
.room-name {
  color: #3eb37f;
  font-family: 'Google Sans Display', Roboto, Arial, sans-serif;
  font-size: 20px;
  text-transform: capitalize;
}
.users-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 15px;
  z-index: 999;
  overflow-y: scroll;
  height: 600px;
}
.user-picture {
  transform: rotateY(180deg);
  height: 200px;
  width: 200px;
}
.current-user-picture {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

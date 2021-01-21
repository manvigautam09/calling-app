<template>
  <div class="home-container">
    <div class="page-title">Enjoy Your Meetings</div>
    <div class="meetings-section">
      <label class="room-name-label">Enter Room Name</label>
      <input class="input-for-room-name" v-model="roomName" />
      <button
        class="start-room-button"
        :disabled="isButtonDisabled"
        @click="handleButtonClick"
      >
        Start a new meeting
      </button>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Home",
  data() {
    return {
      roomName: "",
    };
  },
  computed: {
    isButtonDisabled() {
      if (this.roomName.length === 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    handleButtonClick() {
      this.$router.push(`/room/${this.roomName}/${uuidv4()}`);
    },
  },
};
</script>
<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  height: 97vh;
}
.page-title {
  color: #00796b;
  font-family: "Google Sans Display", Roboto, Arial, sans-serif;
  font-size: 20px;
}
.disable {
  cursor: pointer;
}
.meetings-section {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
}
.room-name-label {
  font-family: "Google Sans Display", Roboto, Arial, sans-serif;
  font-size: 2.75rem;
  font-weight: 300;
  letter-spacing: 0;
  padding-bottom: 0.2em;
}
.input-for-room-name {
  height: 30px;
  outline: #00796b;
  color: #00796b;
  font-family: "Google Sans Display", Roboto, Arial, sans-serif;
  font-size: 20px;
}
.start-room-button {
  background-color: #00796b;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #ffffff;
}
</style>

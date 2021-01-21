<template>
  <Channel :channelName="$route.params.roomName" />
</template>
<script>
import Channel from "../../components/Channel";

export default {
  name: "Room",
  components: {
    Channel,
  },
};
</script>

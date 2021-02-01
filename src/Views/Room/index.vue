<template>
  <Channel
    :channelName="$route.params.roomName"
    :channelId="$route.params.id"
  />
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

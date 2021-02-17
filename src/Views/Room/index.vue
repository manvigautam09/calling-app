<template>
  <Channel :channelId="$route.params.id" />
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

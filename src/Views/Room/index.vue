<template>
  <Channel
    :channelId="$route.params.id"
    :channelName="$route.params.roomName"
  />
</template>
<script>
import Channel from '../../components/Channel';

export default {
  name: 'Room',
  components: {
    Channel
  }
};
</script>

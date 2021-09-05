<script>
  import {onMount} from 'svelte';
  import Video from 'twilio-video';
  import Participant from './Participant.svelte';
  import Sidebar from './Sidebar.svelte';
  import StreamControls from './StreamControls.svelte';
  import VideoGrid from './VideoGrid.svelte';

  export let token;
  export let roomName;
  export let destroyToken;

  let room = null;
  let participants = [];

  const disconnect = () => {
    if (room) {
      room.removeAllListeners();
      room.disconnect();
      room = null;
      participants = [];
    }
  };

  const leaveRoom = () => {
    disconnect();
    destroyToken();
  };

  const handleControlClick = ({detail}) => {
    switch (detail.kind) {
      case 'microphone':
        room.localParticipant.audioTracks.forEach(track =>
          track.isEnabled ? track.disable() : track.enable()
        );
        break;
      case 'video':
        room.localParticipant.videoTracks.forEach(track =>
          track.isEnabled ? track.disable() : track.enable()
        );
        break;
      case 'hangup':
        leaveRoom();
        break;
    }
  };

  onMount(async () => {
    room = await Video.connect(token, {name: roomName});
    participants = Array.from(room.participants.values());
    room.on('participantConnected', participant => {
      participants = [...participants, participant];
    });
    room.on('participantDisconnected', participant => {
      participants = participants.filter(p => p !== participant);
    });
    return () => {
      disconnect();
    };
  });
</script>

{#if room}
  <div class="grid h-full grid-cols-3 gap-12 p-6 bg-gray-900">
    <div class="col-span-2 space-y-8" style="height: 90%;">
      <VideoGrid layout="sidebar">
        <!-- Local participant -->
        <Participant participant={room.localParticipant} muted={true} />

        <!-- Remote participants -->
        {#each participants as participant}
          <Participant {participant} />
        {/each}
      </VideoGrid>

      <StreamControls on:click={handleControlClick} />
    </div>

    <Sidebar />
  </div>
{/if}

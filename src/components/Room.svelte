<script>
  import {onMount} from 'svelte';
  import Video from 'twilio-video';
  import Participant from './Participant.svelte';

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

{#if room !== null}
  <button on:click={leaveRoom}>Leave room</button>

  <div class="container pt-12">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 justify-items-center">
      <Participant participant={room.localParticipant} />

      {#each participants as participant}
        <Participant {participant} />
      {/each}
    </div>
  </div>
{/if}

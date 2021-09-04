<script>
  import {onMount} from 'svelte';
  import Video from 'twilio-video';
  import Participant from './Participant.svelte';
  import Sidebar from './Sidebar.svelte';
  import StreamControls from './StreamControls.svelte';

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
        break;
      case 'video':
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

{#if room !== null}
  <!-- <button on:click={leaveRoom}>Leave room</button> -->

  <div class="grid h-full grid-cols-3 gap-12 p-6 bg-gray-900">
    <div class="h-full col-span-2">
      <div class="relative mb-12" style="height: 80vh;">
        <Participant participant={room.localParticipant} />

        <div class="absolute border-4 border-white top-4 right-4 rounded-2xl">
          {#each participants as participant}
            <div class="w-48 h-48">
              <Participant {participant} />
            </div>
          {/each}
        </div>
      </div>

      <StreamControls on:click={handleControlClick} />
    </div>

    <Sidebar />
  </div>
{/if}

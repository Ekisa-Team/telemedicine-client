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
  <!-- <button on:click={leaveRoom}>Leave room</button> -->

  <div class="grid h-full grid-cols-3 gap-12 p-6">
    <div class="relative col-span-2" style="height: 80vh;">
      <Participant participant={room.localParticipant} />

      <div class="absolute border-4 border-white top-4 right-4 rounded-2xl">
        {#each participants as participant}
          <div class="w-48 h-48">
            <Participant {participant} />
          </div>
        {/each}
      </div>

      <nav
        class="absolute flex items-center justify-center w-full px-24 space-x-6 transform -translate-x-1/2 bottom-24 left-1/2"
      >
        <button
          class="bg-white bg-opacity-25 rounded-full h-14 w-14 backdrop-blur-lg backdrop-filter"
        >
          <i class="text-2xl text-white uil uil-microphone" />
        </button>
        <button class="w-16 h-16 bg-red-400 rounded-full hover:bg-red-500">
          <i class="text-2xl text-white uil uil-times" />
        </button>
        <button
          class="bg-white bg-opacity-25 rounded-full h-14 w-14 backdrop-blur-lg backdrop-filter"
        >
          <i class="text-2xl text-white uil uil-video" />
        </button>
      </nav>
    </div>

    <aside class="grid bg-gray-100 rounded-2xl place-items-center">
      <div class="flex flex-col items-center">
        <i class="mb-4 text-5xl text-blue-500 uil uil-comment-info" />
        <span class="font-semibold ">Espacio de trabajo</span>
      </div>
    </aside>
  </div>
{/if}

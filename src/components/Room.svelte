<script>
  import {onMount} from 'svelte';
  import Video from 'twilio-video';
  import Participant from './Participant.svelte';
  import Sidebar from './Sidebar.svelte';
  import StreamControl from './StreamControl.svelte';
  import StreamControls from './StreamControls.svelte';
  import VideoGrid from './VideoGrid.svelte';

  export let token;
  export let roomName;
  export let enterWithVideo;
  export let enterWithAudio;
  export let destroyToken;

  let room = null;
  let participants = [];

  let video = {enabled: true};
  let audio = {enabled: true};

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

  const handleControlClick = kind => {
    switch (kind) {
      case 'audio':
        room.localParticipant.audioTracks.forEach(track => {
          if (track.isEnabled) {
            track.disable();
            audio.enabled = false;
          } else {
            track.enable();
            audio.enabled = true;
          }
        });
        break;
      case 'video':
        room.localParticipant.videoTracks.forEach(track => {
          if (track.isEnabled) {
            track.disable();
            video.enabled = false;
          } else {
            track.enable();
            video.enabled = true;
          }
        });
        break;
      case 'hangup':
        leaveRoom();
        break;
    }
  };

  onMount(async () => {
    video.enabled = enterWithVideo;
    audio.enabled = enterWithAudio;

    room = await Video.connect(token, {name: roomName});

    participants = Array.from(room.participants.values());

    room.on('participantConnected', participant => {
      if (confirm(`${participant.identity} quiere conectarse.`)) {
        participants = [...participants, participant];
      }
    });

    room.on('participantDisconnected', participant => {
      participants = participants.filter(p => p !== participant);
    });

    return () => {
      leaveRoom();
    };
  });
</script>

{#if room}
  <div class="grid h-full grid-cols-3 gap-12 p-6 bg-gray-900">
    <div class="col-span-2 space-y-8" style="height: 90%;">
      <VideoGrid layout="sidebar">
        <!-- Local participant -->
        <Participant
          participant={room.localParticipant}
          muted={true}
          {enterWithVideo}
          {enterWithAudio}
        />

        <!-- Remote participants -->
        {#each participants as participant}
          <Participant {participant} />
        {/each}
      </VideoGrid>

      <StreamControls on:click={handleControlClick}>
        <svelte:fragment slot="left" />
        <svelte:fragment slot="center">
          <StreamControl
            icon={audio.enabled ? 'uil uil-microphone' : 'uil uil-microphone-slash'}
            cssClass={!audio.enabled ? 'bg-red-500' : ''}
            on:click={() => handleControlClick('audio')}
          />

          <StreamControl
            icon={video.enabled ? 'uil uil-video' : 'uil uil-video-slash'}
            cssClass={!video.enabled ? 'bg-red-500' : ''}
            on:click={() => handleControlClick('video')}
          />
          <StreamControl
            icon="uil-phone-times"
            cssClass="w-20 h-12 bg-red-500 hover:bg-red-400"
            on:click={() => handleControlClick('hangup')}
          />
        </svelte:fragment>
        <svelte:fragment slot="right" />
      </StreamControls>
    </div>

    <Sidebar />
  </div>
{/if}

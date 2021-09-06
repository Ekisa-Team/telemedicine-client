<script>
  import {onDestroy, onMount} from 'svelte';
  import {navigate} from 'svelte-navigator';
  import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'sveltestrap';
  import Video from 'twilio-video';
  import Participant from './Participant.svelte';
  import Sidebar from './Sidebar.svelte';
  import StreamControl from './StreamControl.svelte';
  import StreamControls from './StreamControls.svelte';
  import CopyToClipboard from './utils/CopyToClipboard.svelte';
  import VideoGrid from './VideoGrid.svelte';

  export let token;
  export let roomName;
  export let isHost;
  export let enterWithVideo;
  export let enterWithAudio;
  export let destroyToken;

  let room = null;
  let participants = [];

  let video = {enabled: true};
  let audio = {enabled: true};

  let copyDropDownOpen = false;
  // let confirmDialogOpen = false;
  // let tempParticipant = null;
  // let tempIdentity = null;

  onMount(async () => {
    video.enabled = enterWithVideo;
    audio.enabled = enterWithAudio;

    console.log('inputs', {
      token,
      roomName,
      isHost,
      enterWithVideo,
      enterWithAudio,
      destroyToken
    });

    room = await Video.connect(token, {name: roomName});

    participants = Array.from(room.participants.values());

    room.on('participantConnected', participant => {
      participants = [...participants, participant];

      // tempParticipant = participant;
      // tempIdentity = getParticipantName(participant.identity);
      // confirmDialogOpen = true;
    });

    room.on('participantDisconnected', participant => {
      participants = participants.filter(p => p !== participant);
    });
  });

  onDestroy(() => {
    disconnect();
  });

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
    navigate('/');
  };

  // const handleCallAnswer = ({detail}) => {
  //   const {accepted} = detail;

  //   if (accepted) {
  //     participants = [...participants, tempParticipant];
  //   }

  //   tempParticipant = null;
  //   tempIdentity = null;
  // };

  const copyRoom = selection => {
    let dataToCopy = '';

    if (selection === 'code') {
      dataToCopy = roomName;
    } else if (selection === 'link') {
      dataToCopy = `${window.location.origin}${window.location.pathname}?roomName=${roomName}`;
    }

    const clipboard = new CopyToClipboard({
      target: document.querySelector('#clipboard'),
      props: {name: dataToCopy}
    });

    clipboard.$destroy();
  };

  const handleControlClick = kind => {
    switch (kind) {
      case 'copy':
        copyRoomName();
        break;
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
</script>

{#if room}
  <div class="grid h-full grid-cols-3 gap-12 p-6 bg-gray-900">
    <div class="col-span-2 space-y-8" style="height: 90%;">
      <VideoGrid layout="sidebar">
        <!-- Local participant -->
        <Participant
          participant={room.localParticipant}
          isLocal={true}
          {enterWithVideo}
          {enterWithAudio}
        />

        <!-- Remote participants -->
        {#each participants as participant}
          <Participant {participant} />
        {/each}
      </VideoGrid>

      <StreamControls on:click={handleControlClick}>
        <svelte:fragment slot="left">
          <Dropdown
            direction="up"
            isOpen={copyDropDownOpen}
            toggle={() => (copyDropDownOpen = !copyDropDownOpen)}
          >
            <DropdownToggle tag="div" class="inline-block">
              <StreamControl icon="uil uil-copy" text="Copiar" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem on:click={() => copyRoom('code')}>Código de la reunión</DropdownItem>
              <DropdownItem on:click={() => copyRoom('link')}>Vínculo de la reunión</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </svelte:fragment>

        <svelte:fragment slot="center">
          <StreamControl
            icon={audio.enabled ? 'uil uil-microphone' : 'uil uil-microphone-slash'}
            type={audio.enabled ? 'normal' : 'danger'}
            size="md"
            on:click={() => handleControlClick('audio')}
          />

          <StreamControl
            icon={video.enabled ? 'uil uil-video' : 'uil uil-video-slash'}
            type={video.enabled ? 'normal' : 'danger'}
            size="md"
            on:click={() => handleControlClick('video')}
          />
        </svelte:fragment>

        <svelte:fragment slot="right">
          <StreamControl
            icon="uil-phone-times"
            type="danger"
            text="Salir"
            on:click={() => handleControlClick('hangup')}
          />
        </svelte:fragment>
      </StreamControls>
    </div>

    <Sidebar />
  </div>

  <!-- <ConfirmDialog open={confirmDialogOpen} identity={tempIdentity} on:answer={handleCallAnswer} /> -->
{/if}

<div id="clipboard" />

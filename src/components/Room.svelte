<script>
  import {onDestroy, onMount} from 'svelte';
  import {navigate} from 'svelte-navigator';
  import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Tooltip} from 'sveltestrap';
  import Video from 'twilio-video';
  import Participant from './Participant.svelte';
  import Sidebar from './Sidebar.svelte';
  import StreamControl from './StreamControl.svelte';
  import StreamControls from './StreamControls.svelte';
  import VideoGrid from './VideoGrid.svelte';

  export let token;
  export let roomName;
  export let isHost;
  export let enterWithVideo;
  export let enterWithAudio;
  export let remoteUrl;
  export let destroyToken;

  let room = null;
  let participants = [];

  let video = {enabled: true};
  let audio = {enabled: true};

  let copyDropDownOpen = false;
  let copyTooltipOpen = false;
  let copyTooltipText = '';

  let isSidebarOpen = false;

  onMount(async () => {
    video.enabled = enterWithVideo;
    audio.enabled = enterWithAudio;

    room = await Video.connect(token, {name: roomName});

    participants = Array.from(room.participants.values());

    room.on('participantConnected', participant => {
      participants = [...participants, participant];
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

  /**
   * Implementa funcionalidad para copiar un valor al clipboard
   * @param selection code | link
   */
  const copyRoom = selection => {
    // Establece el valor a copiar dependiendo de la selección
    let dataToCopy = '';

    switch (selection) {
      case 'code':
        dataToCopy = roomName;
        copyTooltipText = '¡Código copiado!';
        break;
      case 'link':
        dataToCopy = `${window.location.origin}${window.location.pathname}?roomName=${roomName}`;
        copyTooltipText = '¡Vínculo copiado!';
        break;
    }

    // Copia el código / link al clipboard y muestra / oculta tooltip
    navigator.clipboard.writeText(dataToCopy).then(() => {
      copyTooltipOpen = true;

      setTimeout(() => {
        copyTooltipOpen = false;
        copyTooltipText = '';
      }, 3000);
    });
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
  <div class="h-full p-6 bg-gray-900">
    <div class="mb-4" style="height: 92%;">
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
    </div>

    <StreamControls on:click={handleControlClick}>
      <svelte:fragment slot="left">
        <Dropdown
          id="copy-button"
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

        {#if copyTooltipOpen}
          <Tooltip target="copy-button" placement="top" bind:isOpen={copyTooltipOpen}>
            {copyTooltipText}
          </Tooltip>
        {/if}
      </svelte:fragment>

      <svelte:fragment slot="center">
        <StreamControl
          icon={audio.enabled ? 'uil uil-microphone' : 'uil uil-microphone-slash'}
          tooltip={audio.enabled ? 'Desactivar micrófono' : 'Activar micrófono'}
          type={audio.enabled ? 'normal' : 'danger'}
          size="md"
          on:click={() => handleControlClick('audio')}
        />

        <StreamControl
          id="video-control"
          icon={video.enabled ? 'uil uil-video' : 'uil uil-video-slash'}
          tooltip={video.enabled ? 'Desactivar cámara' : 'Activar cámara'}
          type={video.enabled ? 'normal' : 'danger'}
          size="md"
          on:click={() => handleControlClick('video')}
        />

        <StreamControl
          icon="uil-phone-times"
          type="danger"
          text="Salir"
          on:click={() => handleControlClick('hangup')}
        />
      </svelte:fragment>

      <svelte:fragment slot="right">
        {#if isHost}
          <StreamControl
            id="clinic-history"
            icon="uil uil-file-medical"
            text="Ver historia clínica"
            on:click={() => (isSidebarOpen = true)}
          />
        {/if}
      </svelte:fragment>
    </StreamControls>

    {#if isHost && remoteUrl}
      <Sidebar bind:isOpen={isSidebarOpen}>
        <iframe src={remoteUrl} title="Ekisa web page" class="w-full h-full rounded-2xl" />
      </Sidebar>
    {/if}
  </div>
{/if}

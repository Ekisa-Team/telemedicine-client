<script>
  import {onMount} from 'svelte';
  import {getParticipantName} from '../utils/room.utils';

  export let participant;
  export let isLocal;
  export let enterWithVideo;
  export let enterWithAudio;

  let videoElement;
  let audioElement;
  let videoTrack = null;
  let audioTrack = null;

  const trackSubscribed = track => {
    if (track.kind === 'video') {
      videoTrack = track;
      track.attach(videoElement);
    } else {
      audioTrack = track;
      track.attach(audioElement);
    }
  };

  const trackUnsubscribed = track => {
    if (track.kind === 'video' && track === videoTrack) {
      videoTrack.detach();
      videoTrack = null;
    } else {
      audioTrack.detach();
      audioTrack = null;
    }
  };

  onMount(() => {
    videoTrack = Array.from(participant.videoTracks.values())[0];
    if (typeof videoTrack !== 'undefined') {
      videoTrack.attach(videoElement);
      enterWithVideo ? videoTrack.enable() : videoTrack.disable();
    }

    audioTrack = Array.from(participant.audioTracks.values())[0];
    if (typeof audioTrack !== 'undefined') {
      audioTrack.attach(audioElement);
      enterWithAudio ? audioTrack.enable() : audioTrack.disable();
    }

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      participant.removeAllListeners();

      if (videoTrack) {
        videoTrack.detach();
        videoTrack = null;
      }
      if (audioTrack) {
        audioTrack.detach();
        audioTrack = null;
      }
    };
  });
</script>

<div class="relative w-full h-full overflow-hidden rounded-2xl" class:local-participant={isLocal}>
  <video
    bind:this={videoElement}
    muted={isLocal}
    class="absolute inset-0 object-fill w-full h-full"
  />
  <audio bind:this={audioElement} />
  <span
    class="absolute px-6 py-2 font-semibold text-white bg-white bg-opacity-25 rounded-full shadow-2xl lg:bottom-2 left-2 backdrop-blur-lg backdrop-filter"
  >
    {#if isLocal}
      Tú
    {:else}
      {getParticipantName(participant.identity)}
    {/if}
  </span>
</div>

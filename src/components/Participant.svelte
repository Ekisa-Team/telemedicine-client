<script>
  import {onMount} from 'svelte';
  import {RoomUtils} from './../utils/room.utils.js';

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
    class="absolute px-4 py-2 overflow-hidden font-semibold text-white bg-blue-600 rounded-full left-4 top-4 overflow-ellipsis whitespace-nowrap"
    style="max-width: 150px;"
  >
    {RoomUtils.getParticipantName(participant.identity)}
  </span>
</div>

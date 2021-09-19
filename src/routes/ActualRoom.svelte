<script>
  import queryString from 'query-string';
  import {onMount} from 'svelte';
  import Loading from './../components/Loading.svelte';
  import Room from './../components/Room.svelte';

  let queryParams;
  $: queryParams = queryString.parse(window.location.search);

  let token = null;
  let roomName = null;
  let isHost = null;
  let enterWithVideo = false;
  let enterWithAudio = false;

  onMount(async () => {
    const url = `https://telemedicine-twilio-server.herokuapp.com/api/token-service?identity=${queryParams.identity}`;
    const res = await fetch(url);
    const {accessToken} = await res.json();

    setTimeout(() => {
      token = accessToken;
      roomName = queryParams.roomName;
      isHost = queryParams.isHost && JSON.parse(queryParams.isHost);
      enterWithVideo = JSON.parse(queryParams.enterWithVideo);
      enterWithAudio = JSON.parse(queryParams.enterWithAudio);
    }, 1000);
  });

  const destroyToken = () => {
    token = null;
  };
</script>

{#if token}
  <Room {token} {roomName} {isHost} {enterWithVideo} {enterWithAudio} {destroyToken} />
{:else}
  <Loading text="Ingresando a la reunión..." />
{/if}

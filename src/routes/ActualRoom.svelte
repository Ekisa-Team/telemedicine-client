<script>
  import queryString from 'query-string';
  import {onMount} from 'svelte';
  import {useParams} from 'svelte-navigator';
  import Room from './../components/Room.svelte';

  let queryParams;
  $: queryParams = queryString.parse(window.location.search);

  const params = useParams();

  let token = null;
  let roomName = null;
  let enterWithVideo = false;
  let enterWithAudio = false;

  onMount(async () => {
    const url = `https://telemedicine-twilio-server.herokuapp.com/api/token-service?identity=${queryParams.identity}`;
    const res = await fetch(url);
    const {accessToken} = await res.json();

    token = accessToken;
    roomName = $params.roomName;
    enterWithVideo = JSON.parse(queryParams.enterWithVideo);
    enterWithAudio = JSON.parse(queryParams.enterWithAudio);
  });

  const destroyToken = () => {
    token = null;
  };
</script>

{#if token}
  <Room {token} {roomName} {enterWithVideo} {enterWithAudio} {destroyToken} />
{/if}

<script>
  import JoinRoom from '../components/JoinRoom.svelte';
  import Header from './../components/Header.svelte';
  import Room from './../components/Room.svelte';
  import WavesShape from './../components/WavesShape.svelte';

  let roomName = 'test-room';
  let enterWithVideo = true;
  let enterWithAudio = true;
  let token = null;

  const handleJoin = async ({detail}) => {
    enterWithVideo = detail.enterWithVideo;
    enterWithAudio = detail.enterWithAudio;

    const newIdentity = `${detail.identity}-${Math.random()}`;

    const url = `https://telemedicine-twilio-server.herokuapp.com/api/token-service?identity=${newIdentity}`;
    const res = await fetch(url);
    const {accessToken} = await res.json();
    token = accessToken;
  };

  const destroyToken = () => {
    token = null;
  };
</script>

{#if token}
  <Room {token} {roomName} {enterWithVideo} {enterWithAudio} {destroyToken} />
{:else}
  <Header />
  <WavesShape />
  <JoinRoom on:join={handleJoin} />
{/if}

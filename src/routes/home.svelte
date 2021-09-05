<script>
  import Header from './../components/Header.svelte';
  import JoinRoomForm from './../components/JoinRoomForm.svelte';
  import Room from './../components/Room.svelte';
  import WavesShape from './../components/WavesShape.svelte';

  let roomName = '';
  let token = null;

  const handleLogin = async ({detail}) => {
    console.log(detail);
    roomName = detail.roomName;
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
  <Room {token} {roomName} {destroyToken} />
{:else}
  <Header />
  <WavesShape />
  <JoinRoomForm on:login={handleLogin} />
{/if}

<script>
  import Header from './../components/Header.svelte';
  import JoinRoomForm from './../components/JoinRoomForm.svelte';
  import WavesShape from './../components/WavesShape.svelte';

  let token = null;

  const handleSubmit = async ({identity, roomName}) => {
    const url = `https://telemedicine-twilio-server.herokuapp.com/api/token-service?identity=${identity}`;
    const res = await fetch(url);
    const {accessToken} = await res.json();
    token = accessToken;
  };

  const destroyToken = () => {
    token = null;
  };
</script>

{#if token}
  <!-- <Room {token} {roomName} {destroyToken} /> -->
{:else}
  <Header />
  <WavesShape />
  <JoinRoomForm on:submit={handleSubmit} />
{/if}

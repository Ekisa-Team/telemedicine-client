<script>
	import Room from './components/Room.svelte';

  


  let identity = ''
  let roomName = ''
  let token = null

  const handleSubmit = async () => {
    const url = `https://telemedicine-twilio-server.herokuapp.com/api/token-service?identity=${identity}`
    const res = await fetch(url)
    const { accessToken } = await res.json()
    token = accessToken    
  }

  const destroyToken = () => {
    token = null
  }
</script>

{#if token}
  <Room {token} {roomName} {destroyToken} />
{:else}
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="identity">Username:</label>
      <input name="identity" id="identity" type="text" required bind:value={identity} />
    </div>
    <div>
      <label for="room-name">Room name:</label>
      <input name="room-name" id="identity" type="text" required bind:value={roomName} />
    </div>

    <button type="submit">Log in</button>
  </form>
{/if}

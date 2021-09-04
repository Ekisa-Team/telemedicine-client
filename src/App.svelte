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

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    html {
      @apply font-body;
      @apply font-light;
    }

    h1,
    .h1,
    h2,
    .h2,
    h3,
    .h3,
    h4,
    .h4,
    h5,
    .h5,
    h6,
    .h6,
    .display-1,
    .display-2,
    .display-3,
    .display-4 {
      @apply font-display;
      @apply font-bold;
      @apply mt-0;
    }

    h1,
    .h1 {
      @apply text-4xl;
      @apply mb-12;
    }

    h2,
    .h2 {
      @apply text-3xl;
      @apply mb-10;
    }

    h3,
    .h3 {
      @apply text-2xl;
      @apply mb-8;
    }

    h4,
    .h4 {
      @apply text-xl;
      @apply mb-6;
    }

    h5,
    .h5 {
      @apply text-lg;
      @apply mb-4;
    }

    h6,
    .h6 {
      @apply text-base;
      @apply mb-2;
    }

    .display-1 {
      @apply text-8xl;
      @apply mb-32;
    }

    .display-2 {
      @apply text-7xl;
      @apply mb-24;
    }

    .display-3 {
      @apply text-6xl;
      @apply mb-20;
    }

    .display-4 {
      @apply text-5xl;
      @apply mb-16;
    }
  }
</style>
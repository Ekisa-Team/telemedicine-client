<script>
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  let identity = '';
  let roomName = '';

  const handleSubmit = () => {
    dispatch('login', {
      identity,
      roomName
    });
  };
</script>

<div class="container">
  <div
    class="z-10 flex flex-col max-w-xl py-12 mx-auto space-y-12 text-center lg:transform lg:-translate-x-1/2 lg:absolute lg:top-1/3 lg:px-8 lg:bg-white lg:shadow-2xl lg:left-1/2"
  >
    <h1 class="mb-2">Lorem ipsum dolor</h1>

    <p class="text-justify text-gray-500">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore esse odio
      iusto non amet quae laborum nulla repellendus pariatur officiis sit illum
      nobis odit ad, natus laudantium quis unde voluptatibus.
    </p>

    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="identity">Username:</label>
        <input
          name="identity"
          id="identity"
          type="text"
          required
          bind:value={identity}
        />
      </div>
      <div>
        <label for="room-name">Room name:</label>
        <input
          name="room-name"
          id="identity"
          type="text"
          required
          bind:value={roomName}
        />
      </div>

      <button type="submit">Log in</button>
    </form>
  </div>
</div>

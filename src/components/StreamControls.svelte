<script>
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  const handleControlClick = kind => dispatch('click', {kind});
</script>

<nav class="flex items-center justify-center w-full space-x-4">
  <button
    class="w-12 h-12 bg-gray-400 bg-opacity-25 rounded-full backdrop-blur-lg backdrop-filter"
    on:click={() => handleControlClick('microphone')}
  >
    <i class="text-2xl text-white uil uil-microphone" />
  </button>
  <button
    class="w-12 h-12 bg-gray-400 bg-opacity-25 rounded-full backdrop-blur-lg backdrop-filter"
    on:click={() => handleControlClick('video')}
  >
    <i class="text-2xl text-white uil uil-video" />
  </button>
  <button
    class="w-20 h-12 bg-red-500 rounded-full hover:bg-red-500"
    on:click={() => handleControlClick('hangup')}
  >
    <i class="text-2xl text-white uil uil-phone-times" />
  </button>
</nav>

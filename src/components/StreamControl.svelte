<script>
  import {createEventDispatcher} from 'svelte';

  export let icon = '';
  export let cssClass = '';

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('click');
  };
</script>

<button
  class="w-12 h-12 bg-gray-700 rounded-full {cssClass}"
  on:click={handleClick}
>
  <i class="text-2xl text-white {icon}" />
</button>

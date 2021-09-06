<script>
  import {createEventDispatcher} from 'svelte';

  export let icon = '';
  export let text = '';
  export let type = 'normal';
  export let size = 'auto';
  export let cssClass = '';

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('click');
  };
</script>

<button
  class="inline-flex justify-center space-x-2  items-center h-12 rounded-full {cssClass}"
  class:type-normal={type === 'normal'}
  class:type-danger={type === 'danger'}
  class:size-auto={size === 'auto'}
  class:size-md={size === 'md'}
  class:size-lg={size === 'lg'}
  on:click={handleClick}
>
  {#if icon}
    <i class="text-2xl text-white {icon}" />
  {/if}

  {#if text}
    <span class="ml-2 text-sm font-semibold text-white">{text}</span>
  {/if}
</button>

<style lang="postcss">
  .type-normal {
    @apply bg-gray-700;
  }
  .type-normal:hover {
    @apply bg-gray-600;
  }
  .type-danger {
    @apply bg-red-500;
  }
  .type-danger:hover {
    @apply bg-red-400;
  }
  .size-auto {
    @apply w-auto px-3;
  }
  .size-md {
    @apply w-12;
  }
  .size-lg {
    @apply w-16 h-12;
  }
</style>

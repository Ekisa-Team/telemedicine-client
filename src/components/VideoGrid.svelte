<script>
  export let layout = 'sidebar';
</script>

<div id="video-grid" class={layout}>
  <slot />
</div>

<style lang="postcss">
  #video-grid.sidebar {
    @apply h-full;
    @apply relative;
  }

  #video-grid.sidebar > :global(div:first-child:not(:only-child)) {
    @apply absolute top-4 right-4;
    @apply w-48 h-44;
    @apply border-2 border-white;
    @apply z-10;
    @apply transition-all ease-in duration-500;
  }
</style>

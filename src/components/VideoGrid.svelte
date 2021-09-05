<script>
  export let layout = 'sidebar';
</script>

<div id="video-grid" class={layout}>
  <slot />
</div>

<style>
  #video-grid.sidebar {
    @apply h-full;
    @apply relative;
  }

  #video-grid.sidebar > :global(div:first-child) {
    @apply absolute;
    @apply top-4;
    @apply right-4;
    @apply w-48;
    @apply h-44;
    @apply border-2;
    @apply border-white;
    @apply z-10;
  }
</style>

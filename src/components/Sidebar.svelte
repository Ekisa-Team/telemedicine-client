<script>
  export let isOpen = false;
</script>

<aside
  class="fixed inset-y-0 z-40 w-full bg-gray-900 left-full bg-opacity-70 backdrop-filter backdrop-blur-lg"
  class:open={isOpen}
>
  <div class="relative w-full h-full ">
    <div class="container h-full pb-12 pt-28 md:pt-12">
      <slot />
    </div>

    <button
      class="absolute top-6 right-6 hover:animate-spin focus:animate-ping"
      on:click={() => (isOpen = false)}
    >
      <i class="text-6xl text-white uil uil-times " />
    </button>
  </div>
</aside>

<style>
  aside {
    transform: translate(100%, 100%) rotate(-90deg);
    transition: transform 800ms ease-out, border-radius 800ms ease-out 400ms;
    border-top-left-radius: 50%;
    will-change: transform, border-radius;
  }
  aside.open {
    transform: translate(-100%) rotate(0);
    border-top-left-radius: 0;
  }
</style>

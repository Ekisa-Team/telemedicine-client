<script>
  import {onMount} from 'svelte';
  import {TextUtils} from './../utils/text.utils.js';

  export let name = '';
  export let size = 'md';
  export let type = 'primary';

  let initials = '';

  onMount(() => {
    initials = TextUtils.normalize({text: name, letterCase: 'uppercase', separator: ' '})
      .split(' ')
      .map(t => t[0])
      .slice(0, 2)
      .join('');
  });
</script>

<div class="avatar {size} {type}">{initials}</div>

<style lang="postcss">
  .avatar {
    @apply inline-flex items-center justify-center;
    @apply text-white;
    @apply bg-gray-800;
    @apply rounded-full;
    @apply select-none;
  }

  .avatar.xs {
    @apply w-8 h-8;
    @apply text-xs;
  }

  .avatar.sm {
    @apply w-12 h-12;
    @apply text-xl;
  }

  .avatar.md {
    @apply w-16 h-16;
    @apply text-2xl;
  }

  .avatar.lg {
    @apply w-24 h-24;
    @apply text-4xl;
  }

  .avatar.xl {
    @apply w-36 h-36;
    @apply text-6xl;
  }

  .avatar.primary {
    @apply bg-blue-800;
  }

  .avatar.success {
    @apply bg-green-800;
  }

  .avatar.info {
    @apply bg-purple-800;
  }

  .avatar.warning {
    @apply bg-yellow-800;
  }

  .avatar.danger {
    @apply bg-red-800;
  }
</style>

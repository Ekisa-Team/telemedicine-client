<script>
  import {Route, Router} from 'svelte-navigator';
  import ActualRoom from './routes/ActualRoom.svelte';
  import Home from './routes/Home.svelte';
  import PreJoin from './routes/PreJoin.svelte';
</script>

<Router>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/pre-join">
    <PreJoin />
  </Route>
  <Route path="/room/:roomName">
    <ActualRoom />
  </Route>
</Router>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  html {
    @apply font-body;
    @apply font-light;
  }

  html,
  body {
    @apply h-full;
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
</style>

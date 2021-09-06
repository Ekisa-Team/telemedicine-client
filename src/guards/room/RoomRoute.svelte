<script>
  import {Route} from 'svelte-navigator';
  import RoomRouteGuard from './RoomRouteGuard.svelte';

  export let path;
</script>

<Route {path} let:params let:location let:navigate>
  <RoomRouteGuard>
    <slot {params} {location} {navigate} />
  </RoomRouteGuard>
</Route>

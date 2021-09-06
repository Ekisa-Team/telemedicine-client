<script>
  import queryString from 'query-string';
  import {navigate, useLocation} from 'svelte-navigator';

  const location = useLocation();

  let queryParams;
  $: queryParams = queryString.parse($location.search);

  $: {
    console.log(queryParams);
    if (!queryParams.roomName) {
      navigate('/', {
        state: {from: $location.pathname},
        replace: true
      });
    } else if (!queryParams.identity) {
      navigate(`/pre-join?roomName=${queryParams.roomName}`, {
        state: {from: $location.pathname},
        replace: true
      });
    }
  }
</script>

{#if queryParams.roomName && queryParams.identity}
  <slot />
{/if}

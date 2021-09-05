<script>
  import queryString from 'query-string';
  import {navigate, useParams} from 'svelte-navigator';
  import {v4} from 'uuid';
  import JoinForm from '../components/JoinForm.svelte';

  let queryParams;
  $: queryParams = queryString.parse(window.location.search);

  const params = useParams();

  const handleJoin = async ({detail}) => {
    const isHost = queryParams.isHost ? JSON.parse(queryParams.isHost.toLowerCase()) : false;
    const newIdentity = `${detail.identity}-${Math.random()}`;
    const roomName = $params.roomName ? $params.roomName : v4();

    navigate(
      `/room/${roomName}?isHost=${isHost}&identity=${newIdentity}&enterWithVideo=${detail.enterWithVideo}&enterWithAudio=${detail.enterWithAudio}`
    );
  };
</script>

<div class="container pt-40 text-center">
  <div class="mb-12">
    <h2 class="text-base font-body">Elija su configuración de audio y video para</h2>
    <h1 class="h4">Unirse a la Reunion</h1>
  </div>

  <div class="flex items-end max-w-lg p-6 mx-auto shadow-2xl h-96">
    <JoinForm on:join={handleJoin} />
  </div>
</div>

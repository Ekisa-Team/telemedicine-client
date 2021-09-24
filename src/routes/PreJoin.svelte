<script>
  import queryString from 'query-string';
  import {navigate} from 'svelte-navigator';
  import {v4} from 'uuid';
  import JoinForm from '../components/JoinForm.svelte';

  let queryParams;
  $: queryParams = queryString.parse(window.location.search);

  let acceptsAgreement = false;

  const handleJoin = async ({detail}) => {
    const isHost = queryParams.isHost ? JSON.parse(queryParams.isHost.toLowerCase()) : false;
    const newIdentity = `${detail.identity}-${Math.random()}`;
    const roomName = queryParams.roomName ? queryParams.roomName : v4();

    navigate(
      `/room?roomName=${roomName}&isHost=${isHost}&identity=${newIdentity}&enterWithVideo=${detail.enterWithVideo}&enterWithAudio=${detail.enterWithAudio}`
    );
  };
</script>

<div class="container pt-40 text-center">
  <div class="mb-12">
    <h2 class="text-base font-body">Elija su configuración de audio y video para</h2>
    <h1 class="h4">Unirse a la Reunion</h1>
  </div>

  <div class="mt-20 mb-16">
    <div class="flex items-center justify-center my-6 space-x-6">
      <div class="form-check form-switch">
        <label class="form-check-label" for="acceptsAgreement">
          Acepto los términos y condiciones
        </label>
        <input
          class="form-check-input"
          type="checkbox"
          id="acceptsAgreement"
          bind:checked={acceptsAgreement}
        />
      </div>
    </div>
  </div>

  <JoinForm disabled={!acceptsAgreement} on:join={handleJoin} />
</div>

<script>
  import {createEventDispatcher} from 'svelte';
  import {Button, Input} from 'sveltestrap';

  const dispatch = createEventDispatcher();

  let identity = '';
  let enterWithVideo = true;
  let enterWithAudio = true;

  const handleSubmit = () => {
    dispatch('join', {
      identity,
      enterWithVideo,
      enterWithAudio
    });
  };
</script>

<form on:submit|preventDefault={handleSubmit} class="flex-1">
  <div class="flex items-center">
    <Input placeholder="Ingrese su nombre" type="text" required bind:value={identity} />
  </div>

  <div class="flex items-center justify-center my-6 space-x-6">
    <div class="form-check form-switch">
      <label class="form-check-label" for="enterWithVideo">
        <i class="text-2xl {enterWithVideo ? 'uil uil-video' : 'uil uil-video-slash'}" />
      </label>
      <input
        class="form-check-input"
        type="checkbox"
        id="enterWithVideo"
        bind:checked={enterWithVideo}
      />
    </div>

    <div class="form-check form-switch">
      <label class="form-check-label" for="enterWithVideo">
        <i class="text-2xl {enterWithAudio ? 'uil uil-microphone' : 'uil uil-microphone-slash'}" />
      </label>
      <input
        class="form-check-input"
        type="checkbox"
        id="enterWithVideo"
        bind:checked={enterWithAudio}
      />
    </div>
  </div>

  <Button color="primary" block>¡Unirme ya!</Button>
</form>

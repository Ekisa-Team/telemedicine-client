<script>
  import {createEventDispatcher} from 'svelte';
  import {Button, Input} from 'sveltestrap';

  export let identity = '';
  export let disabled;

  const dispatch = createEventDispatcher();

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

<div
  class="flex items-end h-64 max-w-lg p-6 mx-auto shadow-2xl"
  class:cursor-not-allowed={disabled}
>
  <form on:submit|preventDefault={handleSubmit} class="flex-1">
    <div class="flex items-center">
      <Input
        placeholder="Ingrese su nombre"
        type="text"
        required
        {disabled}
        bind:value={identity}
      />
    </div>

    <div class="flex items-center justify-center my-6 space-x-6">
      <div class="form-check form-switch">
        <label class="form-check-label" for="enterWithVideo">
          <i class="text-2xl {enterWithVideo ? 'uil uil-video' : 'uil uil-video-slash'}" />
        </label>
        <input
          type="checkbox"
          id="enterWithVideo"
          class="form-check-input"
          {disabled}
          bind:checked={enterWithVideo}
        />
      </div>

      <div class="form-check form-switch">
        <label class="form-check-label" for="enterWithVideo">
          <i
            class="text-2xl {enterWithAudio ? 'uil uil-microphone' : 'uil uil-microphone-slash'}"
          />
        </label>
        <input
          type="checkbox"
          id="enterWithVideo"
          class="form-check-input"
          {disabled}
          bind:checked={enterWithAudio}
        />
      </div>
    </div>

    <Button color="primary" block {disabled}>¡Unirme ya!</Button>
  </form>
</div>

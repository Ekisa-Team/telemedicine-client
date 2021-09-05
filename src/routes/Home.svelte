<script>
  import Header from './../components/Header.svelte';  
  import WavesShape from './../components/WavesShape.svelte';
  import {navigate} from 'svelte-navigator';
  import {Button, InputGroup, InputGroupText, Input} from 'sveltestrap';

  const handleNewMeetingClick = () => {
    navigate('/pre-join?isHost=true');
  };
</script>

<Header />
<WavesShape />
<div class="container">
  <div
    class="z-10 flex flex-col max-w-xl py-12 mx-auto space-y-6 text-center lg:transform lg:-translate-x-1/2 lg:absolute lg:top-1/4 lg:px-8 lg:bg-white lg:shadow-2xl lg:left-1/2"
  >
    <h1 class="mb-2">Plataforma de telemedicina</h1>
    <h2 class="my-2 text-blue-700">Fácil y segura</h2>

    <p class="text-justify text-gray-500">
      A continuación elija entre crear una reunión nueva o unirse a su cita designada, ingresando el
      código de la reunión que le proporcionaron.
    </p>

    <Button color="primary" size="lg" on:click={handleNewMeetingClick}>
      <i class="mr-2 text-2xl uil uil-video" />
      Reunión nueva
    </Button>

    <hr />

    <InputGroup>
      <InputGroupText>
        <i class="text-2xl uil uil-keyboard" />
      </InputGroupText>
      <Input placeholder="Ingresa el código de la reunión" size="lg" />
    </InputGroup>
    <Button color="primary" size="lg" outline class="mt-2">
      <i class="text-2xl uil uil-smile" />
      Unirme
    </Button>
  </div>
</div>

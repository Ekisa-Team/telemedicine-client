<script>
  import JoinForm from '../components/JoinForm.svelte';

  const handleJoin = async ({detail}) => {
    console.log(detail);
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

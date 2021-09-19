<script>
  export let text = 'Cargando...';
</script>

<div
  class="fixed z-50 grid w-full h-screen bg-gradient-to-t from-gray-900 to-gray-600 place-items-center"
>
  <div class="flex flex-col items-center justify-center">
    <div class="relative">
      <svg
        class="w-48 h-48 text-green-400 animate-ping"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
        />
      </svg>
    </div>
    <span class="mt-6 text-2xl font-semibold text-white animate-pulse ">{text}</span>
  </div>
</div>

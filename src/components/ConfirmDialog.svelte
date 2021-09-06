<script>
  import {createEventDispatcher} from 'svelte';
  import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'sveltestrap';

  export let open = false;
  export let identity = '';

  const dispatch = createEventDispatcher();

  const toggle = () => (open = !open);

  const handleCall = accepted => {
    dispatch('answer', {accepted});
    toggle();
  };
</script>

<Modal isOpen={open} {toggle}>
  <ModalHeader {toggle}>Llamada entrante</ModalHeader>
  <ModalBody>
    <strong>{identity}</strong> quiere conectarse a la reunión.
  </ModalBody>
  <ModalFooter>
    <Button color="success" on:click={() => handleCall(true)}>Aceptar</Button>
    <Button color="danger" on:click={() => handleCall(false)}>Declinar</Button>
  </ModalFooter>
</Modal>

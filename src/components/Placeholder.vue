<template>
  <div>
    <p> {{ moduleName }} is still under construction</p>
  </div>
</template>

<script>
export default {
  name: 'Placeholder',
  props: ['moduleName'],
};
</script>

<style scoped>
  div{
    padding: 1em;
    border: 1px solid lightblue;
    display: grid;
    place-items: center;
    border-radius: 5px;
  }
</style>

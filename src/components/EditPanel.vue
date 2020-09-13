<template>
  <div class="container">
    <h2>Edit Item {{ itemName }}</h2>
    <div class="panels-container">
      <EditForecast :item="item"/>
      <Placeholder moduleName="Models"/>
      <Placeholder moduleName="Alerts"/>
    </div>
  </div>
</template>

<script>
import EditForecast from './EditForecast.vue';
import Placeholder from './Placeholder.vue';

export default {
  name: 'EditPanel',
  props: ['item'],
  components: {
    EditForecast,
    Placeholder
  },
  computed: {
    itemName() {
      return this.item?.name ?? '';
    }
  }
};
</script>
<style scoped>
 .panels-container{
   display: grid;
   flex-grow: 1;
   grid-template-rows: repeat(3, 1fr);
   grid-gap: 0.5em;
 }

 h2{
   margin: 0;
   padding: 0.8em 0;
 }

 .container{
   display: flex;
   flex-direction: column;
 }
</style>

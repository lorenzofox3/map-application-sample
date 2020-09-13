<template>
  <div id="app">
    <MapContainer id="map-container"/>
    <EditPanel v-if="Boolean(selectedItem)" :item="selectedItem" id="edit-panel"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MapContainer from './components/MapContainer.vue';
import EditPanel from './components/EditPanel.vue';
import zoneService from './services/items.js';

export default {
  name: 'App',
  components: {
    MapContainer,
    EditPanel
  },
  mounted() {
    this.loadData();
  },
  computed:{
    ...mapGetters(['selectedItem'])
  },
  methods: {
    loadData() {
      zoneService.fetchItems();
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  height: 100vh;
  width: 100vw;
}

#edit-panel {
  display: flex;
  position: absolute;
  right: 0;
  background: white;
  height: 100%;
  padding: 1em;
  box-shadow: 0 0 5px 0 #949494;
  min-width: 400px;
}

</style>

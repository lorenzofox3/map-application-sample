<template>
  <mb-geo-map
      @click="handleMapClick"
      @mousemove="handleMousMove"
      :zoom="zoom"
      :center="centerString"
      :mb-style="mbStyle"
      :access-token="mbToken"
  >
    <mb-geo-json-source ref="items-source" source-id="items">
      <mb-geo-fill-layer
          @mouseleave="handleMouseLeave"
          :fill-opacity="style.zones.opacity"
          :fill-color="style.zones.color"
          layer-id="zones-fill"/>
      <mb-geo-line-layer
          :line-color="style.zones.color"
          layer-id="zones-contour"/>
      <mb-geo-circle-layer
          @mouseleave="handleMouseLeave"
          :circle-color="style.zones.color"
          filter="['==','$type','Point']"
          layer-id="points"/>
      <mb-geo-symbol-layer
          :text-color="style.zones.color"
          text-offset="[0, -1]"
          layer-id="zone-name"
          text-size="12"
          text-font="['Open Sans Bold']"
          text-field="['get', 'name']"/>
    </mb-geo-json-source>
  </mb-geo-map>
</template>

<script>
import {mapGetters} from 'vuex';
import itemsService from '../services/items.js';
import {composite} from '../models/items.js';
import {MAP_BOX_STYLE, MAP_BOX_TOKEN} from '../conf.js';
import {centerString, formatMapBoxStyleAttribute, mapIsSelected, selectedItemId} from './MapContainer.computed.js';

export default {
  name: 'MapContainer',
  data() {
    return {
      mbToken: MAP_BOX_TOKEN,
      mbStyle: MAP_BOX_STYLE,
      center: [2.439, 48.078],
      zoom: 6,
      style: {
        zones: {
          opacity: formatMapBoxStyleAttribute(['case', ['boolean', ['feature-state', 'hover'], false], 0.5, 0.3]),
          color: formatMapBoxStyleAttribute(['case', ['get', 'isSelected'], '#ff426f', '#16BCCE'])
        }
      },
      hoveredFeatureId: null
    };
  },
  computed: {
    ...mapGetters(['items', 'selectedItem']),
    centerString() {
      return centerString(this.center);
    },
    selectedItemId() {
      return selectedItemId(this.selectedItem);
    }
  },
  watch: {
    items: {
      handler() {
        this.drawMap();
      }
    },
    selectedItem: {
      handler() {
        this.drawMap();
      }
    }
  },
  methods: {
    handleMapClick(ev) {
      const {target: map} = ev;
      const features = map.queryRenderedFeatures(ev.point, {
        layers: ['zones-fill', 'points']
      });
      const itemId = features?.[0]?.id;
      itemsService.selectItem(itemId);
    },
    handleMousMove(ev) {
      const {target: map} = ev;
      const features = map.queryRenderedFeatures(ev.point, {
        layers: ['zones-fill', 'points']
      });
      if (features.length > 0) {
        if (this.hoveredFeatureId) {
          map.setFeatureState(
              {source: 'items', id: this.hoveredFeatureId},
              {hover: false}
          );
        }
        this.hoveredFeatureId = features[0].id;
        map.setFeatureState(
            {source: 'items', id: this.hoveredFeatureId},
            {hover: true}
        );
        map.getCanvas().style.cursor = 'pointer';
      }
    },
    handleMouseLeave(ev) {
      const {target: map} = ev;
      if (this.hoveredFeatureId) {
        map.setFeatureState(
            {source: 'items', id: this.hoveredFeatureId},
            {hover: false}
        );
      }
      this.hoveredFeatureId = null;
      map.getCanvas().style.cursor = '';
    },
    drawMap() {
      console.count('draw map');
      const source = this.$refs[`items-source`];
      const itemsToDraw = this.items.map(mapIsSelected(this.selectedItemId));
      source.data = composite(...itemsToDraw).toGeoJSON();
    }
  }
};
</script>
<style scoped>
</style>

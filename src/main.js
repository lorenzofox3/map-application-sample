import Vue from 'vue';
import App from './App.vue';
import {CircleLayer, FillLayer, GeoJSONSource, GeoMap, LineLayer, SymbolLayer} from '@citykleta/mb-gl-comp';
import store from './services/store.js';

// load custom elements from @citykleta/mb-gl-comp to have a declarative API on the map
customElements.define('mb-geo-map', GeoMap);
customElements.define('mb-geo-json-source', GeoJSONSource);
customElements.define('mb-geo-fill-layer', FillLayer);
customElements.define('mb-geo-line-layer', LineLayer);
customElements.define('mb-geo-circle-layer', CircleLayer);
customElements.define('mb-geo-symbol-layer', SymbolLayer);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store
}).$mount('#app');

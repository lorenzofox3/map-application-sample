import {test} from 'zora';
import mapContainerComputed from './components/MapContainer.computed.js';
import utils from './utils.js';
import store from './services/store.js';
import items from './models/items.js';

test(`/components/MapContainer.computed.js`, mapContainerComputed);
test(`/utils.js`, utils);
test(`/services/store.js`, store);
test(`/models/items.js`, items);

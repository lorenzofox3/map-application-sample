<template>
  <form @submit.prevent="saveForecast">
    <label>
      <span>Edit forecast</span>
      <textarea v-model="forecastText"></textarea>
    </label>
    <button><span>{{ isProcessing ? 'saving...' : 'save' }}</span></button>
  </form>
</template>

<script>
import forecast from '../services/forecast.js';

export default {
  name: 'EditForecast',
  props: ['item'],
  data() {
    return {
      isProcessing: false,
      forecastText: ''
    };
  },
  watch: {
    item() {
      this.forecastText = '';
    }
  },
  methods: {
    saveForecast() {

      if (!this.forecastText){
        return;
      }

      this.isProcessing = true;
      forecast
          .saveForecastForItem(this.item.id, {
            text: this.forecastText
          })
          .finally(() => this.isProcessing = false);
    }
  }
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr auto;
  grid-gap: 0.5em;
}

label {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

textarea {
  align-self: stretch;
  flex-grow: 1;
  font-family: inherit;
  color: #286bcf;
  padding: 0.5em;
}

button {
  grid-column: 2;
  font-size: 1em;
  padding: 0.5em 1em;
  background: #286bcf;
  color: white;
  border: none;
  border-radius: 5px;
  outline: none;
}

button:focus > span,
button:hover > span {
  text-decoration: underline;
}

</style>

<template>
  <div>
    <h1>Rekursiver DOM-Baum</h1>
    <button @click="increment" id="colorButton" class="colorButton">change color</button>
    <!-- Starte die rekursive Struktur -->
    <RecursiveDomElement :depth="10" :state="state" :currentDepth="0" />
  </div>
</template>

<script>
import RecursiveDomElement from "./components/RecursiveDomElement.vue";

export default {
  components: {
    RecursiveDomElement,
  },
  data() {
    return {
      state: 0,
    };
  },
  methods: {
    increment() {
      this.state++;
    },
  },
};
</script>

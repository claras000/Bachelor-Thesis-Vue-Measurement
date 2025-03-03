<template>
  <div class="borderTop">
    <p>Aktuelle Tiefe: {{ currentDepth }}</p>
    <Circle v-if="!eventCount" />
    <DynamicCircle :state="state" :currentDepth="currentDepth" :depth="depth" v-if="eventCount"/>
    <RecursiveDomElement
      v-if="currentDepth < depth"
      :depth="depth"
      :currentDepth="currentDepth + 1"
      :state="state"
    />

  </div>
</template>

<script>
import Circle from "./Circle.vue";
import DynamicCircle from "./DynamicCircle.vue";

export default {
  name: "RecursiveDomElement",
  props: {
    depth: {
      type: Number,
      required: true,
    },
    state: {
      type: Number,
      required: true,
    },
    currentDepth: {
      type: Number,
      required: true,
    },
  },
  computed: {
    eventCount() {
      return this.currentDepth % 2 === 0;
    },
  },
  components: {
    //registriert sich selbst
    RecursiveNode: () => import("./RecursiveDomElement.vue"),
    Circle,
    DynamicCircle,
  },
  data() {
    return {
    };
  }
};
</script>

<template>
  <div class="circle" :style="circleStyle"></div>
</template>


<script>
export default {
  name: "DynamicCircle",
  props: {
    state: {
      type: Number,
      required: true,
    },
    currentDepth: {
      type: Number,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      color: this.generateRandomColor(),
      radius: this.generateRandomRadius(),
      initialized: false,
    };
  },
  watch: {
    state: {
      handler() {
        this.color = this.generateRandomColor();
        this.radius = this.generateRandomRadius();
        if (this.initialized) {
          this.$nextTick(() => {
            this.onRendered();
          });
        }
        this.initialized = true
      },
      immediate: true,
    },
  },
  computed: {
    circleStyle() {
      return {
        backgroundColor: this.color,
        borderRadius: this.radius,
      };
    },
  },
  methods: {
    generateRandomColor() {
      return `#${(((1 << 24) * Math.random()) | 0)
        .toString(16)
        .padStart(6, "0")}`;
    },
    generateRandomRadius() {
      return `${Math.floor(Math.random() * 51)}%`;
    },
    onRendered() {
      if(this.currentDepth === this.depth) {
        this.$emit("rendered");  // Nur wenn es nicht das erste Rendern ist
        console.log("colors are changed")
      }
    },
  },
};
</script>

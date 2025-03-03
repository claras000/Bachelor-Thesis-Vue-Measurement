<template>
  <div class="circle" :style="circleStyle"></div>
</template>

<script>
export default {
  name: "Circle",
  data() {
    return {
      color: `#${(((1 << 24) * Math.random()) | 0).toString(16)}`,
    };
  },
  computed: {
    circleStyle() {
      return {
        backgroundColor: this.color,
      };
    },
  },
};
</script>

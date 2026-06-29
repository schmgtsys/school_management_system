<template>
  <div 
    v-if="fullscreen" 
    class="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white bg-opacity-75"
    style="z-index: 9999;"
  >
    <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p v-if="message" class="text-secondary fw-medium">{{ message }}</p>
  </div>
  <div v-else class="d-flex flex-column align-items-center justify-content-center p-4">
    <div class="spinner-border" :class="`text-${variant}`" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p v-if="message" class="text-secondary small mt-2 mb-0">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    fullscreen: { type: Boolean, default: false },
    variant: { type: String, default: 'primary' },
    message: { type: String, default: 'Please wait...' }
  }
}
</script>

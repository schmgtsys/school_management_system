<template>
  <div class="search-bar-container position-relative">
    <i class="bi-search position-absolute top-50 translate-middle-y ms-3 text-muted"></i>
    <input 
      type="text" 
      class="form-control rounded-pill ps-5 shadow-none border-light-subtle bg-light bg-opacity-75" 
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      style="padding-top: 0.6rem; padding-bottom: 0.6rem; font-size: 0.9rem; min-width: 240px; transition: all 0.2s;"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :class="{ 'border-primary shadow-sm bg-white': isFocused }"
    />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SearchBar',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: 'Search records...' }
  },
  emits: ['update:modelValue'],
  setup() {
    const isFocused = ref(false);
    return { isFocused };
  }
}
</script>

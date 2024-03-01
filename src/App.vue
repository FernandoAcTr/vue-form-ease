<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="flex justify-end gap-6 w-full p-3 bg-black text-white">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/examples/basic-validation">Basic Usage</RouterLink>
    <RouterLink to="/examples/async-validation">Async Validation</RouterLink>
    <RouterLink to="/examples/validators">Validators</RouterLink>
    <RouterLink to="/examples/form-component">Form Component</RouterLink>
    <RouterLink to="/examples/hot-validation">Hot Validation</RouterLink>
  </nav>

  <div class="p-5">
    <RouterView />
  </div>
</template>

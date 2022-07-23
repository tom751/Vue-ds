<script setup lang="ts">
import { getComponentDocs } from '@/utils/docs'
import { useRoute } from 'vue-router'

const route = useRoute()

const component = getComponentDocs(route.params.project as string, route.params.component as string)
</script>

<template>
  <section class="p-8">
    <h1>Component detail</h1>
    <pre>{{ component }}</pre>
  </section>
</template>

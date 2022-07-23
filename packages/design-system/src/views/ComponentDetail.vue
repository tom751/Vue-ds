<script setup lang="ts">
import { useRoute } from 'vue-router'
import projectComponents from '../../components.json'

const route = useRoute()

const project = projectComponents.find((pc) => pc.name === route.params.project)
const component = project?.components.find((c) => c.displayName === route.params.component)
</script>

<template>
  <section class="p-8">
    <h1>Component detail</h1>
    <pre>{{ component }}</pre>
  </section>
</template>

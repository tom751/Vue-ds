<script setup lang="ts">
import projectComponents from '../../components.json'
</script>

<template>
  <section class="p-8">
    <h1 class="text-xl uppercase tracking-widest text-gray-300">Projects</h1>

    <div v-for="project in projectComponents" :key="project.name">
      <details>
        <summary class="cursor-pointer text-xl">{{ project.name }}</summary>
        <ul class="pl-5">
          <li v-for="component in project.components" :key="component.displayName">
            <router-link :to="`/${project.name}/${component.displayName}`">{{ component.displayName }}</router-link>
          </li>
        </ul>
      </details>
    </div>
  </section>
</template>

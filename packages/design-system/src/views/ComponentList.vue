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
          <li v-for="component in project.components" :key="component.docs.displayName">
            <router-link :to="`/${project.name}/${component.docs.displayName}`">
              {{ component.folder ? `${component.folder}/${component.docs.displayName}` : component.docs.displayName }}
            </router-link>
          </li>
        </ul>
      </details>
    </div>
  </section>
</template>

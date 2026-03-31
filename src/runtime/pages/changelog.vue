<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    v-if="data"
    class="nuxt-changelog-container"
  >
    <header>
      <h1>Notes de mise à jour</h1>
    </header>

    <div v-if="pending">
      Chargement...
    </div>

    <div v-else-if="error">
      Erreur : Impossible de trouver le fichier changelog.json.
    </div>

    <section
      v-for="(release, index) in data"
      v-else
      :key="index"
    >
      <div class="release-header">
        <span class="version">{{ release.version }}</span>
        <span class="date">{{ release.date }}</span>
      </div>
      <h2>{{ release.title }}</h2>
      <ul>
        <li
          v-for="item in release.content"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </section>
  </div>
  <div v-else>
    Aucun changelog disponible.
  </div>
</template>

<script setup>
const { data, pending, error } = await useFetch('/api/_changelog')
</script>

<style scoped>
/* Ajoute un CSS minimaliste ou Tailwind @apply ici */
.nuxt-changelog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}
.version {
  background: #00dc82; /* Vert Nuxt */
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
}
</style>

<template>
  <a href="/dashboard">
    <img
      v-if="settings.layout.color == 'light' && settings.theme == 'light'"
      alt="Logo"
      src="@/assets/media/logos/default-dark.svg"
      class="h-20px h-lg-30px app-sidebar-logo-default"
    >
    <img
      v-else
      alt="Logo"
      src="@/assets/media/logos/default.svg"
      class="h-20px h-lg-30px app-sidebar-logo-default"
    >
  </a>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'KeenLogo',
  computed: {
    ...mapGetters(['settings'])
  }
}
</script>

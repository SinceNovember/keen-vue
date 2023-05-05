<template>
  <div class="app-toolbar py-3 py-lg-6 ">
    <div
      class="app-container d-flex flex-stack"
      :class="settings.widthMode.val"
    >
      <page-title />
    </div>
  </div>
</template>
<script>
import PageTitle from '../PageTitle'
import { mapGetters } from 'vuex'
export default {
  name: 'KeenToolbar',
  components: {
    PageTitle
  },
  computed: {
    ...mapGetters(['settings'])
  }
}
</script>

<template>
  <div class="app-main flex-column flex-row-fluid">
    <div class="d-flex flex-column flex-column-fluid">
      <toolbar v-if="settings.toolbar.display" />
      <div class="app-content  flex-column-fluid ">
        <div
          class="app-container "
          :class="settings.widthMode.val"
        >
          <router-view
            :key="key"
            :include="key"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Toolbar from './Toolbar'
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  components: {
    Toolbar
  },
  computed: {
    ...mapGetters(['settings']),
    key() {
      return this.$route.path
    }
  }
}
</script>
<style>

</style>

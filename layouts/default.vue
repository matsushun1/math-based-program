<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-switch v-model="isDarkMode" class="mt-5">
        <template v-slot:prepend>
          <v-icon :color="lightOnSun">mdi-weather-sunny</v-icon>
        </template>
        <template v-slot:append>
          <v-icon :color="lightOnMoon">mdi-weather-night</v-icon>
        </template>
      </v-switch>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-counter',
          title: '様々な変換',
          to: '/conversion'
        },
        {
          icon: 'mdi-flag',
          title: 'フラグによる状態管理',
          to: '/flag-management'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      isDarkMode: true,
    }
  },

  computed: {
    lightOnMoon() {
      return this.isDarkMode ? 'lime accent-2' : 'grey'
    },
    lightOnSun() {
      return this.isDarkMode ? 'grey' : 'orange darken-2'
    }
  },

  watch: {
    isDarkMode() {
      this.$vuetify.theme.dark = this.isDarkMode
      this.$vuetify.theme.options.themeCache.set('darkTheme', JSON.stringify(this.isDarkMode))
    }
  },

  created() {
    this.isDarkMode = JSON.parse(this.$vuetify.theme.options.themeCache.get('darkTheme'))
  },

  mounted() {
    this.$vuetify.theme.dark = this.isDarkMode
  }
}
</script>
<style lang="scss">

</style>


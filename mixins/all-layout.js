export default {
  async fetch() {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  async mounted() {
    const workbox = await window.$workbox
    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
        if (event.isUpdate) {
          window.location.reload(true)
        }
      })
    }
  },

  methods: {}
}

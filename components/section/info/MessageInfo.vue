<template>
  <v-hover v-if="isShow" v-slot="{ hover }">
    <div style="position: relative" @click="overlay = !overlay">
      <v-overlay
        :absolute="true"
        :value="!hideOverlay && (hover || overlay)"
        class="rounded-8"
        @click="overlay = !overlay"
      >
        <YBtn icon color="white" @click="clear">
          <v-icon>$CloseLightIcon</v-icon>
        </YBtn>
      </v-overlay>

      <v-card flat :class="cardClass" min-height="30">
        <v-icon style="bottom: 0; right: 0; position: absolute" size="52" :color="iconColor"> $InfoBoldIcon </v-icon>
        <v-card-text class="pa-3 text--primary">
          <div v-if="$helpers.isArray(messages) && messages.length" class="text-14" :class="textClass">
            <div v-for="(item, index) in messages" :key="`message-${index}`" class="py-1">
              <span v-if="typeof item === 'string'">{{ item }}</span>
              <span v-if="$helpers.isObject">{{ item.text }}</span>
            </div>
          </div>

          <div
            v-else-if="$helpers.isObject(messages) && Object.keys(messages).length"
            class="text-14"
            :class="textClass"
          >
            <div v-for="(item, index) in messages" :key="`message-${index}`" class="py-1">
              <span v-if="typeof item === 'string'">{{ item }}</span>
              <span v-if="$helpers.isObject(item)">{{ item.text }}</span>
              <span v-if="$helpers.isArray(item)">{{ item[0] }}</span>
            </div>
          </div>

          <div v-else-if="typeof messages === 'string' && messages" class="text-14" :class="textClass">
            {{ messages }}
          </div>

          <div class="text-14" :class="textClass">
            <slot></slot>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-hover>
</template>

<script>
export default {
  name: 'MessageInfo',
  props: {
    messages: {
      type: [Array, String, Object],
      default: () => {
        return []
      }
    },
    cardClass: {
      type: String,
      default: 'info'
    },
    iconColor: {
      type: String,
      default: 'white'
    },
    textClass: {
      type: String,
      default: 'white--text'
    },
    show: {
      type: Boolean,
      default: false
    },
    hideOverlay: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      overlay: false
    }
  },

  computed: {
    isShow() {
      return this.$helpers.getBoolean(this.messages)
    }
  },

  watch: {
    isShow(val) {
      this.$emit('update:show', val)
    }
  },

  methods: {
    clear() {
      if (this.$helpers.isArray(this.messages)) {
        this.$emit('update:messages', [])
      } else if (this.$helpers.isObject(this.messages)) {
        this.$emit('update:messages', {})
      } else if (typeof this.messages === 'string') {
        this.$emit('update:messages', '')
      } else {
        this.$emit('update:messages', null)
      }
    }
  }
}
</script>

<style scoped></style>

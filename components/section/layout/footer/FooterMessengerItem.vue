<template>
  <div
    v-ripple="availClick.includes(value.type)"
    class="d-flex align-center"
    :class="{ 'cursor-pointer': availClick.includes(value.type) }"
    @click="open(value)"
  >
    <v-icon color="sblack60" class="mr-2">{{ getMessenggerIcon(value.type) }}</v-icon>
    <div class="text-body2 sblack60--text">{{ value.value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      availClick: ['EMAIL', 'PHONE', 'WHATSAPP', 'LINE', 'TELEGRAM']
    }
  },

  methods: {
    getMessenggerIcon(type) {
      switch (type) {
        case 'EMAIL':
          return '$MessageBoldIcon'
        case 'PHONE':
          return '$PhoneBoldIcon'
        case 'BBM':
          return '$BbmBoldIcon'
        case 'WHATSAPP':
          return '$WhatsappBoldIcon'
        case 'LINE':
          return '$LineBoldIcon'
        case 'TELEGRAM':
          return '$TelegramBoldIcon'
        case 'Wechat':
          return '$WechatBoldIcon'
        case 'KAKAOTALK':
          return '$KakaotalkBoldIcon'
        case 'VIBER':
          return '$ViberBoldIcon'
        case 'SKYPE':
          return '$SkypeBoldIcon'
        case 'MSN':
          return '$MsnBoldIcon'
        case 'YAHOO':
          return '$YahooBoldIcon'
        default:
          return '$LinkBoldIcon'
      }
    },

    open(value) {
      if (this.availClick.includes(value.type)) {
        switch (value.type) {
          case 'EMAIL':
            return this.$helpers.openMail(value.value)
          case 'PHONE':
            return this.$helpers.openPhone(value.value)
          case 'WHATSAPP':
            return this.$helpers.openWA(value.value)
          case 'LINE':
            return this.$helpers.openLine(value.value)
          case 'TELEGRAM':
            return this.$helpers.openTelegram(value.value)
        }
      } else {
        return null
      }
    }
  }
}
</script>

<style></style>

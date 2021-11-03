<template>
  <span>
    <YBtn class="text-14 blue--text elevation-5" large :depressed="false" outlined icon @click="share = true">
      <v-icon> $ShareLightIcon </v-icon>
    </YBtn>

    <v-bottom-sheet v-model="share" inset>
      <v-list>
        <v-subheader>Bagikan</v-subheader>
        <v-list-item :href="shareLink('whatsapp')" target="_blank" @click="share = false">
          <v-list-item-icon>
            <v-icon> $WhatsappBoldIcon </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Whatsapp</v-list-item-title>
        </v-list-item>

        <v-list-item :href="shareLink('facebook')" target="_blank" @click="share = false">
          <v-list-item-icon>
            <v-icon> $FacebookBoldIcon </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Facebook</v-list-item-title>
        </v-list-item>

        <v-list-item :href="shareLink('line')" target="_blank" @click="share = false">
          <v-list-item-icon>
            <v-icon> $LineBoldIcon </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Line</v-list-item-title>
        </v-list-item>

        <v-list-item :href="shareLink('twitter')" target="_blank" @click="share = false">
          <v-list-item-icon>
            <v-icon> $TwitterBoldIcon </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Twitter</v-list-item-title>
        </v-list-item>

        <v-list-item :href="shareLink('telegram')" target="_blank" @click="share = false">
          <v-list-item-icon>
            <v-icon> $TelegramBoldIcon </v-icon>
          </v-list-item-icon>
          <v-list-item-title>Telegram</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </span>
</template>

<script>
export default {
  name: 'CardShare',
  props: {
    link: {
      type: String,
      default: 'https://sebarqurban.id'
    },
    title: {
      type: String,
      default: 'Kelas'
    },
    description: {
      type: String,
      default: ''
    },
    quote: {
      type: String,
      default: ''
    },
    twitterUser: {
      type: String,
      default: '@'
    },
    small: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      share: false,
      hashtags: {
        type: String,
        default: ''
      },
      socialLink: {
        email: 'mailto:?subject=@t&body=@u%0D%0A@d',
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=@u&title=@t&description=@d&quote=@q&hashtag=@h',
        line: 'http://line.me/R/msg/text/?@t%0D%0A@u%0D%0A@d',
        linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=@u',
        telegram: 'https://t.me/share/url?url=@u&text=@t%0D%0A@d',
        twitter: 'https://twitter.com/intent/tweet?text=@t&url=@u&hashtags=@h@tu',
        whatsapp: 'https://api.whatsapp.com/send?text=@t%0D%0A@u%0D%0A@d',
        instagram: 'https://www.instagram.com/?url=@u'
      }
    }
  },

  computed: {},

  methods: {
    rawLink(key) {
      return this.socialLink[key]
    },

    encodedHashtags(key) {
      if (key === 'facebook' && this.hashtags.length) {
        return '%23' + this.hashtags.split(',')[0]
      }

      return this.hashtags
    },

    shareLink(key) {
      let link = this.rawLink(key)

      if (key === 'twitter') {
        if (!this.hashtags.length) link = link.replace('&hashtags=@h', '')
        if (!this.twitterUser.length) link = link.replace('@tu', '')
      }

      return link
        .replace(/@tu/g, '&via=' + encodeURIComponent(this.twitterUser))
        .replace(/@u/g, encodeURIComponent(this.link))
        .replace(/@t/g, encodeURIComponent(this.title))
        .replace(/@d/g, encodeURIComponent(this.description))
        .replace(/@q/g, encodeURIComponent(this.quote))
        .replace(/@h/g, this.encodedHashtags)
    }
  }
}
</script>

<style scoped></style>

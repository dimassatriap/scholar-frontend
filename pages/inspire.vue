<template>
  <div class="my-4 my-sm-10">
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <BannerSlider v-model="banners" key-img-dekstop="imgD" key-img-mobile="imgM" key-src="src" />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <CategorySlider v-model="categories" />
        </v-col>
        <v-col cols="12">
          <SquareBannerSlider v-model="squareBanner" img-key="src" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" class="pa-sm-8">
          <div v-for="(cols, i) in colors" :key="`colors-${i}`" class="mb-8">
            <v-row>
              <v-col cols="12">
                <div class="text-subtitle1 primary--text">{{ cols.title }}</div>
              </v-col>
            </v-row>
            <v-row v-for="(col, x) in cols.colors" :key="`colors-col-${x}`">
              <v-col v-for="(item, y) in col" :key="`color-${y}`">
                <v-card class="shadow-md rounded-8">
                  <v-card-text :class="item.color" style="min-height: 70px"> </v-card-text>
                  <v-card-text class="pa-1 text-center text-12 black--text">
                    <div class="mb-1 bold">{{ item.color }}</div>
                    <div>{{ item.text }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <v-row>
            <v-col cols="12">
              <div class="text-subtitle1 primary--text">Button</div>
            </v-col>
          </v-row>
          <v-row v-for="(button, x) in buttons" :key="`buttons-${x}`">
            <v-col v-for="(btn, y) in button" :key="`btn-${y}`">
              <YBtn
                :large="btn.large"
                :small="btn.small"
                :secondary="btn.secondary"
                :tertiary="btn.tertiary"
                :disabled="btn.disabled"
                :outlined="btn.outlined"
                @click="btnClick"
              >
                {{ btn.text }}
              </YBtn>
            </v-col>
          </v-row>

          <v-row justify="center" align="center">
            <v-col>
              <YBtn large icon color="sblack">
                <v-icon size="24px">$prev</v-icon>
              </YBtn>
            </v-col>
            <v-col>
              <YBtn icon>
                <v-icon>$HeartLightIcon</v-icon>
              </YBtn>
            </v-col>
            <v-col>
              <YBtn large icon color="secondary">
                <v-icon size="48px">$next</v-icon>
              </YBtn>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="text-subtitle1 primary--text">Label</div>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <span>
                <YLabel>Label Default</YLabel>
              </span>
            </v-col>
            <v-col>
              <YLabel info>Label Info</YLabel>
            </v-col>
            <v-col>
              <YLabel success>Label Success</YLabel>
            </v-col>
            <v-col>
              <YLabel warning>Label Warning</YLabel>
            </v-col>
            <v-col>
              <YLabel error>Label Danger</YLabel>
            </v-col>
          </v-row>

          <illustration-info
            :img="require('~/assets/illustrations/illustration-cart.svg')"
            subtitle="Keranjang belanja kosong."
            body="Yuk! Mulai tambahkan produk pilihanmu. Yuk! Mulai tambahkan produk pilihanmu. Yuk! Mulai tambahkan produk pilihanmu."
            class="mt-8 mb-4"
          ></illustration-info>
        </v-col>
        <v-col cols="12" sm="6" class="pa-sm-8">
          <v-row>
            <v-col cols="12">
              <div class="text-subtitle1 primary--text">Image</div>
            </v-col>
            <v-col cols="12">
              <YImg src="https://bad.src/not/valid" class="rounded-16" :aspect-ratio="1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="text-subtitle1 primary--text">Typography</div>
            </v-col>
          </v-row>
          <v-row v-for="(t, i) in typography" :key="`typo-${i}`">
            <v-col cols="12">
              <div :class="[t.class]">{{ t.text }}</div>
            </v-col>
          </v-row>
          <div class="mb-8"></div>

          <MessageInfo :messages.sync="message.info" class="mb-4" />
          <MessageInfo
            :messages.sync="message.infoArrayOfTexts"
            card-class="blue20"
            text-class="sblue--text"
            icon-color="sblue"
            class="mb-4"
          />
          <MessageInfo
            :messages.sync="message.infoArrayOfObjects"
            card-class="syellow60"
            text-class="white--text"
            icon-color="syellow"
            class="mb-4"
          />
          <MessageInfo
            :messages.sync="message.infoObject"
            card-class="red60"
            icon-color="white"
            text-class="white--text"
            class="mb-4"
          />

          <v-form ref="form" v-model="form.isValid" lazy-validation @submit.prevent="submit">
            <YInput
              id="name"
              v-model="form.name"
              placeholder="Masukan Nama lengkap"
              label="Nama Lengkap"
              class="mb-4"
              :rules="$helpers.formRules('required-name')"
            />

            <YInput
              id="input-email"
              v-model="form.email"
              placeholder="Masukan Email"
              label="Email"
              class="mb-4"
              :rules="$helpers.formRules('email')"
            />

            <v-menu
              ref="menuBirthDate"
              v-model="form.menuBirthDate"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
              class="mb-4"
            >
              <template v-slot:activator="{ on, attrs }">
                <div>
                  <div class="mb-1">
                    <label for="birth-date" class="text-body2 sblack60--text"> Tanggal Lahir </label>
                  </div>
                  <v-text-field
                    id="birth-date"
                    v-model="form.birthDate"
                    placeholder="Tanggal Lahir"
                    filled
                    outlined
                    readonly
                    v-bind="attrs"
                    hide-details="auto"
                    class="mb-4"
                    prepend-inner-icon="$CalendarBoldIcon"
                    :rules="$helpers.formRules('required')"
                    v-on="on"
                  ></v-text-field>
                </div>
              </template>
              <v-date-picker
                v-model="form.birthDate"
                :active-picker.sync="activePicker"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="saveBirthDate"
              ></v-date-picker>
            </v-menu>

            <YInput
              id="phone"
              v-model="form.msisdn"
              placeholder="8xxxxxxxxx"
              label="No. Handphone"
              class="mb-4"
              prepend-inner-text="+62"
              type="number"
              :rules="$helpers.formRules('phone')"
            />

            <YInput
              id="password"
              v-model="form.password"
              placeholder="Masukan Kata Sandi"
              label="Kata Sandi"
              class="mb-4"
              password
              :rules="$helpers.formRules('password')"
            />

            <YInput
              id="email-subscription"
              v-model="form.emailSubscription"
              placeholder="Masukan Email"
              label="Email"
              class="mb-6"
              :rules="$helpers.formRules('email')"
              append-button-text="Berlangganan"
              @btn-click="subscribe"
            />

            <YInput
              id="course-name"
              v-model="form.search"
              placeholder="Cari Kelas Pilihanmu"
              rounded
              :filled="false"
              class="mb-6"
            >
              <template v-slot:prepend-inner>
                <v-icon size="20px" color="sblack60">$SearchLightIcon</v-icon>
              </template>
            </YInput>

            <YInput
              id="course-name-2"
              v-model="form.search"
              placeholder="Cari Kelas Pilihanmu"
              rounded
              :filled="false"
              class="mb-6"
            >
              <template v-slot:append>
                <v-icon size="20px" color="sblack60">$SearchLightIcon</v-icon>
              </template>
            </YInput>

            <YQuantityInput
              v-model="quantity"
              :caption="'Stok ' + 100"
              :max-value="100"
              :loading="false"
              class="mb-4"
              @add="() => {}"
              @substract="() => {}"
            />

            <YBtn large block type="submit">Simpan</YBtn>
          </v-form>

          <v-row class="mt-10 mb-4">
            <v-col cols="12">
              <div class="text-subtitle1 primary--text">Alert</div>
            </v-col>
          </v-row>
          <YBtn color="sblack" class="white--text" block @click="$YAlert.show({ content: 'Notification Messages' })">
            $YAlert.show
          </YBtn>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12">
          <div class="text-subtitle1 primary--text">Icons</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(icon, i) in icons" :key="`icons-${i}`">
          <v-card v-ripple class="shadow-md rounded-8" @click="iconClick(icon)">
            <v-card-text class="pa-2 text-center">
              <v-icon color="sblack60" size="60px">{{ icon }}</v-icon>
            </v-card-text>
            <v-card-text class="pa-2 text-center"> {{ icon }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        msg: 'Hey1',
        info: 'Deskripsi Info',
        infoArrayOfTexts: ['Selamat', 'Anda berhasil mendapatkan hadiah'],
        infoArrayOfObjects: [{ text: 'Warning' }, { text: 'Sistem sedang mengalami gangguan' }],
        infoObject: {
          cart: 'Cart anda tidak valid.',
          product: 'Produk tidak ditemukan.'
        }
      },
      banners: [
        {
          imgD: { src: require('~/assets/images/homepage/banner1.png') },
          imgM: { src: require('~/assets/images/homepage/banner1.png') }
        },
        {
          imgD: { src: require('~/assets/images/homepage/banner2.png') },
          imgM: { src: require('~/assets/images/homepage/banner2.png') }
        },
        { imgD: {}, imgM: {} },
        { imgD: {}, imgM: {} }
      ],
      categories: [
        { name: 'Sepatu Pria', image: require('~/assets/images/homepage/category.png') },
        { name: 'Sepatu Wanita', image: require('~/assets/images/homepage/category.png') },
        { name: 'Sepatu Anak Anak', image: require('~/assets/images/homepage/category.png') },
        { name: 'Sepatu Olahraga', image: require('~/assets/images/homepage/category.png') },
        { name: 'Sepatu Gunung', image: require('~/assets/images/homepage/category.png') },
        { name: 'Sepatu Roda', image: require('~/assets/images/homepage/category.png') }
      ],
      squareBanner: [
        {
          image: {
            src: require('~/assets/images/homepage/banner.png')
          }
        },
        {
          image: {
            src: require('~/assets/images/homepage/banner.png')
          }
        },
        {
          image: {
            src: require('~/assets/images/homepage/banner.png')
          }
        },
        {
          image: {
            src: require('~/assets/images/homepage/banner.png')
          }
        },
        {
          image: {
            src: require('~/assets/images/homepage/banner.png')
          }
        },
        {
          image: {
            src: require('~/assets/images/homepage/banner.png')
          }
        },
        {
          image: {
            src: require('~/assets/images/homepage/banner.png')
          }
        }
        // { image: require('~/assets/images/homepage/category.png') }
      ],
      products: [
        {
          id: 1,
          name: 'Sepatu Olahraga Adadas Running Terreks Max',
          price: { amount: 300000 },
          discount: { units: 'PERCENT', value: 50 },
          image: require('~/assets/images/product/example2.png'),
          images: [require('~/assets/images/product/example.png'), require('~/assets/images/product/example2.png')],
          rating: 5
        },
        {
          id: 2,
          name: 'Sepatu Olahraga Adadas Running Terreks Max',
          price: { amount: 300000 },
          discount: { units: 'NOMINAL', value: 100000 },
          image: require('~/assets/images/product/example.png'),
          images: [require('~/assets/images/product/example.png')],
          rating: 4.75
        },
        {
          id: 3,
          name: 'Sepatu Olahraga Adadas Running Terreks Max',
          price: { amount: 100000 },
          discount: { units: 'PERCENT', value: 70 },
          image: require('~/assets/images/product/example.png'),
          images: [require('~/assets/images/product/example.png')]
        },
        {
          id: 4,
          name: 'Sepatu Olahraga Adadas Running Terreks Max',
          price: { amount: 100000 },
          discount: null,
          images: [require('~/assets/images/product/example.png')]
        },
        {
          id: 5,
          name: 'Sepatu Olahraga Adadas Running Terreks Max',
          price: { amount: 100000 },
          discount: null,
          images: [require('~/assets/images/product/example.png')]
        },
        {
          id: 6,
          name: 'Sepatu Olahraga Adadas Running Terreks Max',
          price: { amount: 100000 },
          discount: null,
          images: [require('~/assets/images/product/example.png')]
        }
      ],
      buttons: [
        [
          { text: 'Button Primary', secondary: false, large: true, small: false, disabled: false },
          { text: 'Button Outlined', outlined: true, secondary: false, large: true, small: false, disabled: false },
          { text: 'Button Secondary', secondary: true, large: true, small: false, disabled: false },
          { text: 'Button Tertiary', tertiary: true, large: true, small: false, disabled: false }
        ],
        [
          { text: 'Button Primary', secondary: false, large: false, small: false, disabled: false },
          { text: 'Button Outlined', outlined: true, secondary: false, large: false, small: false, disabled: false },
          { text: 'Button Secondary', secondary: true, large: false, small: false, disabled: false },
          { text: 'Button Tertiary', tertiary: true, large: false, small: false, disabled: false }
        ],
        [
          { text: 'Button Primary', secondary: false, large: false, small: true, disabled: false },
          { text: 'Button Outlined', outlined: true, secondary: false, large: false, small: true, disabled: false },
          { text: 'Button Secondary', secondary: true, large: false, small: true, disabled: false },
          { text: 'Button Tertiary', tertiary: true, large: false, small: true, disabled: false }
        ],
        [
          { text: 'Button Primary', secondary: false, large: true, small: false, disabled: true },
          { text: 'Button Outlined', outlined: true, secondary: false, large: true, small: false, disabled: true },
          { text: 'Button Secondary', secondary: true, large: true, small: false, disabled: true },
          { text: 'Button Tertiary', tertiary: true, large: true, small: false, disabled: true }
        ],
        [
          { text: 'Button Primary', secondary: false, large: false, small: false, disabled: true },
          { text: 'Button Outlined', outlined: true, secondary: false, large: false, small: false, disabled: true },
          { text: 'Button Secondary', secondary: true, large: false, small: false, disabled: true },
          { text: 'Button Tertiary', tertiary: true, large: false, small: false, disabled: true }
        ]
      ],
      colors: [
        {
          title: 'Primary Color',
          colors: [
            [
              { color: 'primary', text: '#D30000' },
              { color: 'red60', text: '#E56666' },
              { color: 'red20', text: '#F6CCCC' }
            ],
            [
              { color: 'secondary', text: '#3C91E6' },
              { color: 'blue60', text: '#D8E9FA' },
              { color: 'blue20', text: '#D8E9FA' },
              { color: 'blue10', text: '#EBF4FC' }
            ]
          ]
        },
        {
          title: 'Semantic Color',
          colors: [
            [
              { color: 'sblue', text: '#00A1E4' },
              { color: 'sblue60', text: '#66C7EF' },
              { color: 'sblue20', text: '#CCECFA' }
            ],
            [
              { color: 'sgreen', text: '#00CC66' },
              { color: 'sgreen60', text: '#66E0A3' },
              { color: 'sgreen20', text: '#CCF5E0' }
            ],
            [
              { color: 'sred', text: '#DD403A' },
              { color: 'sred60', text: '#E67998' },
              { color: 'sred20', text: '#F7D2DD' }
            ],
            [
              { color: 'syellow', text: '#F5B700' },
              { color: 'syellow60', text: '#F9D466' },
              { color: 'syellow20', text: '#FDF1CC' }
            ]
          ]
        },
        {
          title: 'Neutral Color',
          colors: [
            [
              { color: 'sblack', text: '#00171F' },
              { color: 'sblack60', text: '#847F82' },
              { color: 'sblack20', text: '#D6D4D5' }
            ],
            [
              { color: 'sblack5', text: '#F2F3F4' },
              { color: 'white', text: '#FFFFFF' },
              { color: 'background', text: '#F7FAFC' }
            ]
          ]
        }
      ],

      typography: [
        { text: 'Heading 1 - Bold 40px (Mobile 32px)', class: 'text-heading1' },
        { text: 'Heading 2 - Bold 32px (Mobile 24px)', class: 'text-heading2' },
        { text: 'Heading 3 - Bold 24px (Mobile 20px)', class: 'text-heading3' },
        { text: 'Heading 4 - 18px (Mobile 16px)', class: 'text-heading4' },
        { text: 'Heading 5 - 16px (Mobile 14px)', class: 'text-heading5' },
        { text: 'Heading 6 - 14px (Mobile 12px)', class: 'text-heading6' },
        { text: 'Subtitle 1 - 18 px Semibold', class: 'text-subtitle1' },
        { text: 'Subtitle 2 - 16 px Semibold', class: 'text-subtitle2' },
        { text: 'Body 1 - 16 px Regullar', class: 'text-body1' },
        { text: 'Body 2 - 14 px Regullar', class: 'text-body2' },
        { text: 'Caption - 12 px Regullar', class: 'text-caption' },
        { text: 'Caption2 - 10 px Regullar', class: 'text-caption2' }
      ],

      form: {
        isValid: false,
        name: '',
        password: null,
        msisdn: null
      },

      icons: [
        '$BadgeBoldIcon',
        '$BbmBoldIcon',
        '$BuildingHouseBoldIcon',
        '$BuyBoldIcon',
        '$CalendarBoldIcon',
        '$CameraBoldIcon',
        '$CartBoldIcon',
        '$CategoryBoldIcon',
        '$CertificateBoldIcon',
        '$ChatBoldIcon',
        '$CheckboxBoldIcon',
        '$CheckCircleBoldIcon',
        '$CouponBoldIcon',
        '$CowBoldIcon',
        '$CreditCardBoldIcon',
        '$CustomerSupportBoldIcon',
        '$DanaKeluarBoldIcon',
        '$DanaMasukBoldIcon',
        '$DeleteBoldIcon',
        '$DeliveryBoldIcon',
        '$DiscountBoldIcons',
        '$DocumentBoldIcon',
        '$EditBoldIcon',
        '$ExamBoldIcon',
        '$EyeBoldIcon',
        '$EyeSlashBoldIcon',
        '$FacebookBoldIcon',
        '$FlashBoldIcon',
        '$GiftBoldIcon',
        '$HeartBoldIcon',
        '$Heart2BoldIcon',
        '$HeartFilledBoldIcon',
        '$HomeBoldIcon',
        '$InfoBoldIcon',
        '$InfoCircleBoldIcon',
        '$InstagramBoldIcon',
        '$KakaotalkBoldIcon',
        '$LikeBoldIcon',
        '$LineBoldIcon',
        '$LinkBoldIcon',
        '$LocationBoldIcon',
        '$LogoutBoldIcon',
        '$MegaphoneBoldIcon',
        '$MessageBoldIcon',
        '$NotificationBoldIcon',
        '$PaymentBankBoldIcon',
        '$PaymentRetailBoldIcon',
        '$PaymentVaBoldIcon',
        '$PaymentWalletBoldIcon',
        '$PhoneBoldIcon',
        '$PlayBoldIcon',
        '$PoinRpBoldIcon',
        '$ProfileBoldIcon',
        '$RightArrowBoldIcon',
        '$SettingBoldIcon',
        '$ShareBoldIcon',
        '$SheepBoldIcon',
        '$ShieldCheckBoldIcon',
        '$ShowBoldIcon',
        '$SideVoucherBoldIcon',
        '$SkypeBoldIcon',
        '$StarHalfBoldIcon',
        '$ratingHalf',
        '$StarBoldIcon',
        '$StoreBoldIcon',
        '$TelegramBoldIcon',
        '$TwitterBoldIcon',
        '$UnlockBoldIcon',
        '$UsersBoldIcon',
        '$ViberBoldIcon',
        '$VoucherBoldIcon',
        '$WalletBoldIcon',
        '$WechatBoldIcon',
        '$WhatsappBoldIcon',
        '$WishlistBoldIcon',
        '$WorldBoldIcon',
        '$YahooBoldIcon',
        '$YoutubeBoldIcon',
        '$AimLightIcon',
        '$AlertCircleLightIcon',
        '$ArrowUpLightIcon',
        '$ArrowDownLightIcon',
        '$ArrowLeftLightIcon',
        '$ArrowRightLightIcon',
        '$ArrowLeftSquareLightIcon',
        '$ArrowRightSquareLightIcon',
        '$BadgeMedalLightIcon',
        '$BalanceLightIcon',
        '$CalendarLightIcon',
        '$ChatLightIcon',
        '$CheckboxLightIcon',
        '$CheckLightIcon',
        '$ChevronDownLightIcon',
        '$ChevronLeftLightIcon',
        '$ChevronRightLightIcon',
        '$ChevronUpLightIcon',
        '$CircleLightIcon',
        '$ClipboardLightIcon',
        '$CloseLightIcon',
        '$DocumentLightIcon',
        '$DownloadLightIcon',
        '$Filter2LightIcon',
        '$FilterLightIcon',
        '$GiveLoveLightIcon',
        '$HeartLightIcon',
        '$Heart2LightIcon',
        '$InstagramLightIcon',
        '$LikeLightIcon',
        '$LocationLightIcon',
        '$LogoutLightIcon',
        '$MegaphoneLightIcon',
        '$MenuLightIcon',
        '$MessageLightIcon',
        '$MsnBoldIcon',
        '$MoneyBagLightIcon',
        '$PhoneLightIcon',
        '$PlayLightIcon',
        '$PrintLightIcon',
        '$ProfileLightIcon',
        '$SearchLightIcon',
        '$ShareLightIcon',
        '$SmartphoneLightIcon',
        '$StarLightIcon',
        '$TimeCircleLightIcon',
        '$TopupLightIcon',
        '$UnlockLightIcon',
        '$VoucherLightIcon',
        '$WalletLightIcon',
        '$WithdrawalLightIcon',
        '$WorkLightIcon'
      ],

      activePicker: null,
      quantity: 1
    }
  },

  watch: {
    'form.menuBirthDate'(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },

  mounted() {
    this.getProductDetail()
  },

  methods: {
    saveBirthDate(date) {
      this.$refs.menuBirthDate.save(date)
    },

    btnClick() {
      // eslint-disable-next-line no-console
      console.log('Button Clicked')
    },

    submit() {
      // eslint-disable-next-line no-console
      console.log('this.$refs.form.validate(): ', this.$refs.form.validate())
      this.$YAlert.show({
        content: { ...this.form },
        timeout: 5000
      })
    },

    subscribe() {
      this.$YAlert.show({
        content: this.form.emailSubscription + ' Berhasil Subscribe',
        onOk: () => {
          window.location.reload(true)
        }
      })
    },

    iconClick(icon) {
      // eslint-disable-next-line no-console
      console.log(icon)
    },

    async getProductDetail(params = { idProduct: 663686 }) {
      try {
        const a = await this.$repo.product.getProductDetail(params)
        const res = a.data.response
        if (res && res.status) {
          return res.results
        }
      } catch (e) {
      } finally {
      }
    }
  }
}
</script>

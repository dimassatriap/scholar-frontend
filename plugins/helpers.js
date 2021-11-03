export default ({ app }, inject) => {
  const helper = {}

  helper.formatPrice = (value, currency = 'Rp') => {
    if (value) {
      return currency + ' ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    return currency + ' 0'
  }

  helper.discountValue = (discount = {}, totalPrice = 0, att = 'type') => {
    let val = 0

    if (discount && typeof discount === 'object' && Object.prototype.hasOwnProperty.call(discount, 'value')) {
      if (['NOMINAL', 'FIXED', 'VALUE'].includes(discount[att])) {
        val = discount.value
      } else if (['PERCENT', 'PERCENTAGE'].includes(discount[att])) {
        val = totalPrice * (parseInt(discount.value) / 100)
      }
    }

    return val
  }

  helper.discountValueFormatted = (discount = {}, totalPrice = 0, att = 'type') => {
    let val = 0

    if (discount && typeof discount === 'object' && Object.prototype.hasOwnProperty.call(discount, 'value')) {
      if (['NOMINAL', 'FIXED', 'VALUE'].includes(discount[att])) {
        val = discount.value
        return helper.formatPrice(val)
      } else if (discount[att] === 'PERCENT') {
        val = discount.value
        return parseInt(val) + '%'
      }
    }

    return val
  }

  helper.countDiscountPercent = (discount = {}, totalPrice = 0) => {
    if (discount.units === 'PERCENT') {
      return helper.discountValueFormatted(discount, totalPrice, 'units')
    } else if (['NOMINAL', 'FIXED', 'VALUE'].includes(discount.units)) {
      // convert to percent
      const percent = (discount.value / totalPrice) * 100
      return helper.discountValueFormatted({ units: 'PERCENT', value: percent }, totalPrice, 'units')
    } else {
      return null
    }
  }

  helper.loadSuccess = () => {
    /* eslint-disable */
    console.log('Load Script Success')
  }

  helper.loadScript = (url, callback) => {
    // Adding the script tag to the head as suggested before
    const head = document.head
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback
    script.onload = callback

    // Fire the loading
    // head.appendChild(script)
  }

  helper.formatDiscount = (discount) => {
    let price = 0

    if (discount) {
      price = discount.amount
      if (discount.type === 'FIXED') {
        price = discount.amount
      } else {
        return price + '%'
      }
    }

    return price ? helper.formatPrice(price) : '-'
  }

  helper.groupingArray = (data, n) => {
    const group = []
    for (let i = 0, j = 0; i < data.length; i++) {
      if (i >= n && i % n === 0) j++
      group[j] = group[j] || []
      group[j].push(data[i])
    }
    return group
  }

  helper.formRules = (rule) => {
    switch (rule) {
      case 'required-name':
        return [
          (v) => !!v || 'Nama harus diisi.',
          (v) => (typeof v === 'string' && v.trim().length > 0) || 'Tidak Valid',
          (v) => /^[A-Za-z/\s.'-]+$/.test(v) || 'Format tidak valid.'
        ]
      case 'required':
        return [(v) => !!v || 'Harus diisi.']
      case 'name':
        return [(v) => /^[A-Za-z/\s.'-]+$/.test(v) || v === '' || 'Format tidak valid.']
      case 'password':
        return [
          (v) => !!v || 'Kata sandi harus diisi.',
          (v) => (typeof v === 'string' && v.trim().length > 0) || 'Tidak Valid',
          (v) => /^.{6,}$/.test(v) || 'Minimal 6 Karakter.'
        ]
      case 'new-password':
        return [
          (v) => !!v || 'Kata sandi baru harus diisi.',
          (v) => (typeof v === 'string' && v.trim().length > 0) || 'Tidak Valid',
          (v) => /^.{6,}$/.test(v) || 'Minimal 6 Karakter.'
        ]
      case 'link':
        return [(v) => !!v || 'Link harus diisi.']
      case 'email':
        return [(v) => !!v || 'Email harus diisi', (v) => /.+@.+\..+/.test(v) || 'Format email tidak valid']
      case 'optional-email':
        return [(v) => v === '' || v === null || /.+@.+\..+/.test(v) || 'Format email tidak valid']
      case 'phone':
        return [
          (v) => !!v || 'No. Hp harus diisi',
          (v) => /^[8][0-9]{8,12}$/.test(v) || `${v} tidak sesuai dengan format '8xxxxxxxxx' (9-13 digit angka)`
        ]
      case 'optional-phone':
        return [
          (v) =>
            v === null ||
            v === '' ||
            /^[8][0-9]{8,12}$/.test(v) ||
            `${v} tidak sesuai dengan format '8xxxxxxxxx' (9-13 digit angka)`
        ]
      default:
        return []
    }
  }

  helper.statusColor = (status) => {
    status = status.toUpperCase()
    switch (status) {
      case 'SENT':
      case 'PRIMARY':
      case 'REQUESTED':
        return 'info'
      case 'DELIVERED':
      case 'CLOSED':
      case 'ACTIVE':
      case 'SUCCESS':
        return 'success'
      case 'ORDERED':
      case 'PAID':
      case 'BILLED':
      case 'PENDING':
      case 'UNVERIFIED':
        return 'warning'
      case 'DECLINE':
      case 'INACTIVE':
        return 'error'
      case 'CANCELED_BY_SYSTEM':
      case 'CANCELED_BY_USER':
      case 'COMPLAINED':
      case 'REFUNDED':
      case 'WAITING_SHIPPINGCHARGE':
      case 'ON_HOLD':
      case 'CANCELED_BY_RESELLER':
      case 'CANCELED':
      case 'CANCELLED':
      case 'EXPIRED':
      case 'STOP':
      default:
        return 'sblack60'
    }
  }

  helper.statusWalletColor = (status) => {
    status = status.toUpperCase()
    switch (status) {
      case 'REQUESTED':
        return 'info'
      case 'PAID':
        return 'success'
      case 'DECLINE':
        return 'error'
      case 'CANCELED_BY_SYSTEM':
      case 'CANCELED_BY_USER':
      case 'CANCELED_BY_RESELLER':
      case 'CANCELED':
      case 'CANCELLED':
      case 'EXPIRED':
      default:
        return 'sblack60'
    }
  }

  helper.statusWalletText = (status) => {
    status = status.toUpperCase()
    switch (status) {
      case 'REQUESTED':
        return 'Diproses'
      case 'PAID':
        return 'Berhasil'
      case 'DECLINE':
        return 'Ditolak'
      case 'CANCELED':
      case 'CANCELLED':
        return 'Dibatalkan'
      case 'EXPIRED':
        return 'Kedaluwarsa'
      case 'CANCELED_BY_SYSTEM':
        return 'Dibatalkan Sistem'
      case 'CANCELED_BY_USER':
        return 'Dibatalkan Pengguna'
      case 'CANCELED_BY_RESELLER':
        return 'Dibatalkan Reseller'
      default:
        return status
    }
  }

  helper.statusText = (status) => {
    status = status.toUpperCase()
    switch (status) {
      case 'REQUESTED':
        return 'Diproses'
      case 'ORDERED':
      case 'BILLED':
        return 'Belum Dibayar'
      case 'PAID':
        return 'Dikemas'
      case 'SENT':
        return 'Dikirim'
      case 'DELIVERED':
        return 'Diterima'
      case 'CLOSED':
        return 'Selesai'
      case 'ACTIVE':
        return 'Aktif'
      case 'INACTIVE':
        return 'Nonaktif'
      case 'UNVERIFIED':
        return 'Menunggu'
      case 'DECLINE':
        return 'Ditolak'
      case 'CANCELED':
      case 'CANCELLED':
        return 'Dibatalkan'
      case 'EXPIRED':
        return 'Kedaluwarsa'
      case 'PENDING':
        return 'Belum Dibayar'
      case 'SUCCESS':
        return 'Berhasil'
      case 'PRIMARY':
        return 'Rekening Utama'
      case 'STOP':
        return 'Berhenti'
      case 'CANCELED_BY_SYSTEM':
        return 'Dibatalkan Sistem'
      case 'CANCELED_BY_USER':
        return 'Dibatalkan Pengguna'
      case 'COMPLAINED':
        return 'Dikeluhkan'
      case 'REFUNDED':
        return 'Refund'
      case 'WAITING_SHIPPINGCHARGE':
        return 'Menunggu Biaya Pengiriman'
      case 'ON_HOLD':
        return 'Tertahan'
      case 'CANCELED_BY_RESELLER':
        return 'Dibatalkan Reseller'
      default:
        return status
    }
  }

  helper.canceledStatus = (status) => {
    const canceled = ['EXPIRED', 'CANCELED', 'COMPLAINED', 'REFUNDED']
    return canceled.includes(status)
  }

  helper.formatAccountNumber = (val) => {
    return val.toString().replace(/(\d)(?=(\d\d\d\d)+(?!\d))/g, '$1 ')
  }

  helper.formatPhone = (val) => {
    return '+' + val.toString().replace(/([0-9]{2})([0-9]{3})([0-9]{4})([0-9]{1,8}$)/gi, '$1 $2 $3 $4')
  }

  helper.remove62FromMsisdn = (msisdn) => {
    let phone = msisdn
    if (msisdn && helper.isString(msisdn)) {
      if (phone[0] === '+' && phone[1] === '6' && phone[2] === '2') {
        phone = phone.substring(2)
      } else if (phone[0] === '6' && phone[1] === '2') {
        phone = phone.substring(2)
      } else if (phone[0] === '0') {
        phone = phone.substring(1)
      }
    }

    return phone
  }

  helper.setLabelDistrictFromGeoData = (geo) => {
    if (geo && helper.isObject(geo)) {
      let district = geo.city.name
      if (geo.city.type === 'DISTRICT') {
        district = 'Kab ' + district
      }
      const label = geo.subdistrict.name + ', ' + district + ', ' + geo.province.name + '.'

      return label
    } else {
      return null
    }
  }

  helper.copyToClipboard = (str) => {
    const m = document
    str = m.createTextNode(str)
    const w = window
    const b = m.body
    b.appendChild(str)
    if (b.createTextRange) {
      const d = b.createTextRange()
      d.moveToElementText(str)
      d.select()
      m.execCommand('copy')
    } else {
      const d = m.createRange()
      const g = w.getSelection
      d.selectNodeContents(str)
      g().removeAllRanges()
      g().addRange(d)
      m.execCommand('copy')
      g().removeAllRanges()
    }
    str.remove()
  }

  helper.toCamel = (s) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '')
    })
  }

  helper.toSnakeCase = (a) => {
    return a
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase()
  }

  helper.isArray = function (a) {
    return Array.isArray(a)
  }

  helper.isNotEmptyArray = function (a) {
    return Array.isArray(a) && a.length > 0
  }

  helper.isValidFirstChildArray = function (a) {
    return Array.isArray(a) && a.length > 0 && a[0]
  }

  helper.isObject = function (o) {
    return o === Object(o) && !helper.isArray(o) && typeof o !== 'function'
  }

  helper.keysToCamel = function (o) {
    if (helper.isObject(o)) {
      const n = {}

      Object.keys(o).forEach((k) => {
        n[helper.toCamel(k)] = helper.keysToCamel(o[k])
      })

      return n
    } else if (helper.isArray(o)) {
      return o.map((i) => {
        return helper.keysToCamel(i)
      })
    }

    return o
  }

  helper.keysToSnake = (o) => {
    if (helper.isObject(o)) {
      const n = {}

      Object.keys(o).forEach((k) => {
        n[helper.toSnakeCase(k)] = helper.keysToSnake(o[k])
      })

      return n
    } else if (helper.isArray(o)) {
      return o.map((i) => {
        return helper.keysToSnake(i)
      })
    }

    return o
  }

  helper.isString = function (val) {
    return typeof val === 'string'
  }

  helper.isEmptyObject = function (obj) {
    return Object.keys(obj).length === 0
  }

  helper.getBoolean = function (value) {
    if (helper.isArray(value)) {
      return !!value.length
    } else if (helper.isObject(value)) {
      return !!Object.keys(value).length
    } else if (helper.isString(value)) {
      return !!value
    } else {
      return !!value
    }
  }

  helper.convertStringToCapitalize = function (string) {
    if (string && helper.isString(string)) {
      return string.toLowerCase().replace(/\b(\w)/g, (x) => x.toUpperCase())
    } else {
      return string
    }
  }

  helper.findInitials = function (name) {
    const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

    let initials = [...name.matchAll(rgx)] || []

    initials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase()

    return initials
  }

  helper.genderParse = function (gender) {
    switch (gender) {
      case 'MALE':
        return 'Laki - Laki'
      case 'FEMALE':
        return 'Perempuan'
      default:
        return 'Belum Terdefinisi'
    }
  }

  helper.getEstimateTime = function (etd, flag = 'DAY') {
    let result = 'Estimasi tiba '
    const array = etd.split('-')
    if (flag === 'DAY') {
      for (let i = 0; i < array.length; i++) {
        array[i] = parseInt(array[i]) || 0
        const date = app.$moment(app.$moment().add(array[i], 'd')).format('DD MMM')
        if (i === 0) {
          result += date
        } else {
          result += ' - ' + date
        }
      }
    } else if (flag === 'HOUR') {
      for (let i = 0; i < array.length; i++) {
        const e = parseInt(array[i]) || 0
        if (i === 0) {
          result += e
        } else {
          result += ' - ' + e
        }
      }

      result += ' jam'
    }

    return result
  }

  helper.priceDueDate = () => {
    return '2021-04-30'
  }

  helper.deepCloneArray = (array) => {
    if (Array.isArray(array)) {
      return JSON.parse(JSON.stringify(array))
    } else {
      return array
    }
  }

  helper.openLink = (link, target = '_blank') => {
    window.open(link, target)
  }

  helper.handleBack = (fromRoute, fallback = '/') => {
    if (!fromRoute.name) {
      app.router.push(fallback)
    } else {
      app.router.back()
    }
  }

  helper.shadeColor = (color, percent) => {
    if (color.length === 4) {
      const temp = color
      color = temp[0] + temp[1] + temp[1] + temp[2] + temp[2] + temp[3] + temp[3]
    }

    let R = parseInt(color.substring(1, 3), 16)
    let G = parseInt(color.substring(3, 5), 16)
    let B = parseInt(color.substring(5, 7), 16)

    if (R == 0) {
      R = 32
    }
    if (G == 0) {
      G = 32
    }
    if (B == 0) {
      B = 32
    }

    R = parseInt((R * (100 + percent)) / 100)
    G = parseInt((G * (100 + percent)) / 100)
    B = parseInt((B * (100 + percent)) / 100)

    R = R < 255 ? R : 255
    G = G < 255 ? G : 255
    B = B < 255 ? B : 255

    const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16)
    const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16)
    const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16)

    return '#' + RR + GG + BB
  }

  helper.pSBCr = (d) => {
    let i = parseInt
    let n = d.length,
      x = {}
    if (n > 9) {
      ;([r, g, b, a] = d = d.split(',')), (n = d.length)
      if (n < 3 || n > 4) return null
      ;(x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))), (x.g = i(g)), (x.b = i(b)), (x.a = a ? parseFloat(a) : -1)
    } else {
      if (n == 8 || n == 6 || n < 4) return null
      if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '')
      d = i(d.slice(1), 16)
      if (n == 9 || n == 5)
        (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000)
      else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1)
    }
    return x
  }

  helper.pSBC = (p, c0, c1, l) => {
    let r,
      g,
      b,
      P,
      f,
      t,
      h,
      m = Math.round,
      a = typeof c1 == 'string'
    if (
      typeof p != 'number' ||
      p < -1 ||
      p > 1 ||
      typeof c0 != 'string' ||
      (c0[0] != 'r' && c0[0] != '#') ||
      (c1 && !a)
    )
      return null
    ;(h = c0.length > 9),
      (h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
      (f = helper.pSBCr(c0)),
      (P = p < 0),
      (t = c1 && c1 != 'c' ? helper.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }),
      (p = P ? p * -1 : p),
      (P = 1 - p)
    if (!f || !t) return null
    if (l) (r = m(P * f.r + p * t.r)), (g = m(P * f.g + p * t.g)), (b = m(P * f.b + p * t.b))
    else
      (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
        (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
        (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5))
    ;(a = f.a), (t = t.a), (f = a >= 0 || t >= 0), (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0)
    if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')'
    else
      return (
        '#' +
        (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
          .toString(16)
          .slice(1, f ? undefined : -2)
      )
  }

  helper.shareWA = (text, url) => {
    if (process.client){
      helper.openLink(`https://api.whatsapp.com/send?text=${text} ${url}`)
    }
  }

  helper.shareFB = (text, url) => {
    if (process.client){
      helper.openLink(`https://www.facebook.com/share.php?u=${url}&quote=${text}`)
    }
  }

  helper.shareTwitter = (text, url) => {
    if (process.client){
      helper.openLink(`https://twitter.com/intent/tweet?text=${text} ${url}`)
    }
  }

  helper.shareLine = (text, url) => {
    if (process.client){
      helper.openLink(`https://line.me/R/msg/text/?${text} ${url}`)
    }
  }

  helper.shareTelegram = (text, url) => {
    if (process.client){
      helper.openLink(`https://telegram.me/share/url?url=${url}&text=${text}`)
    }
  }

  helper.shareLinkedin = (text, url) => {
    if (process.client){
      helper.openLink(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
    }
  }

  helper.openMail = (email) => {
    if (process.client){
      helper.openLink(`mailto:${email}`)
    }
  }

  helper.openPhone = (number) => {
    if (process.client){
      helper.openLink(`tel:${number}`)
    }
  }

  helper.openAddress = (address) => {
    if (process.client){
      helper.openLink(`https://www.google.com/search?q=${address}`)
    }
  }

  helper.openGoogleSearch = (search) => {
    if (process.client){
      helper.openLink(`https://www.google.com/search?q=${search}`)
    }
  }

  helper.openWA = (number) => {
    if (process.client){
      helper.openLink(`https://wa.me/${number}/`)
    }
  }

  helper.openLine = (id) => {
    if (process.client){
      helper.openLink(`https://line.me/R/ti/p/~${id}/`)
    }
  }

  helper.openTelegram = (id) => {
    if (process.client){
      helper.openLink(`https://t.me/${id}/`)
    }
  }

  helper.openInstagram = (username) => {
    if (process.client){
      helper.openLink(`https://www.instagram.com/${username}/`)
    }
  }


  helper.openLinkedin = (username) => {
    if (process.client){
      helper.openLink(`https://www.linkedin.com/company/${username}/`)
    }
  }

  inject('helpers', helper)
}

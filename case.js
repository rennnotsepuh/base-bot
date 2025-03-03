//===================[ TEMPAT MODULE ]=====================\\
require('./config')
const {
  WA_DEFAULT_EPHEMERAL,
  getAggregateVotesInPollMessage,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  getContentType,
  useMultiFileAuthState,
  makeWASocket,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  makeWaSocket,
} = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const { exec } = require('child_process')
const chalk = require('chalk')
const moment = require('moment-timezone')
const yts = require('yt-search')
const didyoumean = require('didyoumean')
const similarity = require('similarity')
const more = String.fromCharCode(8206)
const readmore = more.repeat(4800)
const aximage = fs.readFileSync('./src/axira.jpg')
//---- firebase
const { initializeApp } = require('firebase/app')
const { getAuth, signInAnonymously } = require('firebase/auth')
const { getDatabase, ref, get, set, update, child } = require('firebase/database')

// Ganti dengan konfigurasi proyek Firebase kamu// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBELoik12yiulkMhKYc8DdnJp5J8d-1ClQ',
  authDomain: 'renn-d9a28.firebaseapp.com',
  databaseURL: 'https://renn-d9a28-default-rtdb.firebaseio.com',
  projectId: 'renn-d9a28',
  storageBucket: 'renn-d9a28.appspot.com',
  messagingSenderId: '955128807910',
  appId: '1:955128807910:web:cdef31db52db8ec6979627',
}

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)
signInAnonymously(auth)
// Data yang ingin ditambahkan
const menuData = {
  menu: [
    { id: 1, name: 'menu 1', star: 4, harga: 25000 },
    { id: 2, name: 'menu 2', star: 4, harga: 30000 },
    { id: 3, name: 'menu 3', star: 5, harga: 20000 },
    { id: 4, name: 'menu 4', star: 3, harga: 15000 },
  ],
  open: false,
}

module.exports = async (RennSock, m) => {
  try {
    const from = m.key.remoteJid
    var body =
      m.mtype === 'interactiveResponseMessage'
        ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id
        : m.mtype === 'conversation'
        ? m.message.conversation
        : m.mtype == 'imageMessage'
        ? m.message.imageMessage.caption
        : m.mtype == 'videoMessage'
        ? m.message.videoMessage.caption
        : m.mtype == 'extendedTextMessage'
        ? m.message.extendedTextMessage.text
        : m.mtype == 'buttonsResponseMessage'
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == 'listResponseMessage'
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == 'templateButtonReplyMessage'
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype == 'messageContextInfo'
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : ''
    //==================[ TEMPAT CONST LIB ]=====================\\
    const { smsg, fetchJson, getBuffer, fetchBuffer, getGroupAdmins, TelegraPh, isUrl, hitungmundur, sleep, clockString, checkBandwidth, runtime, tanggal, getRandom } = require('./lib/myfunc')
    const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/respon-list')
    const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('./lib/setproses')
    const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('./lib/setdone')

    const fkontak = {
      key: { participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },
      message: {
        'contactMessage': {
          'displayName': global.ownername,
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.ownername},;;;\nFN:${global.ownername}\nitem1.TEL;waid=6285892928715:6285892928715\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
          'jpegThumbnail': aximage,
          thumbnail: thumb,
          sendEphemeral: true,
        },
      },
    }
    const kondisiToko = JSON.parse(fs.readFileSync('./database/menu.json', 'utf-8')).open
    const stokToko = JSON.parse(fs.readFileSync('./database/menu.json', 'utf-8')).menu

    //===================[ TAMPAT Prefix / ADMIN / OWNER ]====================\\
    const budy = typeof m.text === 'string' ? m.text : ''
    const PrefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/
    const Prefix = PrefixRegex.test(body) ? body.match(PrefixRegex)[0] : '.'
    const isCmd = body.startsWith(Prefix)
    const command = isCmd ? body.slice(Prefix.length).trim().split(' ').shift().toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const text = (q = args.join(' '))
    const sender = m.key.fromMe ? RennSock.user.id.split(':')[0] + '@s.whatsapp.net' || RennSock.user.id : m.key.participant || m.key.remoteJid
    const botNumber = await RennSock.decodeJid(RennSock.user.id)
    const senderNumber = sender.split('@')[0]
    const isCreator = (m && m.sender && [botNumber, ...global.ownerNumber].map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false
    const pushname = m.pushName || `${senderNumber}`
    const isBot = botNumber.includes(senderNumber)

    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const groupMetadata = m.isGroup ? await RennSock.groupMetadata(from).catch((e) => {}) : ''
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    //=================[ TEMPAT FUNCTION DATABASE ]====================\\
    let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'))
    let listStore = JSON.parse(fs.readFileSync('./database/list-message.json'))
    let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'))
    let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'))
    // prem
    const prem = JSON.parse(fs.readFileSync('./database/premium.json'))
    const _prem = require('./lib/premium.js')
    let premium = JSON.parse(fs.readFileSync('./database/premium.json'))
    const isPremium = isCreator ? true : _prem.checkPremiumUser(m.sender, premium)

    //===================[ TAMPILAN CONSOLE ]=====================\\
    if (m.message) {
      console.log(
        chalk.black(chalk.bgWhite('[ PESAN ]')),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.white(budy || m.mtype) + '\n' + chalk.magenta('=> Dari'),
        chalk.green(pushname),
        chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'),
        chalk.green(m.isGroup ? pushname : 'Private Chat', from),
      )
    }

    //==================[ FUNCTION FITUR ]=====================\\
    // Gak Usah Di Apa Apain Jika Tidak Mau Error
    try {
      ppuser = await RennSock.profilePictureUrl(m.sender, 'image')
    } catch (err) {
      ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
    }
    ppnyauser = await getBuffer(ppuser)
    try {
      let isNumber = (x) => typeof x === 'number' && !isNaN(x)
      let limitUser = global.limitawal
      let user = global.db.data.users[m.sender]
      if (typeof user !== 'object') global.db.data.users[m.sender] = {}
      if (user) {
        if (!isNumber(user.afkTime)) user.afkTime = -1
        if (!('afkReason' in user)) user.afkReason = ''
        if (!isNumber(user.limit)) user.limit = limitUser
      } else
        global.db.data.users[m.sender] = {
          afkTime: -1,
          afkReason: '',
          limit: limitUser,
        }
    } catch (err) {
      console.log(err)
    }

    // respon list
    if (m.isGroup && isAlreadyResponList(m.chat, body.toLowerCase(), db_respon_list)) {
      var get_data_respon = getDataResponList(m.chat, body.toLowerCase(), db_respon_list)
      if (get_data_respon.isImage === false) {
        RennSock.sendMessage(
          m.chat,
          { text: sendResponList(m.chat, body.toLowerCase(), db_respon_list) },
          {
            quoted: m,
          },
        )
      } else {
        RennSock.sendMessage(
          m.chat,
          { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response },
          {
            quoted: m,
          },
        )
      }
    }

    const reSize = async (buffer, ukur1, ukur2) => {
      return new Promise(async (resolve, reject) => {
        let jimp = require('jimp')
        var baper = await jimp.read(buffer)
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
        resolve(ab)
      })
    }
    const fkethmb = await reSize(ppuser, 300, 300)
    // function resize
    let jimp = require('jimp')
    const resize = async (image, width, height) => {
      const read = await jimp.read(image)
      const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
      return data
    }

    async function downloadMp3(link) {
      try {
        RennSock.sendMessage(m.chat, { react: { text: '🕒', key: m.key } })
        let kyuu = await fetchJson(`https://api.kyuurzy.site/api/download/aio?query=${link}`)
        RennSock.sendMessage(m.chat, { audio: { url: kyuu.result.url }, mimetype: 'audio/mpeg' }, { quoted: m })
      } catch (err) {
        reply(`${err}`)
      }
    }

    async function downloadMp4(link) {
      try {
        RennSock.sendMessage(m.chat, { react: { text: '🕒', key: m.key } })
        let kyuu = await fetchJson(`https://api.kyuurzy.site/api/download/aio?query=${link}`)
        RennSock.sendMessage(m.chat, { video: { url: kyuu.result.url }, caption: '' }, { quoted: m })
      } catch (err) {
        reply(`${err}`)
      }
    }

    //self public
    global.public = true
    if (!global.public) {
      if (!m.key.fromMe && !isCreator) return
    }

    //===================[ FUNCTION REPLY ]=====================//
    try {
      pplu = await RennSock.profilePictureUrl(anu.id, 'image')
    } catch {
      pplu = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
    }
    const len = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat
          ? {
              remoteJid: `status@broadcast`,
            }
          : {}),
      },
      message: {
        'contactMessage': {
          'displayName': `${pushname}`,
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;LoynCream,;;;\nFN: LoynBotz V1\nitem1.TEL;waid=${m.sender.split('@')[0]}:+${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          'jpegThumbnail': pplu,
          thumbnail: pplu,
          sendEphemeral: true,
        },
      },
    }

    const reply2 = async (teks) => {
      RennSock.sendMessage(
        m.chat,
        {
          // document: fs.readFileSync("./package.json"),
          // fileName: "renn",
          // fileLength: 99999999999999,
          // mimetype: 'application/pdf',
          // caption: teks,
          text: teks,
          contextInfo: {
            'externalAdReply': { 'title': `Halo, aku ${global.botname}`, 'body': `Hai kak ${pushname} Jangan Spam Ya`, 'previewType': 'PHOTO', 'thumbnail': aximage, 'sourceUrl': global.ch },
            showAdAttribution: true,
            forwardingScore: 10,
            isForwarded: true,
            mentionedJid: [m.sender],
            businessMessageForwardInfo: {
              businessOwnerJid: `${global.ownerNumber}@s.whatsapp.net`,
            },
          },
        },
        {
          quoted: len,
          ephemeralExpiration: 86400,
        },
      )
    }

    const reply = (teks) => {
      RennSock.sendMessage(from, { text: teks }, { quoted: m })
    }

    const reply4 = (teks) => {
      RennSock.sendMessage(
        from,
        {
          text: teks,
          contextInfo: {
            'externalAdReply': { 'title': `Halo, aku ${global.botname}`, 'body': `Hai kak ${pushname} Jangan Spam Ya`, 'previewType': 'PHOTO', 'thumbnail': thumb, 'sourceUrl': global.ch },
          },
        },
        { quoted: len },
      )
    }

    const replyrenn = (teks) => {
      Renn.sendMessage(
        m.chat,
        {
          text: teks,
          contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            'externalAdReply': {
              'showAdAttribution': true,
              'containsAutoReply': true,
              'title': `${global.botname}`,
              'body': `${nanoliatwaktu} ${pushname} 👋🏻`,
              'previewType': 'VIDEO',
              'thumbnailUrl': 'https://telegra.ph/file/a9526fb3516af2aac0020.jpg',
              'sourceUrl': 'https://renn.vercel.app',
            },
          },
        },
        { quoted: fkontak },
      )
    }

    //==================[ FUNCTION WAKTU ]======================\\
    function getFormattedDate() {
      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      var hours = currentDate.getHours()
      var minutes = currentDate.getMinutes()
      var seconds = currentDate.getSeconds()
    }

    let d = new Date(new Date() + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    const hariini = d.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })

    function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      return hours + ' jam ' + minutes + ' menit ' + seconds + ' detik'
    }

    function msToDate(ms) {
      temp = ms
      days = Math.floor(ms / (24 * 60 * 60 * 1000))
      daysms = ms % (24 * 60 * 60 * 1000)
      hours = Math.floor(daysms / (60 * 60 * 1000))
      hoursms = ms % (60 * 60 * 1000)
      minutes = Math.floor(hoursms / (60 * 1000))
      minutesms = ms % (60 * 1000)
      sec = Math.floor(minutesms / 1000)
      return days + ' Hari ' + hours + ' Jam ' + minutes + ' Menit'
      // +minutes+":"+sec;
    }

    // Sayying time
    const timee = moment().tz('Asia/Jakarta').format('HH:mm:ss')
    if (timee < '23:59:00') {
      var waktuucapan = 'Selamat Malam 🌃'
    }
    if (timee < '19:00:00') {
      var waktuucapan = 'Selamat Petang 🌆'
    }
    if (timee < '18:00:00') {
      var waktuucapan = 'Selamat Sore 🌅'
    }
    if (timee < '15:00:00') {
      var waktuucapan = 'Selamat Siang 🏙'
    }
    if (timee < '10:00:00') {
      var waktuucapan = 'Selamat Pagi 🌄'
    }
    if (timee < '05:00:00') {
      var waktuucapan = 'Selamat Subuh 🌉'
    }
    if (timee < '03:00:00') {
      var waktuucapan = 'Tengah Malam 🌌'
    }

    //==================[ FUNCTION FIREBASE DATABASE ]======================\\
    function simpanData() {
      const dbRef = ref(database)
      get(child(dbRef, '/'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()

            // Menyimpan data ke file menu.json
            fs.writeFileSync('./database/menu.json', JSON.stringify(data, null, 2), (err) => {
              if (err) throw err
              console.log('Data berhasil disimpan ke ./lib/menu.json')
            })
            // Membaca data dari file dan menampilkannya di console
            const savedData = fs.readFileSync('./database/menu.json', 'utf-8')
            console.log('Data dari file:', JSON.parse(savedData))
          } else {
            console.log('Tidak ada data yang ditemukan.')
          }
        })
        .catch((error) => {
          console.error('Gagal mengambil data:', error)
        })
    }

    // Fungsi untuk menambahkan data menggunakan set
    function addData() {
      set(ref(database, '/'), menuData)
        .then(() => {
          console.log('Data berhasil ditambahkan menggunakan set')
        })
        .catch((error) => {
          console.error('Gagal menambahkan data menggunakan set:', error)
        })
    }
    // Fungsi untuk mengupdate status open menggunakan update
    function updateKondisi(kondisi) {
      if (kondisi === true) {
        if (kondisiToko === true) {
          reply('Tokoo Sudah Buka\nKetik  .close untuk menutup toko')
        } else {
          update(ref(database, '/'), { open: true })
            .then(() => {
              reply('Toko Telah Buka.\nKetik `.upsw` untuk menguplod story')
            })
            .catch((error) => {
              console.log(error)
              reply('Gagal mengupdate data.\nSilahkan menghubungi Developer agar diperbaiki')
            })
          simpanData()
        }
      } else {
        if (kondisiToko === false) {
          reply('Tokoo Sudah Tutup\nKetik  .open untuk membuka toko')
        } else {
          update(ref(database, '/'), { open: false })
            .then(() => {
              reply('Toko Tutup.\nKetik .statistik untuk menghitung data hari ini')
            })
            .catch((error) => {
              console.log(error)
              reply('Gagal mengupdate data.\nSilahkan menghubungi Developer agar diperbaiki')
            })
          simpanData()
        }
      }
    }
    //-- FIREBASE END

    //==================[ FUNCTION RESPON SALAH ]======================\\
    if (Prefix && command) {
      let caseNames = getCaseNames()
      function getCaseNames() {
        const fs = require('fs')
        try {
          const data = fs.readFileSync('case.js', 'utf8')
          const casePattern = /case\s+'([^']+)'/g
          const matches = data.match(casePattern)
          if (matches) {
            const caseNames = matches.map((match) => match.replace(/case\s+'([^']+)'/, '$1'))
            return caseNames
          } else {
            return []
          }
        } catch (err) {
          console.log('Terjadi kesalahan:', err)
          return []
        }
      }
      let noPrefix = command
      let mean = didyoumean(noPrefix, caseNames)
      let sim = similarity(noPrefix, mean)
      let similarityPercentage = parseInt(sim * 100)
      if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
        let response = `Maaf, command yang kamu berikan salah. mungkin ini yang kamu maksud:\n\n•> ${Prefix + mean}\n•> Kemiripan: ${similarityPercentage}%`
        m.reply(response)
      }
    }

    //=================[ TEMPAT CASE DI BAWAH INI ]=================\\
    switch (command) {case 'menu':
    {
        // Memberikan reaction emoji pada pesan pengguna
        RennSock.sendMessage(m.chat, { react: { text: `🔍`, key: m.key } });

        const owned = global.ownerNumber + '@s.whatsapp.net';
        let msg = `Selamat datang kak *${pushname}*`;

        await RennSock.sendMessage(m.chat, {
            image: { url: 'https://files.catbox.moe/oof6ot.jpg' }, // Ganti dengan URL gambar Anda
            caption: `Halo kak *${pushname}*, ini adalah menu bot!\n\n─ Waktu: *${waktuucapan}*\n─ Runtime: *${runtime(process.uptime())}*`,
            footer: `Powered by RennSock`,
            contextInfo: {
                mentionedJid: [m.sender, owned],
                forwardingScore: 20,
                isForwarded: true,
                externalAdReply: {
                    showAdAttribution: true,
                    title: `Your Bot Name`,
                    body: 'Your Bot Description',
                    thumbnailUrl: 'https://files.catbox.moe/xr2sbs.jpg', // Ganti dengan URL thumbnail Anda
                    sourceUrl: 'https://example.com', // Ganti dengan URL sumber Anda
                    mediaType: 1,
                    renderLargerThumbnail: false,
                },
            },
            buttons: [
                {
                    buttonId: 'owner_menu',
                    buttonText: { displayText: 'オーナーメニューの表示' },
                    type: 1,
                },
                {
                    buttonId: 'group_menu',
                    buttonText: { displayText: 'Menu Grup' },
                    type: 1,
                },
                {
                    buttonId: 'download_menu',
                    buttonText: { displayText: 'Menu Download' },
                    type: 1,
                },
            ],
            headerType: 4, // Gunakan headerType 4 untuk gambar + tombol
        });

        // Jika ingin mengirim audio (opsional), hapus tanda komentar di bawah ini
        // await RennSock.sendMessage(m.chat, { audio: fs.readFileSync('./temporary/media/audio.mp3'), mimetype: 'audio/mp4', ptt: true }, { quoted: ftroli });

        /*
        • Prefix  : *( ${Prefix} )*
        *• Mode :* ${RennSock.public ? `Public Mode` : `Self Mode`}
        */
    }
    break;
    
      case '2':
        {
          RennSock.sendMessage(from, {
            text: `ini  testing`,
            contextInfo: {
              'externalAdReply': {
                document: fs.readFileSync('./database/Docu/Renn.docx'),
                fileName: 'Renn.docx',
                mimetype: 'application/msword',
                fileLength: 10000006,
                jpegThumbnail: fs.readFileSync('./logo.jpg'),
              },
            },
          })
        }
        break
      case 'script':
        {
          teks28 = `*❏––––––『 SC 𝐁𝐎𝐓 』––––––❏*\nUNTUK SC YANG DIGUNAKAN ADALAH SC MILIK RAIS RF SR\nVERSI SC ADALAH 1.0 BETA`

          RennSock.sendMessage(
            from,
            {
              text: teks28,
              contextInfo: {
                //mentionedJid:[sender],
                //forwardingScore: 999,
                //isForwarded: true,
                'externalAdReply': {
                  'containsAutoReply': true,
                  'title': 'Renn Website',
                  'body': `hello user, wellcome to Axira Md`,
                  'previewType': 'VIDEO',
                  'thumbnailUrl': fs.readFileSync('./logo.jpg'),
                  //"thumbnailUrl": 'https://telegra.ph/file/a9526fb3516af2aac0020.jpg',
                  'sourceUrl': 'https://renn.vercel.app',
                },
              },
            },
            { quoted: fkontak },
          )
        }
        break
      //----- FITUR --------//
      case 'public':
        {
          if (!isCreator) return reply('kamu siapa?')
          if (RennSock.public === false) {
            reply('*_Sukse Change To Public_*')
            RennSock.public = true
          } else {
            reply('*Bot Already In Public*')
          }
        }
        break
      case 'self':
        {
          if (!isCreator) return reply('lu bukan own')
          RennSock.public = false
          reply('*_Sukses Change To Self_*')
        }
        break

      case 'delsesi':
      case 'clearsession':
        {
          fs.readdir('./session', async function (err, files) {
            if (err) {
              console.log('Unable to scan directory: ' + err)
              return m.reply('Unable to scan directory: ' + err)
            }
            let filteredArray = await files.filter((item) => item.startsWith('pre-key') || item.startsWith('sender-key') || item.startsWith('session-') || item.startsWith('app-state'))
            console.log(filteredArray.length)
            let teks = `Terdeteksi ${filteredArray.length} file kenangan <3\n\n`
            if (filteredArray.length == 0) return m.reply(`${teks}`)
            filteredArray.map(function (e, i) {
              teks += i + 1 + `. ${e}\n`
            })
            //m.reply(`${teks}`)
            await sleep(2000)
            //m.reply("Menghapus file Kenangan...")
            await filteredArray.forEach(function (file) {
              fs.unlinkSync(`./session/${file}`)
            })
            await sleep(2000)
            m.reply('Berhasil menghapus semua Kenangan di folder session')
          })
        }
        break

      case '🗿':
      case '🐦':
        {
          owned = `${ownerNumber}@s.whatsapp.net`
          const ngen = `WIH ADA YANG PAKE EMOTE ${Prefix + command} CUY ${Prefix + command}`
          RennSock.sendMessage(from, { text: ngen, mentions: [sender, owned] }, { quoted: m })
        }
        break
      case 'close':
        {
          updateKondisi(false)
        }
        break
      case 'open':
        {
          updateKondisi(true)
        }
        break
      case 'save':
        {
          simpanData()
        }
        break
      case 'view':
        {
          reply(kondisiToko ? 'true boss' : 'false bos')
        }
        break

      case 'addprem':
        {
          if (!isCreator) return reply(`Hanya Untuk Owner`)
          if (!args[0]) return reply(`Penggunaan ${prefix + command} Penggunaan : *.addprem* 628xxx`)
          krc = q.split('|')[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
          let ceknya = await RennSock.onWhatsApp(krc)
          if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
          prem.push(krc)
          fs.writeFileSync('./database/premium.json', JSON.stringify(prem))
          reply(`Nomor ${krc} Telah Menjadi Premium!`)
        }
        break
      case 'delprem':
        {
          if (!isCreator) return reply(`Hanya Untuk Owner`)
          if (!args[0]) return reply(`Penggunaan ${Prefix + command} nomor\nContoh ${Prefix + command} +628xxx`)
          lu = q.split('|')[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
          unp = prem.indexOf(lu)
          prem.splice(unp, 1)
          fs.writeFileSync('./database/premium.json', JSON.stringify(prem))
          reply(`Nomor ${lu} Telah Di Hapus Premium!`)
        }
        break

      case 'listpremium':
      case 'listprem':
        {
          try {
            let teks = 'list user Premium\n'
            for (let i of prem) {
              teks += `- ${i}\n`
            }
            teks += `\n*Total : ${prem.length}*`
            reply(teks)
          } catch (e) {
            reply(e)
          }
        }
        break
      case 'statustext':
      case 'upsw':
      case 'upswteks':
        {
          if (!q) return reply('Text?')

          // Mengirim pesan status ke semua orang di kontak
          await RennSock.sendMessage('status@broadcast', { text: q })

          reply('Status berhasil dikirim!')
        }
        break
      case 'swgc':
        {
          if (!isCreator) return reply('hh')
          if (!text && !quoted) return reply('Enter text for status or reply to image/video/audio with caption.')

          let media = null
          let options = {}
          const jids = [m.sender, m.chat]

          if (quoted) {
            const mime = quoted.mtype || quoted.mediaType
            if (mime.includes('image')) {
              media = await m.quoted.download()
              options = {
                image: media,
                caption: text || m.quoted.text || '',
              }
            } else if (mime.includes('video')) {
              media = await m.quoted.download()
              options = {
                video: media,
                caption: text || m.quoted.text || '',
              }
            } else if (mime.includes('audio')) {
              media = await m.quoted.download()
              options = {
                audio: media,
                caption: text || m.quoted.text || '',
              }
            } else {
              options = {
                text: text || m.quoted.text || '',
              }
            }
          } else {
            options = {
              text: text,
            }
          }

          try {
            // Kirim pesan status
            await RennSock.sendMessage('status@broadcast', options, {
              backgroundColor: '#7ACAA7',
              textArgb: 0xffffffff,
              font: 1,
              statusJidList: await (await RennSock.groupMetadata(m.chat)).participants.map((a) => a.id),
              additionalNodes: [
                {
                  tag: 'meta',
                  attrs: {},
                  content: [
                    {
                      tag: 'mentioned_users',
                      attrs: {},
                      content: jids.map((jid) => ({
                        tag: 'to',
                        attrs: { jid: m.chat },
                        content: undefined,
                      })),
                    },
                  ],
                },
              ],
            })

            // Balasan sukses
            reply('✅ Status berhasil dikirim!')
          } catch (error) {
            // Balasan gagal
            reply('❌ Gagal mengirim status. Silakan coba lagi.')
            console.error('Error sending status:', error)
          }
        }
        break

      //===================[ BATAS CASE ]=====================\\
      default:
        if (budy.startsWith('=>')) {
          if (!isCreator) return
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2)
            bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return m.reply(bang)
          }
          try {
            m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
          } catch (e) {
            m.reply(String(e))
          }
        }

        if (budy.startsWith('>')) {
          if (!isCreator) return
          let kode = budy.trim().split(/ +/)[0]
          let teks
          try {
            teks = await eval(`(async () => { ${kode == '>>' ? 'return' : ''} ${q}})()`)
          } catch (e) {
            teks = e
          } finally {
            await m.reply(require('util').format(teks))
          }
        }

        if (budy.startsWith('$')) {
          if (!isCreator) return
          exec(budy.slice(2), (err, stdout) => {
            if (err) return m.reply(`${err}`)
            if (stdout) return m.reply(stdout)
          })
        }
    }
  } catch (err) {
    console.log(util.format(err))
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(`Update ${__filename}`)
  delete require.cache[file]
  require(file)
})

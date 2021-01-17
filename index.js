const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const imageToBase64 = require('image-to-base64');
const get = require('got')
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const speed = require('performance-now');

//Setting

const apivhtear = 'apivhtear';
const apibarbar = 'apibarbar';
const tobzkey = 'apitobz';
const ovo = '082223014661';
const pulsa = '082223014661';
const dana = '082223014661';
const BotName = 'Termux School BOT'; 
const instagram = 'https://www.instagram.com/mrf.zvx'; 
const aktif = '08:00 - 22:00';
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:Mrf.zvx\n' // Nama kamu
            + 'ORG:Termux School BOT;\n' // Nama bot
            + 'TEL;type=CELL;type=VOICE;waid=+12523199195:+12523199195\n' //Nomor whatsapp kamu
            + 'END:VCARD'
const
{
WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
   GroupSettingChange,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

// OCR Library
const readTextInImage = require('./lib/ocr')

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Scan kode qr dengan whatsapp!`);
});

conn.on('credentials-updated', () =>
{
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo()
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')

conn.connect();

conn.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log('Termux School BOT')
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : ''
   console.log(`[ ${moment().format("HH:mm:ss")} ] => bot by ig:@mrf.zvx`)
})

conn.on('message-new', async(m) =>
{
   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0]
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);

//fitur

  //Seberapa bucin
if (text.includes('.Seberapabucin')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, {quoted: m});
}
if (text.includes(".seberapabucin")){
const teks = text.replace(/.seberapabucin /, "")
axios.get(`https://arugaz.herokuapp.com/api/howbucins`).then((res) => {
    let hasil = `*Bucin Detected*\n*Persentase* : ${res.data.persen}% \n_${res.data.desc}_ `;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

//kerang ajaib
if (text.includes('.Apakah')){
conn.sendMessage(id, 'Repita o comando com letras minúsculas \ n_exemplo: lonny né bb_',MessageType.text, {quoted: m});
}
if (text.includes('.Bolehkah')){
conn.sendMessage(id, 'Repita o comando com letras minúsculas \ n_exemplo: é o lonny né bb_',MessageType.text, {quoted: m});
}
if (text.includes('.Kapan')){
conn.sendMessage(id, 'Repita o comando com letras minúsculas \ n_exemplo: é o lonny_',MessageType.text, {quoted: m});
}
if (text.includes('.apakah')){
const teks = text.replace(/./, '')
const truth =[
'Iya',
'Tidak',
'Bisa Jadi',
'Coba tanyakan lagi',
'Mungkin',
'🤐']
const ttrth = truth[Math.floor(Math.random() * truth.length)]
conn.sendMessage(id, 'Pertanyaan : *'+teks+'*\n\nJawaban : '+ ttrth, MessageType.text, { quoted: m })
}

if (text.includes('.bolehkah')){
const teks = text.replace(/./, '')
const truth =[
'Boleh',
'Tidak boleh',
'Sangat di anjurkan',
'Coba tanyakan lagi',
'Tidak',
'Mungkin',
'Jangan',
'🤐']
const ttrth = truth[Math.floor(Math.random() * truth.length)]
conn.sendMessage(id, 'Pertanyaan : *'+teks+'*\n\nJawaban : '+ ttrth, MessageType.text, { quoted: m })
}


if (text.includes('.kapan')){
const teks = text.replace(/./, '')
const truth =[
'1 Hari lagi',
'2 hari lagi',
'3 hari lagi',
'4 hari lagi',
'5 hari lagi',
'6 hari lagi',
'1 minggu lagi',
'2 minggu lagi',
'3 minggu lagi',
'1 bulan lagi',
'2 bulan lagi',
'3 hari lagi',
'4 bulan lagi',
'5 bulan lagi',
'6 hari lagi',
'7 bulan lagi',
'8 bulan lagi',
'9 hari lagi',
'10 bulan lagi',
'11 bulan lagi',
'1 tahun lagi',
'2 tahun lagi',
'3 tahun lagi',
'4 tahun lagi',
'Tidak akan',
'Yakin bakal terjadi ?',
'Aku meragukan nya',
'Lusa',
'Akhir bulan depan',
'Awal bulan depan',
'Tahun depan',
'Bulan depan',
'Sebentar lagi',
'🤐']
const ttrth = truth[Math.floor(Math.random() * truth.length)]
conn.sendMessage(id, 'Pertanyaan : *'+teks+'*\n\nJawaban : '+ ttrth, MessageType.text, { quoted: m })
}


  //Zodiak
if (text.includes('.Zodiak')){
conn.sendMessage(id, 'Repita o comando com letras minúsculas \ n_exemplo: .lonny e termux school affs_',MessageType.text, {quoted: m});
}
if (text.includes(".zodiak")){
const teks = text.replace(/.zodiak /, "")
axios.get(`https://api.vhtear.com/zodiak?query=${teks}&apikey=${apivhtear}`).then((res) => {
    let hasil = `*Zodiak* : ${res.data.result.zodiak}\n*Ramalan hari ini* :\n${res.data.result.ramalan}\n\n_${res.data.result.inspirasi}_`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

  //Tebakgambar
if (text.includes('.Tebakgambar')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, {quoted: m});
}
if (text.includes(".tebakgambar")){
axios.get(`https://api.vhtear.com/tebakgambar&apikey=${apivhtear}`).then((res) => {
    imageToBase64(res.data.result.soalImg)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ESPERE] Escrevendo ⏳ aguarde', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, {quoted: m})
        })
})
}

  //Familly100
if (text.includes('.Family100')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, { quoted: m } );
}
if (text.includes(".family100")){
axios.get(`https://api.vhtear.com/family100&apikey=${apivhtear}`).then((res) => {
    let hasil = `*Pertinyiinnyi* : ${res.data.result.soal}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

  //Artimimpi
if (text.includes('.Mimpi')){
conn.sendMessage(id, 'Repita o comando com letras minúsculas \ n_exemplo: termux school bot_',MessageType.text, { quoted: m } );
}
if (text.includes(".mimpi")){
const teks = text.replace(/.mimpi /, "")
axios.get(`https://api.vhtear.com/artimimpi?query=${teks}&apikey=${apivhtear}`).then((res) => {
    let hasil = `${res.data.result.hasil}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

 //Brainly 
if (text.includes('.Brainly')){
conn.sendMessage(id, 'Repita o comando em letras minúsculas \ nexemplo: .brainly termux school e lonny juntos',MessageType.text, { quoted: m } );
}
if (text.includes('.brainly')){
const teks = text.replace(/.brainly /, "")
axios.get(`https://api.vhtear.com/branly?query=${teks}&apikey=${apivhtear}`).then((res) => {
 let hasil = ` ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ${res.data.result.data}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m });
})
}
  //How gay
if (text.includes('.Seberapagay')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, {quoted: m});
}
if (text.includes(".seberapagay")){
const teks = text.replace(/.seberapagay /, "")
axios.get(`https://arugaz.herokuapp.com/api/howgay`).then((res) => {
    let hasil = `*Gay Detectado*\n*Persentase* : ${res.data.persen}%\n${res.data.desc}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

 //Info owner
if (text.includes('.Owner')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, {quoted: m});
}
if (text.includes('.owner')){
conn.sendMessage(id, {displayname: "Jeff", vcard: vcard}, MessageType.contact, {quoted: m})
}

  //Ganti nama grup
if (text.includes('.Setname')){
conn.sendMessage(id, 'Repita o comando em letras minúsculas, válido apenas se o bot se tornar administrador',MessageType.text, {quoted: m});
}
if (text.includes(".setname")){
const teks = text.replace(/.setname /, "")
    let nama = `${teks}`;
    let idgrup = `${id.split("@s.whatsapp.net")[0]}`;
    conn.groupUpdateSubject(idgrup, nama);
conn.sendMessage(id, 'Renomeando o Grupo, Aguarde...' ,MessageType.text, {quoted: m});

}

  //Ganti deskripsi grup
if (text.includes('.Setdesc')){
conn.sendMessage(id, 'Repita o comando em letras minúsculas, válido apenas se o bot se tornar administrador',MessageType.text, {quoted: m});
}
if (text.includes(".setdesc")){
const teks = text.replace(/.setdesc /, "")
    let desk = `${teks}`;
    let idgrup = `${id.split("@s.whatsapp.net")[0]}`; 
    conn.groupUpdateDescription(idgrup, desk)
conn.sendMessage(id, 'Altere a descrição do grupo' ,MessageType.text, {quoted: m});

}

//buka gc
if (text.includes('.Opengc')){
conn.sendMessage(id, 'Repita o comando em letras minúsculas, ele só se aplica se o bot se tornar um administrador',MessageType.text, {quoted: m});
}
else if (text == '.opengc'){
let hasil = `${id.split("@s.whatsapp.net")[0]}`;
   conn.groupSettingChange (hasil, GroupSettingChange.messageSend, false);
conn.sendMessage(id, 'Hai' ,MessageType.text);
}

//tutup gc
if (text.includes('.Closegc')){
conn.sendMessage(id, 'Repita o comando em letras minúsculas, ele só se aplica se o bot se tornar um administrador',MessageType.text, {quoted: m});

}
else if (text == '.closegc'){
 let hasil = `${id.split("@s.whatsapp.net")[0]}`;
   conn.groupSettingChange (hasil, GroupSettingChange.messageSend, true);
conn.sendMessage(id, 'Pronto, grupo fechado' ,MessageType.text);
}


  //Map
if (text.includes('.Map')){
conn.sendMessage(id, 'Repita o comando em letras minúsculas, \ n_exemplo: .map jakarta_',MessageType.text, { quoted: m } );
}
if (text.includes('.map')){
  var teks = text.replace(/.map /, '')
    axios.get('https://mnazria.herokuapp.com/api/maps?search='+teks)
    .then((res) => {
      imageToBase64(res.data.gambar)
        .then(
          (ress) => {
            conn.sendMessage(id, '[WAIT] Pesquisando, por favor, aguarde', MessageType.text, {quoted: m})
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, {quoted: m})
        })
    })
}

//Donasi
if (text.includes('.donasi')){
conn.sendMessage(id, `Deseja fazer um donate para que o bot possa continuar a funcionar.

 اتَّقوا النَّارَ ولو بشقِّ تمرةٍ ، فمن لم يجِدْ فبكلمةٍ طيِّبةٍ
_“jauhilah api neraka, walau hanya dengan bersedekah sebiji kurma (sedikit). Jika kamu tidak punya, maka bisa dengan kalimah thayyibah” [HR. Bukhari 6539, Muslim 1016]_

*Pulsa :* _${pulsa}_
*Dana :* _${dana}_
*OVO :* _${ovo}_`,MessageType.text, { quoted: m } );
}

//Informasi
if (text.includes('.info')){
conn.sendMessage(id, 'Problema com o bot? Relatar o recurso de erro ao proprietário, digite .owner',MessageType.text, { quoted: m } );
}
 //install
if (text.includes('.install')){
conn.sendMessage(id, 'Como instalar o bot Whatsapp no ​​android \ n * Tutorial *: https://github.com/mrfzvx12/termux-whatsapp-bot',MessageType.text, { quoted: m } );
}
 //intro grup
if (text.includes('.intro')){
conn.sendMessage(id, 'Olá \ nBem-vindo \ n \ n╭════ • ›「 * INTRO * 」\ n│ Nome: \ n│ Idade: \ n│ Status: \ n│ Sexo: \ n│ Askot: \ n╰══ ═════════════',MessageType.text);
}
  //Tag
if (text.includes('.Tagme')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, { quoted: m } );
}
if (text.includes('.tagme')) {
 var nomor = m.participant
 const options = {
       text: `@${nomor.split("@s.whatsapp.net")[0]} Hai kak 🤗`,
       contextInfo: { mentionedJid: [nomor] }
 }
 conn.sendMessage(id, options, MessageType.text)
}

 //notifikasi
if (text.includes('!notif')){
const value = text.replace(text.split(' ')[0], '')
const group = await conn.groupMetadata(id)
const member = group['participants']
const ids = []
member.map( async adm => {
    ids.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
const options = {
    text: value,
    contextInfo: { mentionedJid: ids },
    quoted: m
}
conn.sendMessage(id, options, MessageType.text)
}

  //Get ping
if (text.includes('.Ping')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, {quoted: m});
}
else if (text == '.ping') {
const timestamp = speed();
const latensi = speed() - timestamp
conn.sendMessage(id, `PONG!!\n_Speed : ${latensi.toFixed(4)} Second_`, MessageType.text, {quoted: m})
}

  //Nulis dibuku
if (text.includes('.Nulis')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas \ n_exemplo: escreva udin love udan_',MessageType.text, { quoted: m } );
}
if (text.includes('.nulis')){
  const teks = text.replace(/.nulis /, '')
    axios.get(`https://mhankbarbars.herokuapp.com/nulis?text=${teks}&apiKey=${apibarbar}`)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ESPERE] Escrevendo ⏳ aguarde', MessageType.text, {quoted: m})
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf ,MessageType.image, {caption: 'Nulis gini aja males lu', quoted: m})
        })
    })
}
  //Pengucapan ulang
if (text.includes('.Say')){
conn.sendMessage(id, 'Repita o comando com letras minúsculas \ n_exemplo:.say udin gans_',MessageType.text, {quoted: m});
}
if (text.includes(".say")){
  const teks = text.replace(/.say /, "")
conn.sendMessage(id, teks, MessageType.text)
}
  //Youtube download 
if (text.includes('.Ytmp4')){
conn.sendMessage(id, 'Repita o comando com letras minúsculas \ n_exemplo: .ytmp4 http: //youtube..._',MessageType.text, {quoted: m});
}
if (text.includes('.ytmp4')){
const teks = text.replace(/.ytmp4 /, "")
axios.get(`https://st4rz.herokuapp.com/api/ytv?url=${teks}`).then((res) => {
	conn.sendMessage(id, '[ESPERE] Baixando ... ⏳ aguarde', MessageType.text, {quoted: m})
    let hasil = `Clique no link e baixe o resultado. \ N * Título *: $ {res.data.title} \ n * Tamanho *: $ {res.data.filesize} \ n * Formato *: MP4 \ n * Link *: $ {res. data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

if (text.includes('.Ytmp3')){
conn.sendMessage(id, 'Repita o comando com letras minúsculas \ n_exemplo: .ytmp3 http: //www.youtube..._',MessageType.text, {quoted: m});
}
if (text.includes('.ytmp3')){
const teks = text.replace(/.ytmp3 /, "")
axios.get(`https://st4rz.herokuapp.com/api/yta?url=${teks}`).then((res) => {
    conn.sendMessage(id, '[ESPERE] Baixando ... ⏳ aguarde', MessageType.text, {quoted: m})
    let hasil = `Clique no link e baixe os resultados\n*Judul* : ${res.data.title}\n*Tamanho do vídeo* : ${res.data.filesize}\n*Formato* : MP3\n*Link* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

  //Instagram download
if (text.includes('.Ig')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas\n_contoh : .ig http://www.instagram..._',MessageType.text, {quoted: m});
}
if (text.includes('.ig')){
const teks = text.replace(/.ig /, "")
axios.get(`https://mhankbarbars.herokuapp.com/api/ig?url=${teks}&apiKey=${apibarbar}`).then((res) => {
	conn.sendMessage(id, '[ESPERE] Baixando ... ⏳ aguarde', MessageType.text, {quoted: m})
    let hasil = `Clique no link e baixe os resultados!\n*Link* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

  //joox download
if (text.includes('.Joox')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas\n_contoh :: .joox akad - payung teduh_',MessageType.text, {quoted: m});
}
if (text.includes('.joox')){
const teks = text.replace(/.joox /, "")
axios.get(`https://tobz-api.herokuapp.com/api/joox?q=${teks}&apikey=${tobzkey}`).then((res) => {
	conn.sendMessage(id, '[ESPERE] Baixando ... ⏳ aguarde', MessageType.text, {quoted: m})
    let hasil = `Clique no link e baixe os resultados!\n*Judul* : ${res.data.result.album} - ${res.data.result.judul}\n*Link* : ${res.data.result.mp3}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

  //Twitter download
if (text.includes('.Twt')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas\n_contoh : .twt http://www.twitter..._',MessageType.text, {quoted: m});
}
if (text.includes('.twt')){
const teks = text.replace(/.twt /, "")
axios.get(`https://mhankbarbars.herokuapp.com/api/twit?url=${teks}&apiKey=${apibarbar}`).then((res) => {
	conn.sendMessage(id, '[ESPERE] Baixando⏳ aguarde', MessageType.text, {quoted: m})
    let hasil = `Clique no link e baixe os resultados!\n*Link* : ${res.data.result}\n*Título* : ${res.data.title}\n${res.data.quote}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

  //Pencarian wiki
if (text.includes('.Wiki')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas\n_contoh : .wiki ir. by lonny_',MessageType.text, {quoted: m});
}
if (text.includes(".wiki")){
const teks = text.replace(/.wiki /, "")
axios.get(`https://alfians-api.herokuapp.com/api/wiki?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[ESPERA] Pesquisando ... ⏳ aguarde', MessageType.text, {quoted: m})
    let hasil = `Menurut Wikipedia:\n\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

  //Jadwan sholat daerah
if (text.includes('.Sholat')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas\n_contoh : .sholat semarang_',MessageType.text, {quoted: m});
}
if (text.includes(".sholat")){
  const teks = text.replace(/.sholat /, "")
  axios.get(`https://mhankbarbars.herokuapp.com/api/jadwalshalat?daerah=${teks}&apiKey=${apibarbar}`).then ((res) =>{
  conn.sendMessage(id, '[WAIT] Exibindo tempos de oração jadwal, por favor, aguarde', MessageType.text, {quoted: m})
  let hasil = `Momentos de oração em ${teks} hoje é\n\n*Imsak* : ${res.data.Imysak} WIB\n*Subuh* : ${res.data.Subuh} WIB\n*Dzuhur* : ${res.data.Dzuhur} WIB\n*Ashar* : ${res.data.Ashar} WIB\n*Maghrib* : ${res.data.Maghrib} WIB\n*Isya* : ${res.data.Isya} WIB`;
  conn.sendMessage(id, hasil, MessageType.text, {quoted: m});
})
}

  // Optical Character Recognition
if (text.includes('.Ocr')){
conn.sendMessage(id, 'Repita enviando uma foto com a legenda .ocr',MessageType.text, {quoted: m});
}
  if (messageType == 'imageMessage')
   {
       let caption = imageMessage.caption.toLocaleLowerCase()
       if (caption == '.ocr')
       {
           const img = await conn.downloadAndSaveMediaMessage(m)
           readTextInImage(img)
               .then(data => {
                   console.log(data)
                   conn.sendMessage(id, `${data}`, MessageType.text, { quoted: m } );
               })
               .catch(err => {
                   console.log(err)
               })
       }
   }

  //Pict to sticker
if (text.includes('.Stiker')){
conn.sendMessage(id, 'Repita enviando uma foto com uma legenda .stiker',MessageType.text, {quoted: m});
}
   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == '.stiker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker, { quoted: m } )
         });
      }
        if (caption == '.sticker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file
         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker, { quoted: m } )
         });
      }
   }

  //Pantun
   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == '.pantun')
      {
         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }
   };

  //Info convid
if (text.includes('.Covid')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, { quoted: m } );
}
if (text.includes(".covid"))
   {
const get = require('got')
    const body = await get.post('https://api.kawalcorona.com/indonesia', {
    }).json();
    var positif = (body[0]['positif']);
    var sembuh  = (body[0]['sembuh']);
    var meninggal = (body[0]['meninggal']);
    var dirawat = (body[0]['dirawat']);
    console.log(body[0]['name'])
    conn.sendMessage(id,`📌 ÚLTIMA PRAGA COVID-19 NA INDONÉSIA\n\n*Positivo* = ${positif} \n*Curado* = ${sembuh} \n*Morreu* = ${meninggal}\n*Tratamento* = ${dirawat}\n\n*Fique seguro e sempre use uma máscara ao viajar*`, MessageType.text, { quoted: m } );
}

  //Random foto cewe
if (text.includes('.Cecan')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, { quoted: m } );
}
   if (text.includes(".cecan"))
   {
    var items = ["ullzang girl", "cewe cantik", "cewe hijab", "remaja cantik", "cewek jepang"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
    conn.sendMessage(id, '[ESPERE] Pesquisando cecan⏳ por favor aguarde', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); // Ta-da	
    conn.sendMessage(id, buf ,MessageType.image, { caption: `nih gan`, quoted: m } )
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

  //Random foto cowo
if (text.includes('.Cogan')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, { quoted: m } );
}
   if (text.includes(".cogan"))
   {
    var items = ["cowo ganteng", "cogan", "cowok indonesia ganteng", "cowo keren"];
    var cowo = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cowo;
    
    axios.get(url)
      .then((result) => {
        var z = JSON.parse(JSON.stringify(result.data));
        var cowok =  z[Math.floor(Math.random() * z.length)];
        imageToBase64(cowok) 
        .then(
            (response) => {
  conn.sendMessage(id, '[WAIT] Procurando cogan⏳ por favor espere', MessageType.text, { quoted: m } )
  var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(id, buf, MessageType.image, { caption: `nih sist`, quoted: m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }

  //Random anime
if (text.includes('.Anime')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, { quoted: m } );
}
if (text.includes(".anime"))
   {
    var items = ["anime tumblr", "anime loli", "anime aesthetic", "anime hd"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ESPERE] Procurando anime⏳ por favor aguarde', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
    conn.sendMessage(id, buf, MessageType.image, { caption: `wibu lu`, quoted : m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }

  //Pencarian lirik
if (text.includes('.Lirik')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas\n_contoh : .lirik anji - dia_',MessageType.text, { quoted: m } );
}
if (text.includes(".lirik")){
	const teks = text.split(".lirik")[1]
	axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
	     conn.sendMessage(id, '[ WAIT ] Searching lirik⏳ silakan tunggu', MessageType.text, { quoted: m } )
	 	let hasil = `lirik ${teks} \n\n\n ${res.data.result.lirik}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
	})
}
  //Font bapack
if (text.includes('.Alay')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas\n_contoh : .alay udin sayang udan_',MessageType.text, { quoted: m } );
}
if (text.includes(".alay")){
	const alay = text.split(".alay")[1]
	axios.get(`https://api.terhambar.com/bpk?kata=${alay}`).then ((res) =>
		{ let hasil = `${res.data.text}`
		conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
	})
}

  //Random memme
if (text.includes('.Meme')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, { quoted: m } );
}
if (text.includes(".meme"))
   {
    var items = ["meme indonesia","meme indo","foto lucu","meme spongebob"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[WAIT] Procurando memes⏳ por favor espere', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    });
    }

  //Random wallpaper
if (text.includes('.Wp')){
conn.sendMessage(id, 'Por favor, repita o comando em minúsculas',MessageType.text, { quoted: m } );
}
if (text.includes(".wp"))
   {
    var items = ["wallpaper aesthetic", "wallpaper tumblr"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Searching wallpaper⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(id, buf, MessageType.image, { quoted : m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    });
    }

  //Random twit
if (text.includes('.Twit')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes(".twit"))
   {
    var items = ["twitter bucin", "twitter harian", "twitter receh indonesia"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Searching twitter⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }

  //Random quotes
if (text.includes(".loli"))
   {
    var items = ["anime loli"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Searching ⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
    conn.sendMessage(id, buf ,MessageType.image, { caption: `👉👈`, quoted: m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    });
    }

  //Neko
if (text.includes(".neko"))
   {
    var items = ["anime neko"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Searching ⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(id, buf ,MessageType.image, { caption: `👉👈`, quoted: m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    });
    }

  //quotes
if (text.includes('.Quotes')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes(".quotes"))
   {
    var items = ["sajak rindu", "Kata kata bucin", "kata kata motivasi", "kata kata romantis", "quotes bucin"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Searching ⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(id, buf ,MessageType.image, { caption: `Nih gan`, quoted: m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    });
    }

  //Pencarian image
if (text.includes('.Img')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .img iqbal_',MessageType.text, { quoted: m } );
}
if (text.includes(".img"))
   {
    var teks = text.replace(/.img /, "");
    var items = [`${teks}`];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[ WAIT ] Searching⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	var buf = Buffer.from(response, 'base64'); 
    conn.sendMessage(id, buf ,MessageType.image, { quoted: m } )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
            });
    }

  //Stalker instagram
if (text.includes('.Stalk')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .stalk @udindan_',MessageType.text, { quoted: m } );
}
if (text.includes(".stalk")){
const sons = text.replace(/.stalk /, "")
axios.get(`https://alfians-api.herokuapp.com/api/stalk?username=${sons}`).then ((res) =>{
    imageToBase64(res.data.Profile_pic)
        .then(
    (ress) => {
    var buf = Buffer.from(ress, 'base64')
    conn.sendMessage(id, '[ WAIT ] Stalking⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `*>Username* : ${res.data.Username}\n*>Nama* : ${res.data.Name}\n*>Follower* : ${res.data.Jumlah_Followers}\n*>Following* : ${res.data.Jumlah_Following}\n*>Jumlah Post* : ${res.data.Jumlah_Post}\n*>Bio* : ${res.data.Biodata}\n\nFollow : https://www.instagram.com/mrf.zvx/`;
    conn.sendMessage(id, buf ,MessageType.image, { caption: hasil, quoted: m } );
    })
})
}

//Pencarian chord gitar
if (text.includes('.Chord')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .chord anji - dia_',MessageType.text, { quoted: m } );
}
if (text.includes(".chord")){
const teks = text.replace(/.chord /, "")
axios.get(`https://arugaz.herokuapp.com/api/chord?q=${teks}`).then((res) => {
    conn.sendMessage(id, '[ WAIT ] Searching chord lagu⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `*Judul* : ${teks}\n*chord* : ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //Informasi anime
if (text.includes('.Nime')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .Nime naruto_',MessageType.text, { quoted: m } );
}
if (text.includes(".nime")){
const sons = text.replace(/.nime /, "")
axios.get(`https://arugaz.herokuapp.com/api/kuso?q=${sons}`).then ((res) =>{
    conn.sendMessage(id, '[ WAIT ] Searching info anime⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `*Judul* : ${res.data.title}\n*Info* : ${res.data.info}\n*Link* : ${res.data.link_dl}\n*Sinopsis* : ${res.data.sinopsis}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
    })
}

  //Random fakta
if (text.includes('.Fakta')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()
      if (is == '.fakta')
      {
         fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }

   };

  //Nama ninja
if (text.includes('.Namae')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .namae udin_',MessageType.text, { quoted: m } );
}
if (text.includes(".namae")){
const teks = text.replace(/.namae /, "")
axios.get(`https://api.terhambar.com/ninja?nama=${teks}`).then((res) => {
	conn.sendMessage(id, '[ WAIT ] Menggubah namamu⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `Nama Ninja kamu:\n\n*${res.data.result.ninja}*`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}
  //Random informasi gempa
if (text.includes('.Gempa')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes(".gempa")){
  axios.get(`https://st4rz.herokuapp.com/api/infogempa`).then ((res) =>{
  conn.sendMessage(id, '[ WAIT ] Menampilkan info gempa⏳ silahkan tunggu', MessageType.text, { quoted: m } )
  let hasil = ` *INFO GEMPA*\n*Lokasi* : _${res.data.lokasi}_\n *Kedalaman* : _${res.data.kedalaman}_\n*Koordinat* : _${res.data.koordinat}_\n*Magnitude* : _${res.data.magnitude}_\n*Waktu* : _${res.data.waktu}_\n${res.data.potensi}`;
  conn.sendMessage(id, hasil, MessageType.text, { quoted: m } );
})
}

  //Informasi cuaca daerah
if (text.includes('.Cuaca')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .cuaca bandung_',MessageType.text, { quoted: m } );
}
if (text.includes(".cuaca")){
   	const cuaca = text.replace(/.cuaca /, "")
   axios.get(`https://mhankbarbars.herokuapp.com/api/cuaca?q=${cuaca}&apiKey=${apibarbar}`).then ((res) =>{
         conn.sendMessage(id, '[ WAIT ] Menampilkan cuaca⏳ silahkan tunggu', MessageType.text, { quoted: m } )
        let hasil = `*Tempat* : ${cuaca}\n*Angin* : ${res.data.result.angin}\n*Cuaca* : ${res.data.result.cuaca}\n*Deskripsi* : ${res.data.result.desk}\n*Kelembaban* : ${res.data.result.kelembapan}\n*Suhu* : ${res.data.result.suhu}\n*Udara* : ${res.data.result.udara}`
        conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
    })
}

  //Random puisi
if (text.includes('.Puisi')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes(".puisi1")){
	axios.get(`https://arugaz.herokuapp.com/api/puisi1`).then ((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching puisi⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	let hasil =`${res.data.result}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
    })
}

if (text.includes(".puisi2")){
	axios.get(`https://arugaz.herokuapp.com/api/puisi2`).then ((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching puisi⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	let hasil =`${res.data.result}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
    })
}

if (text.includes(".puisi3")){
	axios.get(`https://arugaz.herokuapp.com/api/puisi3`).then ((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching puisi⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	let hasil =`${res.data.result}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
    })
}

  //Random cerpen
if (text.includes('.Cerpen')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes(".cerpen")){
	axios.get(`https://arugaz.herokuapp.com/api/cerpen`).then ((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching cerpen⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	let hasil =`${res.data.result}`
	conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
    })
}

  //Pemendek link
if (text.includes('.Shortlink')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .shortlink http://www.facebook..._',MessageType.text, { quoted: m } );
}
if (text.includes(".shortlink")){
const teks = text.replace(/.shortlink /, "")
axios.get(`https://tobz-api.herokuapp.com/api/shorturl?url=${teks}`).then((res) => {
    let hasil = `${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //Text to pict
if (text.includes('.Logopornhub')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .logopornhub udin/nime_',MessageType.text, { quoted: m } );
}
if (text.includes('.logopornhub')){
var porn = text.split(".logopornhub ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://mhankbarbars.herokuapp.com/api/textpro?theme=pornhub&text1=${text1}&text2=${text2}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Sedang diproses⏳ silahkan tunggu sebentar', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
        })
    })
}

if (text.includes('.Ninja')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .ninja udin/nime_',MessageType.text, { quoted: m } );
}
if (text.includes('.ninja')){
var porn = text.split(".ninja ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=ninjalogo&text1=${text1}&text2=${text2}&apikey=${tobzkey}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Sedang diproses⏳ silahkan tunggu sebentar', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
        })
    })
}

if (text.includes('.Wolf')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .wolf udin/nime_',MessageType.text, { quoted: m } );

}
if (text.includes('.wolf')){
var porn = text.split(".wolf ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo1&text1=${text1}&text2=${text2}&apikey=${tobzkey}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Sedang diproses⏳ silahkan tunggu sebentar', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
        })
    })
}

if (text.includes('.Lion')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .lion udin/nime_',MessageType.text, { quoted: m } );
}
if (text.includes('.lion')){
var porn = text.split(".lion ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=lionlogo&text1=${text1}&text2=${text2}&apikey=${tobzkey}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Sedang diproses⏳ silahkan tunggu sebentar', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
        })
    })
}

if (text.includes('.Glitch')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .glitch udin/nime_',MessageType.text, { quoted: m } );
}
if (text.includes('.glitch')){
var porn = text.split(".glitch ")[1];
    var text1 = porn.split("/")[0];
    var text2 = porn.split("/")[1];
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=glitch&text1=${text1}&text2=${text2}&apikey=${tobzkey}`).then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, '[ WAIT ] Sedang diproses⏳ silahkan tunggu sebentar', MessageType.text, { quoted: m })
            conn.sendMessage(id, buf, MessageType.image, { quoted: m });
        })
    })
}

if (text.includes('.Joker')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .joker udin_',MessageType.text, { quoted: m } );

}
if (text.includes('.joker')){
const teks = text.replace(/.joker /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=jokerlogo&text=${teks}&apikey=${tobzkey}`)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Blood')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .blood udin_',MessageType.text, { quoted: m } );

}
if (text.includes('.blood')){
const teks = text.replace(/.blood /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=blood&text=${teks}&apikey=${tobzkey}`)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Water')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .water udin_',MessageType.text, { quoted: m } );

}
if (text.includes('.water')){
const teks = text.replace(/.water /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=dropwater&text=${teks}&apikey=${tobzkey}`)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Neon1')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .neon1 udin_',MessageType.text, { quoted: m } );

}
if (text.includes('.neon1')){
const teks = text.replace(/.neon1 /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=neon_technology&text=${teks}&apikey=${tobzkey}`)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Snow')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .Snow udin_',MessageType.text, { quoted: m } );
}
if (text.includes('.snow')){
const teks = text.replace(/.snow /, "")
    axios.get(`https://tobz-api.herokuapp.com/api/textpro?theme=snow&text=${teks}&apikey=${tobzkey}`)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Luxy')){

conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .Luxy udin_',MessageType.text, { quoted: m } );

}

if (text.includes('.luxy')){
var teks = text.replace(/.luxy /, "")
var url = "https://arugaz.my.id/api/textpro/luxury?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Neon3d')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .neon3d udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.neon3d')){
var teks = text.replace(/.neon3d /, "")
var url = "https://arugaz.my.id/api/textpro/text3d?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Blackping')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .blackpink udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.blackping')){
var teks = text.replace(/.blackping /, "")
var url = "https://arugaz.my.id/api/textpro/blackpink?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Cloud')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .cloud udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.cloud')){
var teks = text.replace(/.cloud /, "")
var url = "https://arugaz.my.id/api/textpro/realcloud?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}


if (text.includes('.Sky')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : . sky udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.sky')){
var teks = text.replace(/.sky /, "")
var url = "https://arugaz.my.id/api/textpro/realcloud?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Sand1')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .sand1 udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.sand1')){
var teks = text.replace(/.sand1 /, "")
var url = "https://arugaz.my.id/api/textpro/sandsummer?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Sand2')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .sand2 udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.sand2')){
var teks = text.replace(/.sand2 /, "")
var url = "https://arugaz.my.id/api/textpro/sandwrite?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Sand3')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .sand3 udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.sand3')){
var teks = text.replace(/.sand2 /, "")
var url = "https://arugaz.my.id/api/textpro/sandengraved?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Sand4')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .sand4 udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.sand4')){
var teks = text.replace(/.sand4 /, "")
var url = "https://arugaz.my.id/api/textpro/sandsummery?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Balon')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .balon udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.balon')){
var teks = text.replace(/.balon /, "")
var url = "https://arugaz.my.id/api/textpro/foilballoon?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Metal')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .metal udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.metal')){
var teks = text.replace(/.metal /, "")
var url = "https://arugaz.my.id/api/textpro/metaldark?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Old')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .old udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.old')){
var teks = text.replace(/.old /, "")
var url = "https://arugaz.my.id/api/textpro/old1917?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Holo')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .holo udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.holo')){
var teks = text.replace(/.holo /, "")
var url = "https://arugaz.my.id/api/textpro/holographic?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Coding')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .coding udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.coding')){
var teks = text.replace(/.coding /, "")
var url = "https://arugaz.my.id/api/textpro/matrixtext?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Thunder')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .thunder udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.thunder')){
var teks = text.replace(/.thunder /, "")
var url = "https://arugaz.my.id/api/textpro/thundertext?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Neon4')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .neon4 udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.neon4')){
var teks = text.replace(/.neon4 /, "")
var url = "https://arugaz.my.id/api/textpro/neontext?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

if (text.includes('.Neon5')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .neon5 udin_',MessageType.text, { quoted: m } );
}

if (text.includes('.neon5')){
var teks = text.replace(/.neon5 /, "")
var url = "https://arugaz.my.id/api/textpro/greenneon?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}  

if (text.includes('.Neon2')){

conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .neon2 udin_',MessageType.text, { quoted: m } );

}

if (text.includes('.neon2')){
var teks = text.replace(/.neon2 /, "")
var url = "https://arugaz.my.id/api/textpro/neonlight?text=" + teks;

    axios.get(url)
    .then((res) => {
      imageToBase64(url)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat teks⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

//Quotes maker
if (text.includes('.Kata')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .kata matamu indah bagai pelangi/udin_',MessageType.text, { quoted: m } );
}
if (text.includes('.kata')){
    const gh = text.split(".kata ")[1];
    const kata = gh.split("/")[0];
    const author = gh.split("/")[1];
    axios.get(`https://terhambar.com/aw/qts/?kata=${kata}&author=${author}&tipe=rain`)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Membuat quotes⏳ silahkan tunggu', MessageType.text, { quoted: m } )
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image, { quoted: m } )
        })
    })
}

  //jadwal tv nasional
if (text.includes('.Jadwaltv')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .jadwaltv rcti_',MessageType.text, { quoted: m } );
}
if (text.includes(".jadwaltv")){
const teks = text.replace(/.jadwaltv /, "")
axios.get(`https://mhankbarbars.herokuapp.com/api/jdtv?ch=${teks}&apiKey=${apibarbar}`).then((res) => {
    conn.sendMessage(id, '[ WAIT ] Menampilkan jadwal tv⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //Informasi BMKG
if (text.includes('.Bmkg')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
if (text.includes(".bmkg")){
	axios.get(`https://mnazria.herokuapp.com/api/bmkg-gempa`).then ((res) => {
	conn.sendMessage(id, '[ WAIT ] Searching info BMKG⏳ silahkan tunggu', MessageType.text, { quoted: m } )
	let hasil =`${res.data.result}\n*Saran* : ${res.data.saran}`
	conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } )
    })
}

//Kamus besar bahasa indonesia
if (text.includes('.Kbbi')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : kbbi manusia_',MessageType.text, { quoted: m } );
}
if (text.includes(".kbbi")){
const teks = text.replace(/.kbbi /, "")
axios.get(`https://mhankbarbars.herokuapp.com/api/kbbi?query=${teks}&apiKey=${apibarbar}`).then((res) => {
    let hasil = `*Hasil* :\n${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

//Hari nasional
if (text.includes('.Tglnas')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .tglnas 17 agustus_',MessageType.text, { quoted: m } );
}
if (text.includes(".tglnas")){
const teks = text.replace(/.tglnas /, "")
axios.get(`https://api.haipbis.xyz/harinasional?tanggal=${teks}`).then((res) => {
    let hasil = `*Tanggal* : ${res.data.tanggal}\n*Keterangan* : ${res.data.keterangan}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

//Get zodiak
if (text.includes('.Getzodiak')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .getzodiak udin & 09-09-2009_',MessageType.text, { quoted: m } );
}
if (text.includes('.getzodiak')){
    const gh = text.split(".getzodiak ")[1];
    const nama = gh.split("&")[0];
    const tgl = gh.split("&")[1];
    axios.get(`https://arugaz.herokuapp.com/api/getzodiak?nama=${nama}&tgl-bln-thn=${tgl}`)
    .then((res) => {
    conn.sendMessage(id, '[ WAIT ] Get zodiak⏳ silahkan tunggu', MessageType.text, { quoted: m } )
    let hasil = `*Nama* : ${res.data.nama}\n*Tanggal lahir* : ${res.data.lahir}\n*Ultah* : ${res.data.ultah}\n*Usia* : ${res.data.usia}\n*Zodiak* : ${res.data.zodiak}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
    })
}

//Random Al-Qur'an
if (text.includes('.Ngaji')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}
else if (text == '.ngaji'){
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

//Random loli
if (text.includes('.Loli')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}

//Random neko
if (text.includes('.Neko')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
}

//Primbon kecocokan berdasarkan nama
if (text.includes('.Couple')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .couple udin & udan_',MessageType.text, { quoted: m } );
}
if (text.includes('.couple')){
    const gh = text.split(".couple ")[1];
    const lu = gh.split("&")[0];
    const doi = gh.split("& ")[1];
    axios.get(`https://arugaz.herokuapp.com/api/jodohku?nama=${lu}&pasangan=${doi}`)
    .then((res) => {
    let hasil = `*Kecocokan berdasarkan nama*\n\n   *Nama* : ${res.data.nama}\n   *Pasangan* : ${res.data.pasangan}\n\n*Positif* : ${res.data.positif}\n*Negatif* : ${res.data.negatif}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}
//Primbon arti nama
if (text.includes('.Arti')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .arti udin_',MessageType.text, { quoted: m } );
}
if (text.includes(".arti")){
const teks = text.replace(/.arti /, "")
axios.get(`https://arugaz.herokuapp.com/api/artinama?nama=${teks}`).then((res) => {
    let hasil = `*Arti dari namanu adalah*\n\n    *${teks}* ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}
//simsimi
if (text.includes('.Bot')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .bot apa kabar_',MessageType.text, { quoted: m } );
}
if (text.includes(".bot")){
const teks = text.replace(/.bot /, "")
axios.get(`https://st4rz.herokuapp.com/api/simsimi?kata=${teks}`).then((res) => {
    let hasil = `${res.data.result}\n\n*Simsimi chat*`;
    conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
})
}

  //Menu
if (text.includes('.menu')) {
 var nomor = m.participant
 const options = {
       text: `*Olá @${nomor.split("@s.whatsapp.net")[0]} sou o ${BotName}* 


 「 TEC BOT 」  


 🔥➤  Prefixo:  *「 . 」*
 🔥➤ Status: *「 Online 」*
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏  

▣══─「 ${Informações} 」─══▣
├⊱ *.Menu*
🔥➤[Gera o menu de comandos do bot]
├⊱ *.Info*
🔥➤[Gera as informações do bot]
├⊱ *.Owner*
🔥➤[Manda o número do criador do bot]
╰────────────⊱

╭════•›「 Grupo 」
├≽️ *.Intro*
├≽️ *.Setname*
🔥➤[Muda o nome do grupo]
├≽️ *.Setdesc*
🔥➤[Muda a descrição do grupo]
├≽️ *.Opengc*
🔥➤[Abre o grupo]
├≽️ *.Closegc*
🔥➤[Fecha o grupo para somente admins]
├≽️ *!Notif (texto)*
🔥➤[Envia uma mensagem para todos do grupo serem marcados]
╰────────────⊱  

╭════•›「 Jogos 」 
├≽️ *.Tebakgambar*
├≽️ *.Family100*
├⊱ *.Tod (teks)*
├ _.Truth_ 
├ _.Dare_ 
├≽️ *Kerang ajaib*
├ _.Apakah_ 
├ _.Bolehkah_ 
├ _.Kapan_ 
╰────────────⊱

╭════•›「 Diversão 」 
├≽️ *.Pantun*
🔥➤ [Gera um poema aleatório]
├≽️ *.Receh*
🔥➤ [Gera piadas aleatórias]
├≽️ *.Statpack*
🔥➤ [Gera piadas aleatórias bapack]
├≽️ *.Gombal*
🔥➤ [Palavra aleatória]
├≽️ *.Say*
🔥➤ [Ex = .Tec bot]
├≽️ *.Nime (nome anime)*
🔥➤ [Ex: .Nime naruto] 
├≽️ *.Namae*
🔥➤ [Ex = .Namae Lonny] 
├≽️ *.Alay*
🔥➤ [Ex = .Alay Está voando]
├≽️ *.Puisi1*
├≽️ *.Puisi2*
├≽️ *.Puisi3*
🔥➤ [Random puisi]
├≽️ *.Cerpen*
🔥➤ [Histórias curtas aleatórias]
├≽️ *.Tagme*
🔥➤ [Se marque]
├≽️ *.Seberapagay*
🔥➤ [Porcentagem de gay]
├≽️ *.Seberapabucin*
🔥➤ [Porcentagem de Bucin]
├≽️ *.Ping*
🔥➤ [Conheça a velocidade de resposta]
├≽️ *.Chatprank (teks1/teks2)*
🔥➤ [Ex : .Chatprank Hai bang/sat]
├≽️ *.Alay (texto)*
🔥➤ [Ex : .Alay By Lonny]
╰────────────⊱

╭════•›「 PRIMBON 」 
├≽️ *.Arti (seu nome)*
🔥➤ [Ex = .Arti pedro]
├≽️ *.Couple (Seu nome & doi)*
🔥➤ [Ex = .Couple pedro & rogério] 
├≽️ *.Getzodiak*
🔥➤ [Ex : .Getzodiak pedro & 09-09-2002] 
├≽️ *.Zodiak (zodiak)*
🔥➤ [Ex : .Zodiak libra] 
├≽️ *.Mimpi (texto)*
🔥➤ [Ex : .Mimpi serpente]
╰────────────⊱

╭════•›「 Ferramentas 」 
├≽️ *.Stiker*
🔥➤ [Envie uma foto vídeo ou gif com .stiker]
├≽️ *.Nulis*
🔥➤ [Ex = .Nulis termux school bot]
├≽️ *.Ocr*
🔥➤ [Pegue frases na imagem]
├≽️ *.Stalk (username ig)*
🔥➤ [Ex = .Stalk @lonny.ofc]
├≽️ *.Shortlink (link)*
🔥➤ [Encurtar links]
╰────────────⊱

╭════•›「 PICTURE 」 
├≽️ *.Cecan/.Cogan*
🔥➤ [Foto aleatória de menina / menino]
├≽️ *.Anime*
🔥➤ [Foto aleatória anime]
├≽️ *.Loli*
🔥➤ [Foto aleatória de loli]
├≽️ *.Neko*
🔥➤ [Fotos aleatórias de neko]
├≽️ *.Quotes*
🔥➤ [Random foto quotes]
├≽️ *.Twit*
🔥➤ [Twit aleatório]
├≽️ *.Wp*
🔥➤ [Wallpaper aleatório]
├≽️ *.Img (nome procurado)*
🔥➤ [Ex = .Img flores]
├≽️ *.Meme*
🔥➤ [Fotos aleatórias engraçadas]
╰────────────⊱

╭════•›「 TEXT 」 
├≽️ *.Kata (citações / autor)*
🔥➤ [Ex = .Kata Eu amo ele / udin]
├≽️ *.Logopornhub (texto1/texto2)*
🔥➤ [Ex : .Logopornhub TEC/BOT]
├≽️ *.Lion (texto1/texto2)*
🔥➤ [Ex : .Lion Udin/nime]
├≽️ *.Ninja (teks1/teks2)*
🔥➤ [Ex : .Ninja Udin/nime] 
├≽️ *.Wolf (teks1/teks2)*
🔥➤ [Ex : .Wolf TEC/BOT]
├≽️ *.Glitch (teks1/teks2)*
🔥➤ [Ex : .Glich TEC/BOT]
├≽️ *.Snow (texto)*
🔥➤ [Ex : .Snow TEC BOT]
├≽️ *.Neon1 (teks)*
🔥➤ [Ex : .Neon1 TEC BOT]
├≽️ *.Neon2 (teks)*
🔥➤ [Ex : .Neon2 TEC BOT]
├≽️ *.Neon3d (teks)*
🔥➤ [Ex : .Neon3d TEC BOT]
├≽️ *.Neon4 (teks)*
🔥➤ [Ex : .Neon4 TEC BOT]
├≽️ *.Neon5 (teks)*
🔥➤ [Ex : .Neon5 TEC BOT]
├≽️ *.Sand1 (teks)*
🔥➤ [Ex : .Sand1 TEC BOT]
├≽️ *.Sand2 (teks)*
🔥➤ [Ex : .Sand2 TEC BOT]
├≽️ *.Sand3 (teks)*
🔥➤ [Ex : .Sand3 TEC BOT]
├≽️ *.Sand4 (teks)*
🔥➤ [Ex : .Sand4 TEC BOT]
├≽️ *.Sky (teks)*
🔥➤ [Ex : .Sky TEC BOT]
├≽️ *.cloud (teks)*
🔥➤ [Ex : .Cloud TEC BOT]
├≽️ *.Blood (teks)*
🔥➤ [Ex : .Blood TEC BOT]
├≽️ *.Water (teks)*
🔥➤ [Ex : .Water TEC BOT]
├≽️ *.Joker (teks)*
🔥➤ [Ex : .Joker TEC BOT]
├≽️ *.Thunder (teks)*
🔥➤ [Ex : .Thunder TEC BOT]
├≽️ *.Coding (teks)*
🔥➤ [Ex : .Coding TEC BOT]
├≽️ *.Luxy (teks)*
🔥➤ [Ex : .Luxy TEC BOT]
├≽️ *.Holo (teks)*
🔥➤ [Ex : .Holo TEC BOT]
├≽️ *.Old (teks)*
🔥➤ [Ex : .Old TEC BOT]
├≽️ *.Balon (teks)*
🔥➤ [Ex : .Balon TEC BOT]
╰────────────⊱

╭════•›「 Educação 」 
├≽️ *.Brainly (Questão)*
🔥➤ [Pegue a resposta de Brainly]
├≽️ *.Ngaji*
🔥➤ [Versos aleatórios do Alcorão]
├≽️ *.Alquran (número do parágrafo)
🔥➤ [Ex : .Alquran 1]
├≽️ *.Wiki*
🔥➤ [Ex = .Wiki História do Lonny BOT] 
├≽️ *.Covid*
🔥➤ _Covid indo últimas informações] 
├≽️ *.Fakta*
🔥➤ _Fato aleatório] 
├≽️ *.Kbbi (palavra)*
🔥➤ _Ex = .Kbbi humano]
├≽️ *.Tgl (A data que procura)*
╰────────────⊱

╭════•›「 Clima 」 
├≽️ *.Bmkg*
├≽️ *.Gempa*
├≽️ *.Cuaca (nome da área)*
╰────────────⊱

╭════•›「 OTHER 」 
├≽️ *.Sholat (nome da área)*
├≽️ *.Jadwaltv (Nome do canal)*
├≽️ *.Lirik*
├≽️ *.Chord*
├≽️ *.Map (nome da área)*
╰────────────⊱

╭════•›「 DOWNLOADER 」 
├≽️ *.Ytmp3/.Ytmp4 link*
├≽️ *.Twt link* 
├≽️ *.Ig link*
├≽️ *.Joox (título da música)*
╰────────────⊱`,
       contextInfo: { mentionedJid: [nomor] }
 }
 conn.sendMessage(id, options, MessageType.text, { quoted: m } )
}




//Pesan kosong
if (text.includes('.chatprank')){
    const gh = text.split(".chatprank ")[1];
    const nama = gh.split("/")[0];
    const tgl = gh.split("/")[1];
 let hasil = `${nama}͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${tgl}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
}
  //Al-Qur'an
if (text.includes('.Alquran')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .alquran 1_',MessageType.text, {quoted: m});
}
if (text.includes(".alquran")){
const teks = text.replace(/.alquran /, "")
axios.get(`https://api.vhtear.com/quran?no=${teks}&apikey=${apivhtear}`).then((res) => {
    let hasil = `*Surah* : ${res.data.result.surah}\n${res.data.result.quran}`;
    conn.sendMessage(id, hasil ,MessageType.text, { quoted: m } );
})
}

  //Gombalan
if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()
      if (is == '.gombal')
      {
         fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/gombal.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }

   };

 //Receh
if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()
      if (is == '.receh')
      {
         fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/receh.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }
   };

  //truth
if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()
      if (is == '.truth')
      {
         fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/truth.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }
   };

  //dare
if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()
      if (is == '.dare')
      {
         fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/dare.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }
   };
  
  //status bapack
if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()
      if (is == '.statpack')
      {
         fetch('https://raw.githubusercontent.com/mrfzvx12/random-scraper/main/random/statusbapack.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text, { quoted: m } )
            });
      }

   };

//tod
if (text.includes('.Tod')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, {quoted: m});
}
if (text.includes('.tod')){
conn.sendMessage(id, `Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang di berikan. 

Silakan pilih :

*.Truth*
*.Dare*

*Selesaikan perintah untuk melakukan TOD selanjutnya* ⚠️` ,MessageType.text, {quoted: m});
}

//traslate enggris
if (text.includes('.Tl')){
conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .tl apa kabar_',MessageType.text, {quoted: m})
}
if (text.includes('.tl')){
    const gh = text.split(".tl ")[1];
    const text1 = gh.split("/")[0];
    const text2 = gh.split("/")[1];
    axios.get(`https://api-translate.azharimm.tk/translate?engine=google&text=${text1}&to=${text2}`).then((res) => {
    let hasil = `*Translate* : ${res.data.data.result}`;
            conn.sendMessage(id, hasil, MessageType.text, { quoted: m } )
        })
}

if (text.includes('.kodebahasa')){
conn.sendMessage(id, `Afrikaans = af
Albanian = sq
Amharic = am
Arabic = ar
Armenian = hy
Azerbaijani = az
Basque = eu
Belarusian = be
Bengali = bn
Bosnian = bs
Bulgarian = bg
Catalan = ca
Cebuano = ceb
Chinese (Simplified) = zh-CN
Chinese (Traditional) = zh-TW
Corsican = co
Croatian = hr
Czech = cs
Danish = da
Dutch = nl
English = en
Esperanto = eo
Estonian = et
Finnish = fi
French = fr
Frisian = fy
Galician = gl
Georgian = ka
German = de
Greek = el
Gujarati = gu
Haitian Creole = ht
Hausa = ha
Hawaiian = haw
Hebrew = he or iw
Hindi = hi
Hmong = hmn
Hungarian = hu
Icelandic = is
Igbo = ig
Indonesian = id
Irish = ga
Italian = it
Japanese = ja
Javanese = jv
Kannada = kn
Kazakh = kk
Khmer = km
Kinyarwanda = rw
Korean = ko
Kurdish = ku
Kyrgyz = ky
Lao = lo
Latin = la
Latvian = lv
Lithuanian = lt
Luxembourgish = lb
Macedonian = mk
Malagasy = mg
Malay = ms
Malayalam = ml
Maltese = mt
Maori = mi
Marathi = mr
Mongolian = mn
Myanmar (Burmese) = my
Nepali = ne
Norwegian = no
Nyanja (Chichewa) = ny
Odia (Oriya) = or
Pashto = ps
Persian = fa
Polish = pl
Portuguese (Portugal, Brazil) = pt
Punjabi = pa
Romanian = ro
Russian = ru
Samoan = sm
Scots Gaelic = gd
Serbian = sr
Sesotho = st
Shona = sn
Sindhi = sd
Sinhala (Sinhalese) = si
Slovak = sk
Slovenian = sl
Somali = so
Spanish = es
Sundanese = su
Swahili = sw
Swedish = sv
Tagalog (Filipino) = tl
Tajik = tg
Tamil = ta
Tatar = tt
Telugu = te
Thai = th
Turkish = tr
Turkmen = tk
Ukrainian = uk
Urdu = ur
Uyghur = ug
Uzbek = uz
Vietnamese = vi
Welsh = cy
Xhosa = xh
Yiddish = yi
Yoruba = yo
Zulu = zu`, MessageType.text, {quoted: m});
}

//Hay gay
//Create @mrf.zvx don't delate this, please



})

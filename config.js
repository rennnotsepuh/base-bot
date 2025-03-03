const chalk = require("chalk")
const fs = require("fs")
global.idsaluran = '120363313633262988@newsletter'
global.namesaluran = '- Vemon • Chanels -'
global.sourceurl = 'https://whatsapp.com/channel/0029VaiskcuGJP8O84HwJu0y'

global.ownerNumber = "62882006186099"
global.ownername = "Renn"
global.nomorOwner = ['62882006186099']
global.namaDeveloper = "IG: @Rennnotseepuh"
global.ig = "@rennnotsepuh"
global.yt = "@XioDev"
global.ch = "https://whatsapp.com/channel/0029VaebKhfHVvTY3nvm8Z3O"
//jangn diubh bng
global.botname = "Axira - Botz"
global.packname = "By Axira botz"
global.author = "Wa: 62882006186099\n\n\n\n\n\n\n\n\n\n\n"
global.thumb = fs.readFileSync("./thumb.png")
global.tekspushkon = ""
global.tekspushkonv1 = ""
global.tekspushkonv2 = ""
global.tekspushkonv3 = ""
// Apikey
global.APIs = {
	alfa: 'https://api.zeeoneofc.my.id',
}
global.APIKeys = {
	'https://api.zeeoneofc.my.id': 'JKqddGlPzEcod4P',
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
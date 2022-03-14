const wa = require('@open-wa/wa-automate');
const fs = require('fs')
const readline = require('readline')

const msg = "Hello mother"

wa.create({
  sessionId: "COVID_HELPER",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));


async function start(client) {
	await bulkSend( client )
}


async function bulkSend( client ){
	const filestream = fs.createReadStream('numbers.txt')

	const read = readline.createInterface({
		input: filestream,
		crlfDelay: Infinity
	})

	for await (let num of read){
		num = num.trim()
		num = '221'+num+'@c.us'
		client.sendText(num, msg)

	}
}

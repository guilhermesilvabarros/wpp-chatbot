import venom from 'venom-bot'

import { startBot } from './start-bot.js'

venom
  .create({
    session: 'Whatsapp Bot'
  })
  .then((client) => {
    startBot(client)
  })
  .catch((error) => {
    console.log(error)
  })
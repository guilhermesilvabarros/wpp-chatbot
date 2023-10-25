import { openai } from './lib/openai.js'

/**
 * 
 * @param {import("venom-bot").Whatsapp} client
 */
export function startBot(client) {
  client.onMessage(async (message) => {
    const prompt = process.env.PROMPT

    prompt.replace('{message}', message.content)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        }
      ]
    })

    const botReply = `@${message.author} ${response.choices[0].message.content}`
    const chatName = process.env.CHAT_NAME

    try {
      if (message.isGroupMsg && message.chat.name === chatName) {
        await client.sendText(message.from, botReply)
      }
    } catch (error) {
      console.log(error)
    }
  })
}
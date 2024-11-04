import { ref } from 'vue'
import type { MessageApi } from '@/types'
import feed from './feed.json'

const allMessages = ref<MessageApi[]>([])
loadAllMessages()

function loadAllMessages() {
  feed.forEach((record, index) => {
    allMessages.value[index] = Object.assign({}, record, { id: index })
  })
}

export async function getMessagesApi(count: number, fromIndex: number) {
  let result: MessageApi[] = []
  const promise: Promise<void> = new Promise((resolve) => {
    setTimeout(() => {
      result = allMessages.value.slice(fromIndex, fromIndex + count)
      resolve()
    }, 500)
  })

  await promise
  return result
}

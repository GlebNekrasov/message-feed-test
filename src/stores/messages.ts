import { defineStore } from 'pinia'
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Message, MessageApi } from '@/types'
import { getMessagesApi } from '@/api'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Message[]>([])
  const isLoading = ref(false)

  require('dayjs/locale/ru')
  dayjs.locale('ru')

  async function loadMessages(count: number): Promise<boolean> {
    isLoading.value = true
    const newMessages = await getMessagesApi(count, messages.value.length)

    if (newMessages.length === 0) {
      isLoading.value = false
      return false
    }

    newMessages.forEach((message) => messages.value.push(messageMapper(message)))
    isLoading.value = false
    return true
  }

  function messageMapper(messageApi: MessageApi): Message {
    const convertedDate = dayjs(messageApi.date)
    return Object.assign({}, messageApi, { date: convertedDate })
  }

  return {
    isLoading,
    messages,
    loadMessages,
  }
})

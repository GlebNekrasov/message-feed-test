<template>
  <div class="message-feed">
    <div :v-if="messages.length">
      <MessageCard
        v-for="message in messages"
        :key="message.id"
        :id="message.id"
        :author-name="message.authorName"
        :author-url="message.authorUrl"
        :content="message.content"
        :content-post-tones="message.contentPostTones"
        :date="message.date"
        class="message-feed__message-card"
      />
    </div>
    <SpinLoader v-if="isLoading" class="message-feed__spin-loader" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMessagesStore } from '@/stores/messages'
import MessageCard from '@/components/MessageCard.vue'
import SpinLoader from '@/components/SpinLoader.vue'

const messagesStore = useMessagesStore()
const { isLoading, messages } = storeToRefs(messagesStore)
const { loadMessages } = messagesStore

async function handleScrollEnd() {
  if (window.innerHeight + window.scrollY > document.body.clientHeight - 200) {
    document.removeEventListener('scroll', handleScrollEnd)
    const isLoaded = await loadMessages(10)

    if (isLoaded) {
      document.addEventListener('scroll', handleScrollEnd)
    }
  }
}

onMounted(async () => {
  do {
    const isLoaded = await loadMessages(10)
    if (!isLoaded) {
      alert('Не получилось загрузить новые сообщения')
      break
    }
  } while (window.innerHeight > document.body.clientHeight - 200)

  document.addEventListener('scroll', handleScrollEnd)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScrollEnd)
})
</script>

<style lang="scss" scoped>
.message-feed {
  &__message-card {
    padding-bottom: 16px;
    padding-top: 16px;

    &:not(:last-child) {
      border-bottom: 1px solid #000000;
    }

    &:deep(.message-card__info) {
      :not(.message-card__author-name) {
        opacity: 0.35;
      }
    }

    &:deep(.message-card__content) {
      opacity: 0.35;
    }
  }

  &__spin-loader {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

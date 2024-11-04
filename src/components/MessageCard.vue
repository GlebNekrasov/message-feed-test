<template>
  <div class="message-card">
    <div class="message-card__info">
      <span>{{ date.format('HH:mm, D MMMM YYYY') }} г.</span>
      <span> / </span>
      <span class="message-card__author-name">{{ authorName }}</span>
      <span> / </span>
      <a :href="authorUrl">{{ authorUrl }}</a>
    </div>
    <MessageContent
      :content="content"
      :content-tones="contentPostTones"
      class="message-card__content"
    />
  </div>
</template>

<script setup lang="ts">
import type { Message } from '../types'
import MessageContent from './MessageContent.vue'

defineProps<Message>()
</script>

<style lang="scss" scoped>
.message-card {
  &__info {
    padding-bottom: 12px;
  }

  &__author-name {
    font-weight: 700;
  }
}
</style>

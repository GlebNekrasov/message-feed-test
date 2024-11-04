<template>
  <div>
    <span
      v-for="(item, index) in coloredContent"
      :key="index"
      :style="`background: ${item.backgoundColor}`"
      class="message-content"
    >
      {{ item.content }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ContentPostTone, ColoredContent } from '../types'
const props = defineProps<{
  content: string
  contentTones: ContentPostTone[]
}>()

const red = [255, 0, 0]
const yellow = [255, 255, 0]
const green = [0, 255, 0]

const coloredContent = highlightContent(props.content, props.contentTones)

function mixColor(ratio: number, color1: number[], color2: number[]) {
  let result = []

  for (let i = 0; i < 3; i++) {
    result[i] = color1[i] * ratio + color2[i] * (1 - ratio)
  }
  return result
}

function getColor(tone: number) {
  if (tone < 0) {
    return mixColor(-1 * tone, red, yellow)
  }

  return mixColor(tone, green, yellow)
}

function highlightContent(content: string, tones: ContentPostTone[]) {
  let result: ColoredContent[] = []
  let currentIndex = 0
  tones.forEach((tone) => {
    if (tone.position > currentIndex) {
      result.push({
        content: content.slice(currentIndex, tone.position),
        backgoundColor: '',
      })
    }

    const color = getColor(tone.tone)

    result.push({
      content: content.slice(tone.position, tone.position + tone.length),
      backgoundColor: `rgb(${color.join(', ')})`,
    })

    currentIndex = tone.position + tone.length
  })

  if (currentIndex < content.length) {
    result.push({
      content: content.slice(currentIndex, content.length),
      backgoundColor: '',
    })
  }

  return result
}
</script>

<style lang="scss" scoped>
.message-content {
  white-space: pre-line;
}
</style>

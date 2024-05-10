<template>
  <div @drop.prevent="onDrop" class="flex justify-center items-center" :class="class" @click="triggerFile">
    <div>
      <slot></slot>
    </div>
    <input type="file" class="hidden" ref="fileInput" @change="fileChange">
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
const emit = defineEmits(['files-dropped'])
defineProps(['class'])
const fileInput = ref(null)

function onDrop(e) {
  emit('files-dropped', [...e.dataTransfer.files])
}

function triggerFile() {
  fileInput.value.click();
}

function fileChange(e) {
  emit('files-dropped', [...e.target.files])
}

function preventDefaults(e) {
  e.preventDefault()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults)
  })
})

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
})
</script>
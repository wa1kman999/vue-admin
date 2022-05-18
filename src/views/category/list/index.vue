<template>
  <Tinymce
    ref="editorRef"
    v-model="value"
  />
</template>

<script lang="ts" setup>
import Tinymce from '@/components/TinymceEditor.vue'
import { ref } from 'vue'
const editorRef = ref(null)
const value = ref(null)
</script>

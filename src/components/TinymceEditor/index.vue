<template>
  <div>
    <editor
      v-model="content"
      :init="initConfig"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import tinymce, { RawEditorOptions } from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme' // 引用主题文件
import 'tinymce/icons/default' // 引用图标文件
import 'tinymce/models/dom'
import 'tinymce/skins/ui/oxide/skin.css'

import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'

const content = ref('')
const initConfig = ref<RawEditorOptions>({
  language_url: './tinymce/langs/zh-Hans.js',
  // language: 'zh_CN',
  // skin_url: './tinymce/skins/ui/oxide',
  menubar: false,
  height: 320,
  plugins: ['image', 'link', 'code', 'table', 'lists'],
  toolbar: 'fontselect fontsizeselect | link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen',
  content_css: 'tinymce/skins/content/default/content.css',
  // content_style: 'p {margin: 5px 0; font-size: 14px}',
  fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
  font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
  branding: false,
  elementpath: false,
  resize: false,
  statusbar: false
})

// 监听编辑器内容变化，自定义处理内容
watch(() => content.value, (value) => {
  // TODO
  console.log(value)
})

onMounted(() => {
  tinymce.init({ initConfig }) // 初始化
})

</script>

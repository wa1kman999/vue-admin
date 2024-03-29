<template>
  <div>
    <Editor
      v-model="state.content"
      :init="init"
      :disabled="disabled"
      @click="onClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, reactive } from 'vue'
import tinymce, { RawEditorOptions } from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme' // 引用主题文件
import 'tinymce/icons/default' // 引用图标文件
import 'tinymce/models/dom'
import 'tinymce/plugins/advlist' // 高级列表
import 'tinymce/plugins/anchor' // 锚点
import 'tinymce/plugins/autolink' // 自动链接
import 'tinymce/plugins/autoresize' // 编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import 'tinymce/plugins/autosave' // 自动存稿
import 'tinymce/plugins/charmap' // 特殊字符
import 'tinymce/plugins/code' // 编辑源码
import 'tinymce/plugins/codesample' // 代码示例
import 'tinymce/plugins/directionality' // 文字方向
// import 'tinymce/plugins/emoticons' // 表情
import 'tinymce/plugins/fullscreen' // 全屏
import 'tinymce/plugins/help' // 帮助
import 'tinymce/plugins/image' // 插入编辑图片
import 'tinymce/plugins/importcss' // 引入css
import 'tinymce/plugins/insertdatetime' // 插入日期时间
import 'tinymce/plugins/link' // 超链接
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/media' // 插入编辑媒体
import 'tinymce/plugins/nonbreaking' // 插入不间断空格
import 'tinymce/plugins/pagebreak' // 插入分页符
import 'tinymce/plugins/preview' // 预览
import 'tinymce/plugins/quickbars' // 快速工具栏
import 'tinymce/plugins/save' // 保存
import 'tinymce/plugins/searchreplace' // 查找替换
import 'tinymce/plugins/table' // 表格
import 'tinymce/plugins/template' // 内容模板
import 'tinymce/plugins/visualblocks' // 显示元素范围
import 'tinymce/plugins/visualchars' // 显示不可见字符
import 'tinymce/plugins/wordcount' // 字数统计
import { uploadFile } from '@/api/article'
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  plugins: {
    type: String,
    default:
        'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount autosave '
  },
  toolbar: {
    type: String,
    default:
        `fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
        styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
        table image media charmap pagebreak insertdatetime preview | code selectall | indent2em lineheight formatpainter axupimgs`
  }
})
const state = reactive({
  content: props.value
})

const init = ref<RawEditorOptions>({
  language_url: '/tinymce/langs/zh-Hans.js', // 汉化包
  language: 'zh-Hans', // 语言类型
  skin_url: '/tinymce/skins/ui/oxide', // 皮肤
  plugins: props.plugins, // 插件配置
  toolbar: props.toolbar, // 工具栏配置，设为false则隐藏
  fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', // 字体大小
  font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
  // height: 600, // 注：引入autoresize插件时，此属性失效
  placeholder: '在这里输入文字...',
  branding: false, // tiny技术支持信息是否显示
  resize: 'both', // 编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
  // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
  elementpath: false, // 元素路径是否显示
  content_css: ['tinymce/skins/content/default/content.css'],
  menubar: 'file edit insert view format table',
  // content_style: 'p {margin: 5px 0; font-size: 14px}',
  // 后端处理程序的url
  // images_upload_url: import.meta.env.VITE_API_BASEURL + '/goblog/v1/article/img',
  // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
  // 允许粘贴
  paste_data_images: true,
  // 自己上传
  images_upload_handler: (blobInfo, _progress) => new Promise((resolve, reject) => {
    if (blobInfo.blob().size / 1024 / 1024 > 2) {
      reject(new Error('上传失败,图片大小请控制在2M内'))
    } else {
      uploadFile({ file: blobInfo.blob() }).then(res => {
        resolve(import.meta.env.VITE_API_BASEURL + '/goblog/v1/article/img/' + res.path)
      })
    }
  })
})

const emits = defineEmits(['input', 'onClick'])
const onClick = (e: any) => {
  emits('onClick', e, tinymce)
}

onMounted(() => {
  tinymce.init({})
})

watch(
  () => state.content,
  (content) => {
    state.content = content
  }
)

watch(
  () => state.content,
  (newValue) => {
    emits('input', newValue)
  }
)

</script>

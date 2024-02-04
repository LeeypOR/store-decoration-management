<template>
<div>
  <textarea :id="idText" :disabled="disabled" ></textarea>
</div>

</template>
<script>

import {makeId} from '@/utils'

export default {
  name: 'tinymce-editor',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      idText: makeId('tinymce'),
      tinymceHtml: '',
      editor: null,
      initValue: true,
      tinyConfig: {
        relative_urls: false,
        convert_urls: false,
        language: 'zh_CN',
        height: 300,
        // icons: 'christmas',
        toolbar_mode: 'sliding',
        content_style: "img {max-width:100%;}",
        plugins: 'link lists image code table wordcount media fullscreen preview paste table axupimgs',
        toolbar: 'fullscreen preview | undo redo removeformat | bold italic underline strikethrough superscript subscript  | fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist table | outdent indent blockquote | link unlink image axupimgs media code',
        paste_data_images: true,
        
        // statusbar: true, // 底部的状态栏
        // menubar: true, // 最上方的菜单
        // toolbar: true, // 最上方的菜单
        branding: false // 水印“Powered by TinyMCE”
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue) {
        if (!this.initValue) return // 仅第一次赋值使用
        newValue = newValue || ''
        if (newValue) {
          this.initValue = false
          if (this.editor) {
            this.editor.setContent(newValue)
          }
        }
      }
    }
  },
  mounted () {
    this.$nextTick(()=> {
      this.initTinymce()
    })
  },
  methods: {
    initTinymce () {
      if (this.editor) return 
      const that = this
      this.tinyConfig.selector = `#${this.idText}`
      this.tinyConfig.file_picker_callback = this.file_picker_callback
      this.tinyConfig.images_upload_handler = this.images_upload_handler
      this.tinyConfig.init_instance_callback = (editor)=> {
        that.editor = editor
        editor.setContent(this.value || '')
        editor.on('change',function(){
          that.initValue = false
          that.$emit('change', editor.getContent())
          that.$emit('input', editor.getContent())
        })
      }
      tinymce.init(this.tinyConfig)
    },
    // 此处为图片上传处理函数
    images_upload_handler(blobInfo, success, failure) {
      const that = this
      const file = blobInfo.blob();
      if (file) {
        that.$upload(null, file).then(res => {
          if (res && res.returnCode === 1000) {
            success(res.dataInfo.url)
          }
        })
      } else {
        failure('上传出错', {remove: true})
      }
    },
    file_picker_callback (callback, value, meta) {
      const that = this
      let accept = '.jpg,.jpeg,.png,.gif,.bmp'
      if (meta.filetype === 'media') {
        accept = '.mp4,.ogg,.webm,.avi'
      }
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = accept
      input.multiple = 'multiple'
      input.click()
      input.addEventListener('change', (e)=> {
        const file = e.target.files[0]
        that.$upload(null, file).then(res => {
          if (res && res.returnCode === 1000) {
            callback(res.dataInfo.url)
          }
        })
      })
    },
  },
  beforeDestroy() {
    tinymce.remove(`#${this.idText}`)
  },
}
</script>
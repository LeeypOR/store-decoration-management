# 描述
```
这里是纯手写开发的自定义组件，不依赖任何UI库
```
1、ImageRadioGroup，ImageRadio，是一个用图形做radio的单选组件。

ImageRadioGroup的事件和属性：
change事件，默认抛出当前选择的value的值。
v-model,绑定当前选择的ImageRadio的值。

ImageRadio的事件和属性：
value:当前选择项的值。
width:当前图片radio的宽度。
height:当前图片radio的高度。
checkedImage:当前图片被选中的样式。
uncheckedImage:当前项未选中的样式
label:当前图片daio对应的文字项，可以不填，默认为空，即只展示图片。
tighten: 布尔类型，默认为false，取消radio的右侧间距，使radio组紧缩成一团。

使用示例如下：
```vue
<template slot="title">
  <ImageRadioGroup class="image_radio_group" @change="changeRadio" v-model="value">
    <ImageRadio
      tighten
      value="1"
      width="115px"
      height="32px"
      :checkedImage="checkedImage01"
      :uncheckedImage="uncheckedImage01"
    ></ImageRadio>
    <ImageRadio
      label="我是图片对应的文字"
      value="2"
      width="115px"
      height="32px"
      :checkedImage="checkedImage02"
      :uncheckedImage="uncheckedImage02"
    ></ImageRadio>
    <ImageRadio
      value="3"
      width="115px"
      height="32px"
      :checkedImage="checkedImage03"
      :uncheckedImage="uncheckedImage03"
    ></ImageRadio>
  </ImageRadioGroup>
</template>
```
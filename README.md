# admin

### 基本信息
```
node版本： > 10
vue版本： 2.6.11
ant-design-vue： 1.7.4（全局导入）
lodash 工具库(js复杂的方法，比如深度克隆cloneDeep，对数组对象的操作，优先使用lodash中的，这里面找不到可用的再自己写)https://www.lodashjs.com/
```
# 菜单配置和跳转

![Image](https://sd.cicd.vpclub.cn:9443/gitlab/Tong/image/raw/master/01.png)

所有涉及到用layout布局的页面，都丢到menuPage里面 ，会自动注册路由。
如上图所示。

![Image](https://sd.cicd.vpclub.cn:9443/gitlab/Tong/image/raw/master/02.png)

配置左侧菜单文件地址：src\router\menu.js  
页面布局里，其中权限authority是用来通过权限控制隐藏显示，如果运营后台没有配权限，这里又加了权限代码，那么会导致菜单和页面无法访问，所以需要先到运营后台去配置菜单权限。运营后台地址和账号群文件里有，不知道怎么配置的问下马卫州或者赵园园。  

如果菜单要跳转，加一下pathname，pathname的值为自动化注册文件的name值，命名规则是路径名的大驼峰。  

例如我现在写的图库首页：  
菜单路径是 图库 /图库设置/图库首页  

那么对应建立的文件夹规则是 ：  
menuPage下的 gallery，这个是图库  
gallerySetting，这是个图库设置  
galleryHomePage，这个是图库首页  
那么路由的name就是  gallery/gallerySetting/galleryHomePage的大驼峰写法：  
GalleryGallerySettingGalleryHomePage  
menu这里的pathname就是  
GalleryGallerySettingGalleryHomePage  

自动注册会忽略掉文件夹中的components，不用担心会生成意料之外的路由。  

建议先做功能，后面基本做完了再配权限。  
menu.js 中的pathname 需要 和 路由的 name保持一致  

### 基本组件（以下组件都在全局引用了）
```
通用的搜索表格组件：<search-table ref="searchtable"></search-table>(可以在页面使用this.$refs.searchtable[data/methods]拿到组件里面的数据,比如导出时使用this.$refs.searchtable.searchParams获取到搜索使用的参数)
搜索时时间范围参考，提交时开始和结束时间用'-'分割分别赋值,<fast-range-picker v-decorator="[ 'startTime-endTime']"/>

表格里图片列使用的组件: <table-img src="图片链接" />(配置参考{title: '法人身份证号反面',dataIndex: 'idNumberBack',key: 'idNumberBack',customRender: (text, record)=><table-img src={text} />},)

权限控制组件: <permission authority="权限值"></permission>

上传图片组件: <upload-image :limit="1" />  (limit可以不传默认是1。就是单图上传，limit>1就是多图上传)

上传文件组件: <upload-file :limit="1" />  (用法同上)

富文本组件 <tinymce-editor />

```
### 常用方法
```
导出: this.$export(url, params)
上传: this.$upload(url="默认上传链接", file)
字典常用的方法： src\utils\dict.createSelectOptions('字典类型')可以使用这个方法直接配置到a-select或者a-radio-group的options属性上，不用使用v-for循环写options，其他字典方法参考文件中的注释）
```


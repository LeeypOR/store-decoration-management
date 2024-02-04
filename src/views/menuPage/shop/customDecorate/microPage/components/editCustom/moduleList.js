export const headerConfig = { // 页面头部配置
  id: 'my-header-123',
  key: 'my-header',
  name: '标题',
  config: {
    title: '页面设置',
    formName: 'my-header-form',
    formData: {
      title: '微页面标题',
      desc: '',
      backgroundColorType: '2',
      defaultBackgroundColor: '#fafafa',
      backgroundColor: '#fafafa'
    }
  }
}

export const moduleListData = {
  baseComponents: [
    {
      key: 'my-search-box',
      name: '商品搜索',
      count: 10,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_spss_default',
      config: {
        title: '商品搜索',
        desc: '这是一个商品搜索',
        formName: 'my-search-box-form',
        formData: {
          borderRadius: '100', //
          textAlign: 'left', // 文字center居中left居左
          height: 40, // 框体高度
          backgroundColor: '#f0f5f8', // 背景颜色
          opacity: 70, // 背景透明度
          borderColor: '#ffffff', // 输入框颜色
          color: '#999999', // 文字颜色
          width: 100, // 宽度%
          position: 0 // 搜索框是否固定
        }
      }
    },
    {
      key: 'PictureAdvertisement',
      name: '图片广告',
      count: 300,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_tpgg_default',
      config: {
        title: '图片广告',
        desc: '这是一个图片广告描述',
        formName: 'PictureAdvertisementForm',
        formData: {
          type: '1', // 1、一行一个,2、轮播,3、小图滑动
          // height: 150,
          // borderRadius: 4, // 字符串，带单位px
          imageList: [{
            imageType: '1', // 1、图片导航,2、文字导航
            imageUrl: '', // 显示图片的链接
            title: '', // 标题
            jumpPageId: '', // 跳转的页面的id，字符串
            jumpPageName: '', // 跳转的页面的名称，字符串
            jumpPageUrl: '', // 跳转的页面的地址，字符串
            jumpPageType: '',
            hotAreaConfigInfoList: [ // 热区选区信息集合。
              // {
              //   id:'323123', // 随机的不重复id，字符串
              //   top: 0, // 字符串，带单位px
              //   left: 0, // 字符串，带单位px
              //   width: 0, // 字符串，带单位px
              //   height: 0, // 字符串，带单位px
              //   sort: 4,
              //   jumpPageId: '',
              //   jumpPageName: ''
              // }
            ]
          }],
          styleType: '1', // 图片样式： 1、常规,2、阴影
          borderType: '1', // 图片倒角： 1、直角,2、圆角
          fillStyle: '1', // 填充样式： 1、填充, 2、周围留白
          pointer: '1', // 指示器  1、样式一, 2、样式二
          pagePadding: 0, // 页面边距
          imagePadding: 0, // 图片边距
          carouselHeight: 200 // 轮播图高度
        }
      }
    },
    {
      key: 'my-title-text',
      name: '标题文本',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_bttw_default',
      config: {
        title: '标题文本',
        desc: '这是一个标题文本',
        formName: 'my-title-text-form',
        formData: {
          title: '', // 标题
          describe: '', // 描述文字
          textAlign: 'left', // 显示位置
          titleSize: 16, // 标题大小
          txtSize: 16, // 描述大小
          titleThickness: 'normal', // 标题粗细
          txtThickness: 'normal', // 描述粗细
          titleColor: '#333333', // 标题颜色
          txtColor: '#999999', // 描述颜色
          bottomLine: false, // 底部分割线
          more: false, // 查看更多
          styleValue: 1, // 样式
          prompt: '查看更多', // 提示语
          jumpPageId: '', // 跳转链接Id
          jumpPageName: '', // 跳转链接name
          jumpPageUrl: '', // 跳转的页面的地址，字符串
          jumpPageType: '', // 跳转链接type
          titleSpace: 0, // 标题字间距
          titleHeight: 1.5, // 标题行间距
          textSpace: 0, // 描述字间距
          textHeight: 1.5, // 描述行间距
          text_titleSpace: 0,// 标题和描述距离
        }
      }
    },
    {
      key: 'my-video',
      name: '视频',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_shipin_default',
      config: {
        title: '视频',
        desc: '这是一个视频',
        formName: 'my-video-form',
        formData: {
          videoUrl: '', // 视频链接
          imgUrl: '', // 视频封面图片链接
          pagePadding: 0, // 页面边距
          title: '', // 跳转文字
          iconUrl: '', // 跳转文字前面图标
          customType: false, // 自定义封面 true是 false原视频封面
          isShowBtn: false, // 是否显示按钮
          isBtnType: 1, // 1:图标2：文字3图标和文字
          jumpPageId: '', // 跳转的页面的id，字符串
          jumpPageName: '', // 跳转的页面的名称，字符串
          jumpPageUrl: '', // 跳转的页面的地址，字符串
          jumpPageType: '' // 页面种类根据后端返回来
        }
      }
    },
    {
      key: 'my-nav-bar',
      name: '图文导航',
      count: 10,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_twdh_default',
      config: {
        title: '图文导航',
        desc: '这是一个导航',
        formName: 'my-nav-bar-form',
        formData: {
          type: '1', // 1、单链接,2、热区
          color: '#333333', // 文字颜色
          backgroundColor: '#ffffff', // 背景颜色
          isBottom: 1, // 是否固定底部
          boxHeight: 73, // 图片盒子高度
          imgHeight: 40, // 图片高度
          imgType: 2, // 图片样式1固定 2滑动
          imageList: [{
            imageType: '1', // 1、单链接,2、热区
            imageUrl: '', // 显示图片的链接
            imageTitle: '导航一', // 标题
            jumpPageId: '', // 跳转的页面的id，字符串
            jumpPageName: '', // 跳转的页面的名称，字符串
            jumpPageUrl: '', // 跳转的页面的地址，字符串
            jumpPageType: '' // 页面种类根据后端返回来
          },
          {
            imageType: '1', // 1、单链接,2、热区
            imageUrl: '', // 显示图片的链接
            imageTitle: '', // 标题
            jumpPageId: '', // 跳转的页面的id，字符串
            jumpPageName: '', // 跳转的页面的名称，字符串
            jumpPageUrl: '', // 跳转的页面的地址，字符串
            jumpPageType: '' // 页面种类根据后端返回来
          }, {
            imageType: '1', // 1、单链接,2、热区
            imageUrl: '', // 显示图片的链接
            imageTitle: '', // 标题
            jumpPageId: '', // 跳转的页面的id，字符串
            jumpPageName: '', // 跳转的页面的名称，字符串
            jumpPageUrl: '', // 跳转的页面的地址，字符串
            jumpPageType: '' // 页面种类根据后端返回来
          }, {
            imageType: '1', // 1、单链接,2、热区
            imageUrl: '', // 显示图片的链接
            imageTitle: '', // 标题
            jumpPageId: '', // 跳转的页面的id，字符串
            jumpPageName: '', // 跳转的页面的名称，字符串
            jumpPageUrl: '', // 跳转的页面的地址，字符串
            jumpPageType: '' // 页面种类根据后端返回来
          }, {
            imageType: '1', // 1、单链接,2、热区
            imageUrl: '', // 显示图片的链接
            imageTitle: '', // 标题
            jumpPageId: '', // 跳转的页面的id，字符串
            jumpPageName: '', // 跳转的页面的名称，字符串
            jumpPageUrl: '', // 跳转的页面的地址，字符串
            jumpPageType: '' // 页面种类根据后端返回来
          }]
        }
      }
    },
    {
      key: 'my-commodity',
      name: '商品',
      count: 100,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_shangpin_default',
      config: {
        title: '商品',
        desc: '这是一个标题文本',
        formName: 'my-commodity-form',
        formData: {
          shopType: '0', // 商品样式'0无边白底1卡片投影'
          listStyle: '0', // 列表样式0大图模式1列表
          angleType: '0', // 商品倒角0直角1圆角
          angleNum: 2, // 倒角数量 1 2个 2 4个
          imgScale: '0', // 图片比例0 '3:4',1 '1:1',2 '3:4',3 '16:9'
          imgFill: '1', // 图片填充 0填充,1周边留白（默认）
          textAlign: 'left', // 显示位置
          titleThickness: 'normal', // 标题粗细bold:粗 nomarl:正常
          shopDescription: true, // 商品描述
          shopName: true, // 商品名称
          shopPrices: true, // 商品价格
          marketPrice: false, //划线价格
          shopBadge: true, // 商品角标
          shopBuyBtn: true, // 购买按钮
          btnType: 1, // 按钮样式
          shopOriginalPrices: false, // 商品销量
          pagePadding: 15, // 页面边距
          imagePadding: 10, // 图片间距
          badgeType: 1, // 商品角标样式 1：热销 2：火拼 3：自定义
          badgeImgUrl: '', // 角标图片 样式3的情况显示
          showAllShop: false, // 是否显示全部商品
          shopListType: 1, // 1商品 2商品分组
          imageList: [], // 商品列表
          shopList: [], // 商品分类列表
          checkType: '1' // 1商品 2商品分类
          /*
           id: item.id,商品id
              groupName: item.groupName,分组名字
              goodsPicture: item.goodsPicture,商品
              groupTableName: item.groupName,分组名字
              shopNumber:6  商品显示数量
               */
        }
      }
    },
    {
      key: 'my-magic',
      name: '魔方',
      count: 300,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_mofang_default',
      config: {
        title: '魔方',
        desc: '这是一个魔方',
        formName: 'my-magic-form',
        formData: {
          templateType: '0', // 模版类型
          total: 1, // 图片个数
          magicVal: '4', // 魔方密度
          angleType: '0', // 倒角 0直角 1圆角
          pagePadding: 10, // 页边距
          itemPadding: 10, // 图片边距
          height: 375, // 魔方占位高度
          itemList: [
            {
              imgWidth: 375, // 图片宽度
              imgHeight: 200, // 图片高度
              top: 0, // 图片位置
              left: 0, // 图片位置
              imgUrl: '', // 图片地址
              jumpPageId: '', // 跳转的页面的id，字符串
              jumpPageName: '', // 跳转的页面的名称，字符串
              jumpPageUrl: '', // 跳转的页面的地址，字符串
              jumpPageType: '',
              textShow: 0, // 是否有文字描述
              textCon: '', // 文本内容
              textAlign: 'left', // 文本对齐
              textSize: 12, // 文本大小
              textThickness: 'normal', // 文本粗细 bold:粗 normal:正常
              textSpace: 0, // 文字间距
              textColor: '#ffffff', // 文本颜色
              textBgColor: '#000000', // 文本背景颜色
              textBgOpacity: 50, // 文本背景透明度
              rowNum: 0, // 宽度数目
              colNum: 0, // 高度数目
              x: 0, // 开始x坐标
              y: 0,// 开始y坐标
              boxHeight: 25,  //文字背景高度
              boxWidth: 30,  //文字背景宽度
              boxBorderShow: true, // 边框是否显示
              boxBorderColor: '#ffffff', //边框颜色
              boxBorderRadius: 0, //背景圆角
              boxTop: 0,  //背景top值
              boxLeft: 0, //背景left值
            }
          ]
        }
      }
    },
    {
      key: 'my-divide',
      name: '辅助分割',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_fzfg_default',
      config: {
        title: '辅助分割',
        desc: '这是一个辅助分割',
        formName: 'my-divide-form',
        formData: {
          divideType: '0', // 0辅助空白，1辅助线
          blankHeight: 30, // 空白高度
          lineType: 'solid', // 辅助线类型 solid实线 dashed虚线 dotted点线
          left_rightType: '0', // 0无边距，1左右留边
          lineColor: '#e6e6e6', // 辅助线颜色,
          blankColor: '#ffffff',//空白背景颜色
        }
      }
    },
    {
      key: 'my-notice',
      name: '公告',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_middle_modalbox_gonggao_default',
      config: {
        title: '公告',
        desc: '这是一个公告',
        formName: 'my-notice-form',
        formData: {
          bgColor: '#FFF8E8', // 背景颜色
          color: '#666666', // 文字颜色
          textCon: '' // 文字内容
        }
      }
    },
    {
      key: 'my-Fiexd-icon',
      name: '悬浮',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_xuangfu',
      config: {
        title: '悬浮组件',
        desc: '这是一个公告',
        formName: 'my-fiexd-icon-form',
        formData: {
          listStyle: '0', // 模板样式
          floatPosition: '0', // 悬浮位置
          badgeType: 1, // 1 自定义内容 2 显示会员信息 3 客服 4跳转微信公众号
          top: 0, // 高度百分比
          left: 0, // 左右百分比
          correctLeft: 0, // 计算后的高度百分比
          maxHeightNum: 100,//所有组件高度
          // imageWidth:60,//图片宽度
          // imageHeight:60,//
          imageUrl: '', // 图片链接
          imgTitle: '', // 图片大标题
          imgTitleS: '', // 图片小标题
          jumpPageId: '', // 跳转链接
          jumpPageType: '', // 跳转类型
          jumpPageName: '', // 跳转页面名称
          jumpPageUrl: '', // 跳转的页面的地址，字符串
          imgWidth: 60, // 图片宽度
          bgColor: '#ffffff', // 背景颜色
          color: '#666666', // 文字颜色
          textCon: '', // 文字内容
          publicLink: '',// 公众号地址
          backgroundColorType: 1, //1 白色 2 金色 3自定义背景
          backgroundUrl: '',//自定义背景图片地址
          fontColor: '#333333',//样式四字体颜色
          domH: 0, //页面高度
        }
      }
    },
    {
      key: 'my-article',
      name: '内容资讯',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_dpbikp_default',
      config: {
        title: '内容资讯',
        desc: '这是一个内容资讯',
        formName: 'my-article-form',
        formData: {
          templateType: 'scroll', // 模版类型 scroll 横向滑动 flex 瀑布流
          styleType: 'none', // 样式 none无边白底 border描边白底 shadow卡片投影
          angleType: '0', // 倒角 0直角 1圆角
          textThickness: 'normal', // 文本样式 bold:粗 normal:正常
          readShow: false, // 阅读数
          praiseShow: false, // 点赞数
          labelShow: false, // 文章标签
          moreShow: false, // 查看更多
          articleList: [
            {
              jumpPageId: '', // 跳转页面id
              jumpPageName: '这里显示笔记标题，最多显示2行', // 跳转页面名称
              jumpPageUrl: '', // 跳转的页面的地址，字符串
              jumpPageType: '', // 跳转页面类型
              jumpPageUrl: '', // 跳转页面链接
              jumpPageData: '', // 小程序id 微页面id
              imgUrl: '', // 跳转页面封面图
              readNum: 0, // 阅读数
              praiseNum: 0, // 点赞数
              label: '# 文章标签', // 文章标签
              type: 1 // 文章类型 WEBVIEW公众号 WXMAID小程序
            }
          ]
        }
      }
    },
    {
      key: 'my-rich-text',
      name: '富文本',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_fwb_default',
      config: {
        title: '富文本组件',
        desc: '这是一个公告',
        formName: 'my-rich-text-form',
        formData: {
          remark: '', // 模板样式
          fullscreen: false // 是否全屏
        }
      }
    }
  ],
  advancedComponents: [
    {
      key: 'scene-video',
      name: '场景视频',
      count: 20,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_cjsp_default',
      config: {
        title: '场景视频',
        desc: '这是一个场景视频',
        formName: 'scene-video-form',
        formData: {
          videoUrl: '', // 视频链接
          imgUrl: '', // 视频封面图片链接
          // pagePadding: 0, // 页面边距
          videoHeight: 30, // 视频高度
          maxVideoHeight: 350, // 视频高度最大移动距离
          title: '', // 跳转文字
          iconUrl: '', // 跳转文字前面图标
          customType: false, // 自定义封面 true是 false原视频封面
          isShowBtn: false, // 是否显示按钮
          isBtnType: 1, // 1:图标2：文字3图标和文字
          jumpPageId: '', // 跳转的页面的id，字符串
          jumpPageName: '', // 跳转的页面的名称，字符串
          jumpPageUrl: '', // 跳转的页面的地址，字符串
          jumpPageType: '', // 页面种类根据后端返回来
          scaleVal: '750*900', // 默认裁剪比例
          // 裁剪比例集合
          scaleList: [
            { label: '750*900', value: '750*900', width: 125, height: 150, scale: [5, 6] },
            { label: '750*930', value: '750*930', width: 125, height: 155, scale: [25, 31] },
            { label: '690*720', value: '690*720', width: 115, height: 120, scale: [23, 24] },
            { label: '690*750', value: '690*750', width: 115, height: 125, scale: [23, 25] },
            { label: '自定义', value: 'diy' }
          ],
          backgroundInfo: {
            imageType: '1', // 1、单链接,2、热区
            imageUrl: '', // 显示图片的链接
            imageWidth: 750, // 显示图片的宽度
            imageHeight: 1000, // 显示图片的宽度
            imageTitle: '', // 标题
            jumpPageId: '', // 跳转的页面的id，字符串
            jumpPageName: '', // 跳转的页面的名称，字符串
            jumpPageUrl: '', // 跳转的页面的地址，字符串
            jumpPageType: '',
            hotAreaConfigInfoList: [ // 热区选区信息集合。
              // {
              //   id:'323123', // 随机的不重复id，字符串
              //   top: 0, // 字符串，带单位px
              //   left: 0, // 字符串，带单位px
              //   width: 0, // 字符串，带单位px
              //   height: 0, // 字符串，带单位px
              //   sort: 4,
              //   jumpPageId: '',
              //   jumpPageName: '',
              //   jumpPageUrl: '', // 跳转的页面的地址，字符串
              // }
            ]
          }
        }
      }
    },
    {
      key: 'scene-zone',
      name: '场景专区',
      count: 20,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_cjspa_default',
      config: {
        title: '场景专区',
        desc: '这是一个场景专区',
        formName: 'scene-zone-form',
        formData: {
          zoneModelType: '0', // 专区模式： 0是竖图模式，1是横图模式。
          styleType: '1', // 图片样式： 1、常规,2、阴影
          borderType: '1', // 图片倒角： 1、直角,2、圆角
          isShowBtn: false, // true是 ，false 否
          paddingShow: true, // 是否显示间距
          borderTransparency: 100, // 边框透明度
          videoHeight: 30, // 商品位置
          maxVideoHeight: 350, // 商品位置最大移动距离
          zoneList: [ // 专区列表信息。
            {
              zoneStyle: '1', // 专区样式。1：1图1商品，2:1图2商品，3:1图3商品，4:1图4商品。
              imageOne: '', // 从左往右，从上往下，第1张图。
              zoneImageList: [ // 每一个专区里的cell图片信息合计。从左往右，从上往下的顺序对应专区格子。
                {
                  addType: '1', // 1是添加图片，2是添加商品。
                  // zoneImageUrl: '', // 专区的1个格子里的图片地址。
                  imageType: '1', // 1、单链接,2、热区
                  imageUrl: '', // 显示图片的链接
                  imageTitle: '', // 标题
                  jumpPageId: '', // 跳转的页面的id，字符串
                  jumpPageName: '', // 跳转的页面的名称，字符串
                  jumpPageUrl: '', // 跳转的页面的地址，字符串
                  jumpPageType: '',
                  productList: [ // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
                    // {
                    //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
                    //   productIdImageUrl: '', // 商品图片地址，
                    // }
                  ],
                  hotAreaConfigInfoList: [ // 热区选区信息集合。
                    // {
                    //   id:'323123', // 随机的不重复id，字符串
                    //   top: 0, // 字符串，带单位px
                    //   left: 0, // 字符串，带单位px
                    //   width: 0, // 字符串，带单位px
                    //   height: 0, // 字符串，带单位px
                    //   sort: 4,
                    //   jumpPageId: '', // 跳转的页面的id，字符串
                    //   jumpPageName: '', // 跳转的页面的名称，字符串
                    //   jumpPageType: '' // 页面种类根据后端返回来
                    // }
                  ]
                },
                {
                  addType: '1', // 1是添加图片，2是添加商品。
                  imageType: '1', // 1、单链接,2、热区
                  imageUrl: '', // 显示图片的链接
                  imageTitle: '', // 标题
                  jumpPageId: '', // 跳转的页面的id，字符串
                  jumpPageName: '', // 跳转的页面的名称，字符串
                  jumpPageUrl: '', // 跳转的页面的地址，字符串
                  jumpPageType: '',
                  productList: [ // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
                    // {
                    //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
                    //   productIdImageUrl: '', // 商品图片地址，
                    // }
                  ],
                  hotAreaConfigInfoList: [ // 热区选区信息集合。
                  ]
                },
                {
                  addType: '1', // 1是添加图片，2是添加商品。
                  // zoneImageUrl: '', // 专区的1个格子里的图片地址。
                  imageType: '1', // 1、单链接,2、热区
                  imageUrl: '', // 显示图片的链接
                  imageTitle: '', // 标题
                  jumpPageId: '', // 跳转的页面的id，字符串
                  jumpPageName: '', // 跳转的页面的名称，字符串
                  jumpPageUrl: '', // 跳转的页面的地址，字符串
                  jumpPageType: '',
                  productList: [ // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
                    // {
                    //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
                    //   productIdImageUrl: '', // 商品图片地址，
                    // }
                  ],
                  hotAreaConfigInfoList: [ // 热区选区信息集合。
                  ]
                },
                {
                  addType: '1', // 1是添加图片，2是添加商品。
                  // zoneImageUrl: '', // 专区的1个格子里的图片地址。
                  imageType: '1', // 1、单链接,2、热区
                  imageUrl: '', // 显示图片的链接
                  imageTitle: '', // 标题
                  jumpPageId: '', // 跳转的页面的id，字符串
                  jumpPageName: '', // 跳转的页面的名称，字符串
                  jumpPageUrl: '', // 跳转的页面的地址，字符串
                  jumpPageType: '',
                  productList: [ // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
                    // {
                    //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
                    //   productIdImageUrl: '', // 商品图片地址，
                    // }
                  ],
                  hotAreaConfigInfoList: [ // 热区选区信息集合。
                  ]
                },
                {
                  addType: '1', // 1是添加图片，2是添加商品。
                  // zoneImageUrl: '', // 专区的1个格子里的图片地址。
                  imageType: '1', // 1、单链接,2、热区
                  imageUrl: '', // 显示图片的链接
                  imageTitle: '', // 标题
                  jumpPageId: '', // 跳转的页面的id，字符串
                  jumpPageName: '', // 跳转的页面的名称，字符串
                  jumpPageUrl: '', // 跳转的页面的地址，字符串
                  jumpPageType: '',
                  productList: [ // 添加商品的商品信息，是个数组，这里是单独上传永远最多是1个。
                    // {
                    //   id: '', // 商品id，当addType为2的时候，添加的是商品，用这个id跳转。
                    //   productIdImageUrl: '', // 商品图片地址，
                    // }
                  ],
                  hotAreaConfigInfoList: [ // 热区选区信息集合。
                  ]
                }
              ]
            }
          ],
          scaleVal: '750*900', // 默认裁剪比例
          // 裁剪比例集合
          scaleList: [
            { label: '750*900', value: '750*900', width: 125, height: 150, scale: [5, 6] },
            { label: '750*930', value: '750*930', width: 125, height: 155, scale: [25, 31] },
            { label: '690*720', value: '690*720', width: 115, height: 120, scale: [23, 24] },
            { label: '690*750', value: '690*750', width: 115, height: 125, scale: [23, 25] },
            { label: '自定义', value: 'diy' }
          ],
          backgroundInfo: {
            imageType: '1', // 1、单链接,2、热区
            imageUrl: '', // 显示图片的链接
            imageWidth: 750, // 显示图片的宽度
            imageHeight: 1000, // 显示图片的宽度
            imageTitle: '', // 标题
            jumpPageId: '', // 跳转的页面的id，字符串
            jumpPageName: '', // 跳转的页面的名称，字符串
            jumpPageUrl: '', // 跳转的页面的地址，字符串
            jumpPageType: '',
            hotAreaConfigInfoList: [ // 热区选区信息集合。
              // {
              //   id:'323123', // 随机的不重复id，字符串
              //   top: 0, // 字符串，带单位px
              //   left: 0, // 字符串，带单位px
              //   width: 0, // 字符串，带单位px
              //   height: 0, // 字符串，带单位px
              //   sort: 4,
              //   jumpPageId: '',
              //   jumpPageName: ''
              // }
            ]
          }
        }
      }
    },
    {
      key: 'limit-seckill',
      name: '限时秒杀',
      count: 10,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_xsms_selected',
      config: {
        title: '限时秒杀',
        desc: '这是一个标题文本',
        formName: 'limit-seckill-form',
        formData: {
          backgroundInfo: {
            imageType: '1', // 1、单链接,2、热区
            imageUrl: '', // 显示图片的链接
            imageTitle: '', // 标题
            jumpPageId: '', // 跳转的页面的id，字符串
            jumpPageName: '', // 跳转的页面的名称，字符串
            jumpPageUrl: '', // 跳转的页面的地址，字符串
            jumpPageType: ''
          },
          backgroundAnleType: '0', // 背景倒角0直角1圆角
          listStyle: '1', // 列表样式：1大图轮播，2 两图轮播，3 三图轮播
          angleType: '0', // 商品倒角0直角1圆角
          titleThickness: 'normal', // 文本样式，nomarl:常规体， bold:加粗体
          textAlign: 'left', // 文本对齐，left，左对齐，middle，居中对齐
          pagePadding: 15, // 页面边距
          imagePadding: 10, // 图片间距
          shopName: true, // 商品名称，true显示，false不显示。下面都一样。
          showShopPrice: true, // 商品价格
          shopBuyBtn: true, // 购买按钮
          buyBtnStyle: '1', // 购买按钮的样式，1，样式1； 2，样式2
          showOldPrice: true, // 商品原价

          // 高级设置
          activeTitleShow: true, // 是否展示活动标题。
          activeDescShow: true, // 是否展示活动描述
          activeTimeShow: true, // 是否展示活动时间。
          activeTitle: '', // 活动标题，为空的时候，展示 新品上市，长度1-8字以内。
          activeTitleSize: 40, // 标题大小
          activeTitleColor: '#333333', // 活动标题颜色
          activeTitleStyle: 'normal', // 标题文本样式，nomarl:常规体， bold:加粗体
          description: '', // 活动描述，为空的时候，展示 新品发售 抢先体验，长度1-15字以内。
          descriptionSize: 20, // 描述大小
          activeDescColor: '#333333', // 活动描述文字颜色
          descriptionStyle: 'normal', // 描述文本样式，nomarl:常规体， bold:加粗体
          showActiveTime: true, // 活动时间，
          backgroundColor: '#999999', // 时间底色
          timeSize: 20, // 时间大小
          activeTimeColor: '#333333', // 时间颜色。
          timeStyle: 'normal', // 时间文本样式， nomarl: 常规体， bold: 加粗体
          backgroundTransparency: 100, // 透明度
          textTop: 5, //文字距离顶部的高度
          goodsBottom: 5, //商品距离底部的高度
          textLineHeight: 5, // 文字行间距

          productList: [// 活动商品列表
            // {
            // activeType: '', 活动类型，0秒杀，1限时折扣。
            // activityStatu： ''， 1.未开始2.进行中3.已结束
            // endDate: '', // 活动结束时间。
            // startDate: '''', // 活动开始时间。
            // activityId: '', // 活动id
            // activeDesc: '', // 活动描述。**
            // activityName: '', // 活动名称。
            // id: '', // 活动商品列表的id
            // goodId: '', // 商品id。
            // goodsName: '', // 商品名称
            // goodsPicture: '', // 商品图片 **
            // salePrice: '', // 商品原价。 **
            // realSales: '' // 商品实际售价。 **
            // }
          ],
          productIds: [] // 活动商品列表的id
        }
      }
    }
  ],
  marketingComponents: [
    {
      key: 'my-spell',
      name: '拼团',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_pintuan_default',
      config: {
        title: '拼团',
        desc: '这是一个标题文本',
        formName: 'my-spell-form',
        formData: {
          spellType: 1, // 拼团类型 1普通拼团 2规则拼团
          addWay: 1, // 添加方式   1手动添加 2自动添加
          shopType: '0', // 商品样式'0无边白底1卡片投影'
          listStyle: '0', // 列表样式0大图模式1详情列表
          angleType: '0', // 商品倒角0直角1圆角
          imgScale: '0', // 图片比例0 '3:2',1 '1:1',2 '3:4',3 '16:9'
          imgFill: '0', // 图片填充 0填充,1周边留白（默认）
          // textAlign: 'left', // 显示位置
          titleThickness: 'normal', // 标题粗细bold:粗 nomarl:正常
          shopDescription: true, // 商品描述
          shopName: true, // 商品名称
          shopOnePrices: true, // 单价买
          shopMorePrices: true, // 拼团价买
          shopBadge: false, // 商品角标
          shopBuyBtn: true, // 购买按钮
          shopBtnText: '马上抢', // 购买按钮文字
          shopOriginalpeople: true, // 已团人数
          btnType: 1, // 按钮样式
          pagePadding: 15, // 页面边距
          imagePadding: 10, // 图片间距
          badgeType: 1, // 商品角标样式 1：热销 2：新品 3：自定义
          badgeImgUrl: '', // 角标图片 样式3的情况显示
          showAllShop: false, // 是否显示全部商品
          shopListType: 1, // 1商品 2商品分组
          imageList: [], // 商品列表
          shopList: [], // 商品分类列表
          isSaleOut: false, // 是否显示已售完的商品
          /*
           id: item.id,商品id
              groupName: item.groupName,分组名字
              goodsPicture: item.goodsPicture,商品
              groupTableName: item.groupName,分组名字
              shopNumber:6  商品显示数量
              goodsSellingPoint:商品描述
               */
          // 高级设置
          countdownShow: true, // 抢购倒计时 0:不显示 1：显示
          showType: 0, // 0:系统样式 1:自定义样式
          systembgColor: '#ff4444', // 系统样式背景颜色
          backgroundImgUrl: '', // 背景图片地址
          systemborderColor: '#ff4444', // 系统样式描边颜色
          appearanceStyle: 1, // 1:样式1 2:样式2
          transparency: 100, // 透明度
          strokeSize: 0 // 描边宽度
        }
      }
    },
    {
      key: 'my-coupon',
      name: '优惠券',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_yhq_default',
      config: {
        title: '优惠券',
        desc: '这是一个优惠券',
        formName: 'my-coupon-form',
        formData: {
          cardType: 1, // 商品样式'1系统2自定义'
          listStyle: '0', // 列表样式0大图模式1一行两个2一行三个
          cardStyle: 1, // 卡券样式
          imgScale: '0', // 图片比例0 '3:4',1 '1:1',2 '3:4',3 '16:9'
          color: '1', // 颜色
          fullReduce: '1', // 满减说明0不显示1显示
          name: '1', // 优惠券名称0不显示1显示
          deadline: '1', // 使用有效期0不显示1显示
          regulation: '0', // 使用规则0不显示1显示
          invalid: false, // 隐藏已抢完及失效的券false不显示true显示
          imgUrl: '', // 自定义图片
          // imageList: [], // 商品列表
          shopList: [] // 优惠券列表
          /*
            couponFullMoney//限制金额
          */
        }
      }
    },
    {
      key: 'my-seckill',
      name: '秒杀',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_miaosha_default',
      config: {
        title: '秒杀',
        desc: '这是一个秒杀',
        formName: 'my-seckill-form',
        formData: {
          shopType: '0', // 商品样式'0无边白底1卡片投影'
          listStyle: '0', // 列表样式0大图模式1详情列表
          angleType: '0', // 商品倒角0直角1圆角
          imgScale: '0', // 图片比例0 '3:2',1 '1:1',2 '3:4',3 '16:9'
          imgFill: '0', // 图片填充 0填充,1周边留白（默认）
          titleThickness: 'normal', // 标题粗细bold:粗 nomarl:正常
          shopDescription: true, // 商品描述
          shopName: true, // 商品名称
          oldPrices: true, // 原价买
          seckillPrices: true, // 秒杀价
          inventory: true, // 剩余库存
          shopBuyBtn: true, // 购买按钮
          shopBtnText: '马上抢', // 购买按钮文字
          progressBar: true, // 抢购进度条
          btnType: 1, // 按钮样式
          pagePadding: 15, // 页面边距
          imagePadding: 10, // 图片间距
          shopListType: 1, // 1商品 2商品分组
          imageList: [], // 商品列表
          shopList: [], // 活动列表

          // 高级设置
          countdownShow: true, // 抢购倒计时 0:不显示 1：显示
          showType: 0, // 0:系统样式 1:自定义样式
          systembgColor: '#D1B085', // 系统样式背景颜色
          backgroundImgUrl: '', // 背景图片地址
          systemborderColor: '#D1B085', // 系统样式描边颜色
          appearanceStyle: 1, // 1:样式1 2:样式2
          transparency: 100, // 透明度
          strokeSize: 0 // 描边宽度
        }
      }
    },
    {
      key: 'my-discount',
      name: '限时折扣',
      count: 50,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_xszk_default',
      config: {
        title: '限时折扣',
        desc: '这是一个限时折扣',
        formName: 'my-discount-form',
        formData: {
          shopType: '0', // 商品样式'0无边白底1卡片投影'
          listStyle: '0', // 列表样式0大图模式1详情列表
          angleType: '0', // 商品倒角0直角1圆角
          imgScale: '0', // 图片比例0 '3:2',1 '1:1',2 '3:4',3 '16:9'
          imgFill: '0', // 图片填充 0填充,1周边留白（默认）
          titleThickness: 'normal', // 标题粗细bold:粗 nomarl:正常
          shopDescription: true, // 商品描述
          shopName: true, // 商品名称
          oldPrices: true, // 原价买
          seckillPrices: true, // 秒杀价
          inventory: true, // 剩余库存
          shopBuyBtn: true, // 购买按钮
          shopBtnText: '马上抢', // 购买按钮文字
          progressBar: true, // 抢购进度条
          btnType: 1, // 按钮样式
          pagePadding: 15, // 页面边距
          imagePadding: 10, // 图片间距
          shopListType: 1, // 1商品 2商品分组
          imageList: [], // 商品列表
          shopList: [], // 活动列表

          // 高级设置
          countdownShow: true, // 抢购倒计时 0:不显示 1：显示
          showType: 0, // 0:系统样式 1:自定义样式
          systembgColor: '#D1B085', // 系统样式背景颜色
          backgroundImgUrl: '', // 背景图片地址
          systemborderColor: '#D1B085', // 系统样式描边颜色
          appearanceStyle: 1, // 1:样式1 2:样式2
          transparency: 100, // 透明度
          strokeSize: 0 // 描边宽度
        }
      }
    },
    {
      key: 'my-live',
      name: '直播',
      count: 10,
      useCount: 0,
      icon: 'icon-icon_right_attributebar_zbgengduo_default',
      config: {
        title: '直播',
        desc: '这是一个标题文本',
        formName: 'my-live-form',
        formData: {
          listStyle: '1', // 列表样式，1样式一，2样式二，3样式三
          showBorder: true, // 边框，true显示，false不显示。
          borderRounding: '1', // 边框倒角，1直角，2圆角。
          pagePadding: 15, // 页面边距
          productPadding: 15, // 图片间距
          roomInfoList: [// 直播间信息列表。
            // {
            //   roomPicture: 'https://testsd.cicd.vpclub.cn/ghs/20210621/2021062120055541.jpg', // 直播间图片
            //   roomStatus: '101', // 直播状态，101直播中，102未开始，103已结束。
            //   // roomStatus: '102', // 直播状态，101直播中，102未开始，103已结束。
            //   // roomStatus: '103', // 直播状态，101直播中，102未开始，103已结束。

            //   roomName: '金桔直播间', // 直播名称
            //   roomDesc: '七夕礼遇，神仙好物推荐专场', // 直播间描述
            //   liveTimeDistance: 0, // 距离直播开始时间。
            //   viewsNumber: 123456, // 观看人数
            //   roomProductList: [ // 直播间商品信息。
            //     {
            //       productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210819/69544fddaa44496cb735981e5892bf58.jpg',
            //       productId: '321',
            //       productPrice: '34500'
            //     },
            //     {
            //       productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210818/5ea4c044f6234d4fb686fa5dbd99cfd9.jpeg',
            //       productId: '123',
            //       productPrice: '234500'
            //     }

            //   ]
            // },

            // {
            //   roomPicture: 'https://testsd.cicd.vpclub.cn/ghs/20210819/69544fddaa44496cb735981e5892bf58.jpg', // 直播间图片
            //   roomStatus: '101', // 直播状态，101直播中，102未开始，103已结束。
            //   // roomStatus: '102', // 直播状态，101直播中，102未开始，103已结束。
            //   // roomStatus: '103', // 直播状态，101直播中，102未开始，103已结束。

            //   roomName: '金桔直播间', // 直播名称
            //   roomDesc: '七夕礼遇，神仙好物推荐专场', // 直播间描述
            //   liveTimeDistance: 0, // 距离直播开始时间。

            //   // liveTimeDistance: 2 * 24 * 60 * 60 * 1000, // 距离直播开始时间。
            //   // liveTimeDistance: 2 * 60 * 60 * 1000, // 距离直播开始时间。
            //   // liveTimeDistance: 5 * 60 * 1000, // 距离直播开始时间。
            //   viewsNumber: 123456, // 观看人数

            //   roomProductList: [ // 直播间商品信息。
            //     {
            //       productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210819/69544fddaa44496cb735981e5892bf58.jpg',
            //       productId: '321',
            //       productPrice: '34500'
            //     },
            //     {
            //       productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210818/5ea4c044f6234d4fb686fa5dbd99cfd9.jpeg',
            //       productId: '123',
            //       productPrice: '234500'
            //     }

            //   ]
            // },

            // {
            //   roomPicture: 'https://testsd.cicd.vpclub.cn/ghs/20210827/603fb98b18214739b9868a1927572094.jpg', // 直播间图片
            //   roomStatus: '102', // 直播状态，101直播中，102未开始，103已结束。
            //   roomName: '金桔直播间', // 直播名称
            //   roomDesc: '七夕礼遇，神仙好物推荐专场', // 直播间描述
            //   // liveTimeDistance: 2 * 24 * 60 * 60 * 1000, // 距离直播开始时间。
            //   // liveTimeDistance: 2 * 60 * 60 * 1000, // 距离直播开始时间。
            //   liveTimeDistance: 5 * 60 * 1000, // 距离直播开始时间。
            //   viewsNumber: 123456, // 观看人数

            //   roomProductList: [ // 直播间商品信息。
            //     {
            //       productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210819/69544fddaa44496cb735981e5892bf58.jpg',
            //       productId: '321',
            //       productPrice: '34500'
            //     },
            //     {
            //       productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210818/5ea4c044f6234d4fb686fa5dbd99cfd9.jpeg',
            //       productId: '123',
            //       productPrice: '234500'
            //     }

            //   ]
            // },
            // {
            //   roomPicture: 'https://testsd.cicd.vpclub.cn/ghs/20210906/02e42881cfcd4946885d5dc25c614d69.jpg', // 直播间图片
            //   roomStatus: '103', // 直播状态，101直播中，102未开始，103已结束。
            //   roomName: '金桔直播间', // 直播名称
            //   roomDesc: '七夕礼遇，神仙好物推荐专场', // 直播间描述
            //   liveTimeDistance: 0, // 距离直播开始时间。
            //   viewsNumber: 123456, // 观看人数
            //   roomProductList: [ // 直播间商品信息。
            //     // {
            //     //   productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210819/69544fddaa44496cb735981e5892bf58.jpg',
            //     //   productId: '321',
            //     //   productPrice: '34500'
            //     // },
            //     // {
            //     //   productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210818/5ea4c044f6234d4fb686fa5dbd99cfd9.jpeg',
            //     //   productId: '123',
            //     //   productPrice: '234500'
            //     // }

            //   ]
            // },

            // {
            //   roomPicture: 'https://testsd.cicd.vpclub.cn/ghs/20210827/603fb98b18214739b9868a1927572094.jpg', // 直播间图片
            //   roomStatus: '102', // 直播状态，101直播中，102未开始，103已结束。
            //   roomName: '金桔直播间', // 直播名称
            //   roomDesc: '七夕礼遇，神仙好物推荐专场', // 直播间描述
            //   // liveTimeDistance: 2 * 24 * 60 * 60 * 1000, // 距离直播开始时间。
            //   // liveTimeDistance: 2 * 60 * 60 * 1000, // 距离直播开始时间。
            //   liveTimeDistance: 5 * 60 * 1000, // 距离直播开始时间。
            //   viewsNumber: 123456, // 观看人数

            //   roomProductList: [ // 直播间商品信息。
            //     {
            //       productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210819/69544fddaa44496cb735981e5892bf58.jpg',
            //       productId: '321',
            //       productPrice: '34500'
            //     },
            //     {
            //       productImage: 'https://testsd.cicd.vpclub.cn/ghs/20210818/5ea4c044f6234d4fb686fa5dbd99cfd9.jpeg',
            //       productId: '123',
            //       productPrice: '234500'
            //     }

            //   ]
            // },


          ],
          roomIdList: [], // 直播间id列表。
          showDefault: true, // 默认图片，true显示，false不显示。
          jumpPageName: '', // 更多直播的跳转链接名称。
          // moreLink: '', // 更多直播的跳转链接。
          jumpPageId: '', // 更多直播的跳转链接id。
          jumpPageType: '',// 更多直播的跳转页面类型。
          jumpPageUrl: '',//小程序跳转地址
        }
      }
    },
    {
      key: 'OfficialAccounts',
      name: '关注公众号',
      count: 1,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_gzgzh_selected',
      config: {
        title: '关注公众号组件',
        desc: '这是一个关注公众号',
        formName: 'OfficialAccountsForm',
        formData: {
        }
      }
    },
    {
      key: 'IntegralMall',
      name: '积分商城',
      count: 10,
      useCount: 0,
      icon: 'icon-icon_left_assemblybar_jfscheng_default',
      config: {
        title: '积分商城',
        desc: '这是一个标题文本',
        formName: 'MyIntegralMallForm',
        formData: {
          listStyle: '1', // 列表样式，1样式一，2样式二，
          goodsList: [
            // {
            //   goodsImgUrl: require("@/assets/images/default/default_img_3_2@2x.png"), // 商品图
            //   goodsName: "这里显示商品名称",
            //   integralNum: 999, 积分数
            //   goodsPrice: 9999, 商品原价
            // },
          ],
          goodIds: [],
          couponIds: [],
          allIds: [],
          borderRounding: '1', // 边框倒角，1直角，2圆角。
          integralNum: true, // 积分数量true显示false不显示
          exchangeBtn: true, // 兑换按钮true显示false不显示
          originalPrice: true, // 商品原价true显示false不显示
        }
      }
    },
  ]
}


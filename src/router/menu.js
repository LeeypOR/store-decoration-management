export default [
  {
    title: '首页',
    icon: '',
    pathname: 'Dashboard'
  },
  {
    title: '店铺',
    icon: 'icon-shop',
    authority: 'shop',
    children: [
      {
        title: '个性装修',
        icon: 'icon-shop',
        authority: 'shop:customDecorate',
        children: [
          {
            title: '微页面',
            pathname: 'ShopCustomDecorateMicroPageMicroPageList',
            authority: 'shop:customDecorate:microPage',
            icon: 'icon-shop'
          },
          {
            title: '店铺导航',
            pathname: 'ShopCustomDecorateNavigation',
            authority: 'shop:customDecorate:navigation',
            icon: 'icon-shop'
          }
        ]
      }
    ]
  }
]

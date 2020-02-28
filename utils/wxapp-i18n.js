export const bar = {
  "zh-CN": "首页,分类,购物车,个人",
  "en": "Home,Categories,Cart,Me",
  "es": "INICIO,CATEGORI\'AS,CARRO,MI CUENTA",
}

export function interpret(self, locale){
  wx.getStorage({
    key: 'language',
    success(res) {
      let data = locale[res.data]
      self.setData(data)
      let title = self.data.title
      wx.setNavigationBarTitle({ title })
    }
  })
}

export function changeLanguage(self,locale){
  const langSheet = {
    '中文': 'zh-CN',
    'English': 'en',
    'español': 'es'
  }
  let list = Object.keys(langSheet)
  wx.showActionSheet({
    itemList: list,
    success(res) {
      let tapIndex = res.tapIndex,
          language = langSheet[list[tapIndex]],
          data = locale[language]
      self.setData(data)
      let title = self.data.title
      wx.setNavigationBarTitle({ title })
      bar[language].split(',', 4).forEach((text, index) => {
        wx.setTabBarItem({ index, text })
      })
      wx.setStorage({
        key: 'language',
        data: language
      })
    },
    fail(res) {
      console.log(res.errMsg)
    }
  })
}
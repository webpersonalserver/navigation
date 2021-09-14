/**
 * 文字颜色配置参数---开始
 * 文字颜色格式如下：
 * 十六进制：#66687d（建议）
 * rgb：rgb(0, 0, 0)
 * 合法英文：white、red
 */
var colorOneName = '#66687d' // 一级导航名称颜色
var colorTwoName = '#4d4f91' // 二级导航名称颜色
var colorTwoSubName = '#727171' // 二级导航说明颜色
//  文字颜色配置参数---结束

/**
 * 导航数据配置---开始
 * name：导航名称
 * sub：二级导航说明
 * icon：二级导航logo
 * url：二级导航跳转链接
 */
var config = [{
  name: '语言类',
  children: [{
    name: 'MDN',
    sub: '提供 Web 技术文档，学习 Web 开发的最佳实践',
    icon: './static/images/icon_logo.png',
    url: 'https://www.baidu.com/'
  }, {
    name: 'ECMAScript',
    sub: 'ECMAScript 2018 标准',
    icon: './static/images/icon_logo.png',
    url: 'https://www.baidu.com/'
  }, {
    name: 'markdown-it中文文档',
    sub: 'Markdown 解析器。完全支持 CommonMark 规范，并且进行语法扩展、提供可编写插件和快速编译',
    url: 'https://www.baidu.com/'
  }, {
    name: 'Markdown基本语法',
    sub: '',
    url: ''
  }]
  }, {
  name: '视频类',
  children: [{
    name: 'XGPlayer',
    sub: '带解析器、能节省流量的 Web 视频播放器',
    url: 'https://www.baidu.com/'
  }, {
    name: 'markdown-it中文文档',
    sub: 'Markdown 解析器。完全支持 CommonMark 规范，并且进行语法扩展、提供可编写插件和快速编译',
    url: 'https://www.baidu.com/'
  }, {
    name: '并且进行语法扩展并且进行语法扩展并且进行语法扩展并且进行语法扩展并且进行语法扩展',
    icon: './static/images/icon_logo.png',
    sub: '并且进行语法扩展',
    url: 'https://www.baidu.com/'
  }]
}]
// 导航数据配置---结束






$(function () {
  // 初始化数据
  function init () {
    render()

    // 搜索按钮点击事件
    $('.search_btn').click(function () { search() })
    // 监听在input聚焦时，键盘的回车事件
    $('#search-value').bind('keydown', function (e) {
      var key  =e.which

      if (key !== 13) return

      e.preventDefault()
      search()
    })
  }
  // 数据渲染
  function render (data) {
    var html = ''
    var navConfig = data || config

    navConfig.forEach(function (one) {
      var two = one.children || []
      var menu = ''
      var submenu = ''

      two.forEach(function (item) {
        var template = '<div class="submenu__item" url="' + item.url +'">'
        + '<div class="submenu__item_box">'
        + (item.icon ? '<img class="submenu__item_logo" src="' + item.icon + '" alt="图片加载失败">' : '')
        + '<p class="submenu__item_name" style="color:' + (colorTwoName || '#4d4f91') + ';" title="' + item.name + '">' + item.name + '</p>'
        + '</div>'
        + (item.sub ? '<p class="submenu__item_desc" style="color:' + (colorTwoSubName || '#727171') + ';" title="' + item.sub + '">' + item.sub + '</p>' : '')
        + '</div>'

        submenu += template
      })

      menu = ' <div class="menu__item">'
      + '<p class="menu__item_name" style="color:' + (colorOneName || '#66687d') + ';">' + one.name + '</p>'
      + '<div class="menu__item_arrow"></div>'
      + '</div>'
      + '<div class="submenu hidden">'
      + submenu
      + '</div>'
      html += '<div class="menu-box">' + menu + '</div>'
    })
    // 渲染数据
    $('.menu').html(html)
    // 一级菜单点击事件
    $('.menu__item').click(function () {
      var index = $('.menu__item').index(this)
      var transform = $('.menu__item:eq(' + index + ') .menu__item_arrow').css('transform')

      $('.menu__item:eq(' + index + ') + .submenu').stop().slideToggle()
      if (transform === 'none') {
        $('.menu__item:eq(' + index + ') .menu__item_arrow').css('transform', 'rotate(180deg)')
      } else {
        $('.menu__item:eq(' + index + ') .menu__item_arrow').css('transform', 'none')
      }
    })
    // 二级菜单点击事件
    $('.submenu__item').click(function () {
      var index = $('.submenu__item').index(this)
      var url = $('.submenu__item:eq(' + index +')').attr('url') || ''

      url && window.open(url, '__blank')
    })
    // 自动展开第一个导航数据
    $('.menu__item:eq(0)').trigger('click')
  }
  // 搜索
  function search () {
    // 获取输入框的值
    var val = $('#search-value').val() || ''
    var data = []

    if (val) {
      // 按照二级菜单名称模糊匹配
      config.forEach(function (one) {
        var two = one.children || []
        var submenu = []

        two.forEach(function (item) {
          if (item.name.indexOf(val) >= 0) {
            submenu.push(item)
          }
        })

        if (submenu.length > 0) {
          data.push({
            name: one.name,
            children: submenu
          })
        }
      })
    } else {
      data = config
    }

    render(data)
  }

  init()
})
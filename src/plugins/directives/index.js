// import { debounceFunc } from '@/utils/index'

// 解决键盘挡住输入框指令
let inFocus
export const keyBoard = {
	inserted: function (el) {
		// const oHeight = document.body.clientHeight
		// window.addEventListener('resize', function (params) {
		//   if (oHeight > document.body.clientHeight) { // 键盘弹出
		//     el.scrollIntoView(false)
		//   }
		// }, false)
		// let scrollTop = document.body.scrollTop
		el.addEventListener('focus', function (param) {
			// scrollTop = document.body.scrollTop
			inFocus = true
		})
		el.addEventListener('blur', function (param) {
			inFocus = false
			setTimeout(() => {
				// 解决多个输入框切换问题
				if (inFocus == false) {
					// document.body.scrollTop = scrollTop
					var u = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

					if (u) {
						// 在iphone
						var osVersion = navigator.userAgent.match(/iPhone\sOS\s([\d\_]+)/i)
						var osArr = osVersion.length >= 1 ? osVersion[1].split('_') : []
						var newOS = osArr.length >= 2 && osArr[0] > 11
						if (newOS) {
							// 如果iphone版本号>=12
							var currentPosition, timer
							var speed = 1 // 页面滚动距离
							timer = setInterval(function () {
								currentPosition = document.documentElement.scrollTop || document.body.scrollTop
								currentPosition -= speed
								window.scrollTo(0, 0) // 页面向上滚动
								clearInterval(timer)
							}, 1)
						}
					}
				}
			}, 400)
		})
	}
}

// 解决键盘顶出footet布局
export const keyBoardFooter = {
	inserted: function (el) {
		const oHeight = document.body.clientHeight
		window.addEventListener(
			'resize',
			function (params) {
				if (oHeight > document.body.clientHeight) {
					// 键盘弹出
					el.style.position = 'static'
				} else {
					el.style.position = 'fixed'
				}
			},
			false
		)
	}
}

// 自动聚焦
export const focus = {
	inserted (el, { value }) {
		if (value) el.focus()
	}
}

// 防抖指令
export const debounce = {
	inserted: function (el, binding) {
		let timer
		el.addEventListener('click', () => {
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => {
				binding.value()
        clearTimeout(timer)
			}, 3000)
		})
	}
}

// 用v-decorator时可以用这个指令
export const trim = function (el, binding) {
  if (el) {
    el.value = el.value.trim()
  }
  const tagName = el && el.tagName || ''
  if (['INPUT', 'TEXTAREA'].indexOf(tagName) > -1) {
    bindBlur(el)
  } else if (el) {
    const input = el.querySelector('input') || el.querySelector('textarea')
    if (input) {
      bindBlur(input)
    }
  }
}
function bindBlur (el) {
  if (typeof(el.value) === 'string') {
    el.value = el.value.trim()
  }
  el.addEventListener('blur', function (e) {
    if (typeof(e.target.value) === 'string') {
      e.target.value = e.target.value.trim()
    }
  })
}



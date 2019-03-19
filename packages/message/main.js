import { Message, MessageBox, Notification } from 'element-ui'

const methods = ['message', 'msgbox', 'alert', 'confirm', 'prompt', 'notify']
const types = ['success', 'warning', 'info', 'error']
const method2ClassMap = {
  message: Message,
  msgbox: MessageBox,
  alert: MessageBox.alert,
  confirm: MessageBox.confirm,
  prompt: MessageBox.prompt,
  notify: Notification
}

export default function Msg (method, message, title, options) {
  // 校验消息类型合法性
  if (!~methods.indexOf(method)) {
    throw new Error(
      `你输入的消息类型 "${method}" 不正确, 正确的消息类型有: ${methods.join(
        ', '
      )}`
    )
  }

  return Msg[method](message, title, options)
}

function messageHandler (Constructor, method, type) {
  return function (message, title, options) {
    if (['message', 'notify'].includes(method)) {
      if (typeof message !== 'object') {
        throw new Error(`消息类型为 ${method} 的参数类型只能是对象`)
      }

      if (type) {
        message = { ...message, type }
      }

      return Constructor(message)
    }
    if (type) {
      options = { ...options, type }
    }
    return Constructor(message, title, options)
  }
}

types.forEach(type => {
  Msg[type] = function (method, message, title, options) {
    return messageHandler(method2ClassMap[method], type)(message, title, {
      ...options,
      type
    })
  }
})

methods.forEach(method => {
  Msg[method] = messageHandler(method2ClassMap[method], method)
})

methods.forEach(method => {
  const MsgConstructor = method2ClassMap[method]

  types.forEach(type => {
    Msg[method][type] = messageHandler(MsgConstructor, method, type)
    Msg[type][method] = messageHandler(MsgConstructor, method, type)
  })
})

Msg.closeAll = function (type) {
  if (!['message', 'notify'].includes(type)) {
    throw new Error(`消息类型 ${type} 上不存在 closeAll 方法`)
  }

  return method2ClassMap[type].closeAll()
}

Msg.close = function (type, msgInstance) {
  if (!['message', 'notify'].includes(type)) {
    throw new Error(`消息类型 ${type} 上不存在 close 方法`)
  }

  if (!msgInstance) throw new Error(`消息类型 ${type} 的消息实例不能为空`)

  return msgInstance.close()
}

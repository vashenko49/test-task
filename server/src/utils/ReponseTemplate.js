exports.responseMessages = (message) => ({
  message: message.map((e) => ({
    msg: e
  }))
})

class Flash {
  static setMessage(type, content) {
    this._messages = this._messages || {}
    this._messages[type] = content
  }

  static getMessages() {
    return this._messages
  }

  static clearMessages() {
    this._messages = null
  }

}

export default Flash

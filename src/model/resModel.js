class BaseModel {
  constructor(data,message) {
    if(typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    data && (this.data = data)
    message && (this.message = message)
  }
}

class ErrorModel extends BaseModel {
  constructor(data,message) {
    super(data,message)
    this.errno = -1
  }
}

class SucessModel extends BaseModel {
  constructor(data,message) {
    super(data,message)
    this.errno = 0
  }
}

module.exports = {
  ErrorModel,
  SucessModel
}
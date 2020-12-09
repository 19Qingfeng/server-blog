const login = (username,password) => {
  if(username === 'wanghaoyu' && password === '123') {
    return true
  }
  return false
}

module.exports = {
  login
}
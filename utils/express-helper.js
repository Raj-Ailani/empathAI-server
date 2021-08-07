// import { sentry } from '../config/sentry'

// send 201 response with the message
export const created = function(req, res, next) {
  res.created = function(message) {
    let data =
      typeof message === 'object'
        ? message
        : {
            message
          }
    return res.status(201).json({ success: true, data })
  }
  next()
}

// send 200 response
export const ok = function(req, res, next) {
  res.ok = function(message) {
    let data =
      typeof message === 'object'
        ? message
        : {
            message
          }

    return res.status(200).json({ success: true, data })
  }
  next()
}

// send 400 error -  either db created or validator error
export const senderror = function(req, res, next) {
  res.senderror = function(message) {
    let data =
      typeof message === 'object'
        ? message
        : {
            message
          }

    return res.status(400).json({ success: false, data })
  }
  next()
}

// send 401 error -  unauthorized access
export const unauthorized = function(req, res, next) {
  res.unauthorized = function(message) {
    return res.status(401).json({
      success: false,
      data: { error: message || 'Unauthorized access' }
    })
  }
  next()
}

// send 409 error -  conflict
export const conflict = function(req, res, next) {
  res.conflict = function(message) {
    return res.status(409).json({ success: false, data: { error: message } })
  }
  next()
}

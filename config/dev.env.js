'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  domain: '"fullink.tech"',
  sso: '"http://ssotest.fullink.tech"'
})

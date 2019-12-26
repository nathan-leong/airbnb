require('dotenv').config()
const withCSS = require('@zeit/next-css')
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL

module.exports = {...withCSS(), publicRuntimeConfig: {BASE_URL}}

const { default: axios } = require('axios')

get: jest.fn(() => Promise.resolve({ data: {} }))

module.exports = axios

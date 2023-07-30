import { default as axios } from 'axios'

get: jest.fn(() => Promise.resolve({ data: {} }))

export default axios

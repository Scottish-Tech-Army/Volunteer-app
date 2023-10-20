import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import fetch from 'node-fetch'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

global.fetch = fetch

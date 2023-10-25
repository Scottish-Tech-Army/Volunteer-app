/**
 * @file Storage wrappers
 */

import * as SecureStore from 'expo-secure-store'

export interface Storage {
  getItem: (key: string) => Promise<string | null> | string | null
  setItem: (key: string, value: string) => Promise<void> | void
  removeItem: (key: string) => Promise<void> | void
}

export class InMemoryStorage implements Storage {
  private data = new Map<string, string>()

  async getItem(key: string): Promise<string | null> {
    return this.data.get(String(key)) || null
  }

  async removeItem(key: string): Promise<void> {
    this.data.delete(String(key))
  }

  async setItem(key: string, value: string): Promise<void> {
    this.data.set(String(key), String(value))
  }
}

export const SecureStorage: Storage = {
  async getItem(key: string): Promise<string | null> {
    return SecureStore.getItemAsync(key)
  },

  async setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
    })
  },

  async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key)
  },
}

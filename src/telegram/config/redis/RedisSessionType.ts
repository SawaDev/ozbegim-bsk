import {Scenes} from "telegraf"

export interface CustomSessionType {
  // Токен авторизации
  token?: string
  lastStartTime?: Date
  // Selected branch
  branch?: {
    name: string
    contacts: Array<{
      title: string
      name: string
      work_time?: string
      phone: string
    }>
  }
}

export type RedisSessionType = Scenes.WizardSession & CustomSessionType

export interface RedisSessionMethodsType {
  getRedis: <K extends keyof RedisSessionType>(key: K) => RedisSessionType[K]
  setRedis: <K extends keyof RedisSessionType>(key: K, value: RedisSessionType[K]) => RedisSessionType[K]
}

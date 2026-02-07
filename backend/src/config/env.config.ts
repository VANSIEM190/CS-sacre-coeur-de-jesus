import dotenv from 'dotenv'
dotenv.config()

const required = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(` Missing environment variable: ${key}`)
  }
  return value
}

export const env = {
  DB_HOST: required('DB_HOST'),
  DB_USER: required('DB_USER'),
  DB_PASSWORD: required('DB_PASSWORD'),
  DB_NAME: required('DB_NAME'),
}

const checkRequiredEnvVars = () => {
  const required = ['VITE_API_URL']
  const missing = required.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// In development, warn about missing env vars
if (import.meta.env.DEV) {
  checkRequiredEnvVars()
}

export const config = {
  API: {
    URL: import.meta.env.VITE_API_URL,
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
    VERSION: 'v1'
  },
  ENV: {
    IS_DEV: import.meta.env.DEV,
    IS_PROD: import.meta.env.PROD,
    MODE: import.meta.env.MODE
  }
}

// Freeze the config object to prevent modifications
Object.freeze(config) 
function log(message: string, ...args: any[]): void {
  console.log(message, ...args)
}

export default function Logger(moduleName) {
  return {
    error: (message: string, ...args: any[]) =>
      log(`${moduleName}: ${message}`, ...args),
    warn: (message: string, ...args: any[]) =>
      log(`${moduleName}: ${message}`, ...args),
    info: (message: string, ...args: any[]) =>
      log(`${moduleName}: ${message}`, ...args),
    debug: (message: string, ...args: any[]) =>
      log(`${moduleName}: ${message}`, ...args),
    verbose: (message: string, ...args: any[]) =>
      log(`${moduleName}: ${message}`, ...args),
  }
}

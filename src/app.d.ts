declare global {
  namespace App {
    interface Locals {
      user?: {
        email: string
        role: string
        workgroup: string | null
      }
    }
  }
}

export {}

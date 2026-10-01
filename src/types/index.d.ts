export type Provider = "CREDENTIALS" | "GOOGLE"

export type User = {
  id: string
  email: string
  provider: Provider
  createdAt: string
  updatedAt: string
}

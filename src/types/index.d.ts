import type React from "react"

export type AUTH_FORM_WARPPER_TYPES = {
  children: React.ReactNode | React.ReactElement
  card_title: string
  card_disc: string
}

export type Provider = "CREDENTIALS" | "GOOGLE"

export type User = {
  id: string
  email: string
  provider: Provider
  createdAt: string
  updatedAt: string
}

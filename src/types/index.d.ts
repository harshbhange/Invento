import type React from "react"

export type AUTH_FORM_WARPPER_TYPES = {
  children: React.ReactNode | React.ReactElement
  card_title: string
  card_disc: string
}

export type User = {
  id: string
  email: string
  provider: Provider
  createdAt: string
  updatedAt: string
  profile: Profile
  companyMembers: CompanyMember[]
} | null

export type Profile = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string | null
  dob: Date | null
  phone: string | null
  address: string | null
  gender: gender | null
  bio: string | null
  userId: string
} | null

type CompanyMember = {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  companyId: string
  company: Company
  role: companyRole
} | null

type Company = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  description: string | null
  tags: string[]
}

type request = {
  id: string
  createdAt: Date
  updatedAt: Date
  companyId: string
  userId: string
  status: joinRequestStatus
} | null

type companyRole = "OWNER" | "ADMIN" | "EMPLOYEE"
export type provider = "CREDENTIALS" | "GOOGLE"
export type gender = "MALE" | "FEMALE" | "OTHER"
export type provider = "CREDENTIALS" | "GOOGLE"
export type joinRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED"

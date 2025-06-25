export interface TUser {
  _id: string
  status: string
  name: string
  designation: string
  experience: string
  email: string
  phoneNumber: string
  gender: "male" | "female" | "other"
  dateOfBirth: Date
  profile: string
  role: string
  address: string
  descriptions: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
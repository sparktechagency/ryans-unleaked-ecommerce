export interface TProduct {
  _id: string
  title: string
  price: number
  category: string
  author: Author
  description: string
  image: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}


export type Author = {
  _id: string
  name: string
  email: string
  phoneNumber: string | number
  profile: string
  designation: string
}
export interface TOrder {
  _id: string
  user: User
  author: Author
  totalPrice: number
  items: TItem[]
  isPaid: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  tranId: string
}

export interface User {
  _id: string
  name: string
  email: string
  phoneNumber: string
  profile: string
}

export interface Author {
  _id: string
  name: string
  email: string
  phoneNumber: string
  profile: string
}

export interface TItem {
  product: TProduct
  price: number
  _id: string
}

export interface TProduct {
  _id: string
  title: string
  price: number
  category: string
  author: string
  description: string
  image: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

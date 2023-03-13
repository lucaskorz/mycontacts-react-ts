export type Contact = {
  id?: number
  name: string
  email: string
  phone: string
  category: {
    id: string
    name: string
  }
}

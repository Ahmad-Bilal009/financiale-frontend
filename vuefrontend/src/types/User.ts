export interface UserData {
  id: number
  name: string
  email: string
  password: string
  isDisabled: boolean
  role: string
  type: string
  totalVisitors: number // Ensure this is defined as a number, not optional
}

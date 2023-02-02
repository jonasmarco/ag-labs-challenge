import { Ratings } from './Ratings'

export type Menu = {
  id: number
  name: string
  desc: string
  rating: number
  slug: string
  days: string[]
  price: number
  image: string
  ratings: Ratings[]
}

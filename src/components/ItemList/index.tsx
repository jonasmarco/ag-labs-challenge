import { realConverter } from '../../helpers/realConverter'
import Star from '../Star'

interface IItemList {
  name: string
  desc: string
  rating: number
  slug: string
  price: number
  image: string
}

const ItemList = ({ name, desc, rating, slug, price, image }: IItemList) => {
  return (
    <div className="my-2 w-full px-1 lg:my-4 lg:px-4">
      <article className="h-full overflow-hidden rounded-lg shadow-lg hover:shadow-md">
        <a href={`/menu/${slug}`}>
          <img
            alt={name}
            className="block h-auto w-full"
            src={image}
            loading="lazy"
          />

          <main className="p-2 leading-tight md:p-4">
            <header>
              <h1 className="text-lg">{name}</h1>

              <div className="my-2 flex items-center">
                <div className="flex">
                  {Array.from(Array(rating), (e, i) => {
                    return <Star key={i} />
                  })}
                </div>
              </div>
            </header>

            <p className="text-sm font-light text-gray-600">{desc}</p>

            <div className="flex justify-end align-middle text-green-500">
              <span className="text-lg font-semibold">
                {realConverter(price)}
              </span>
            </div>
          </main>
        </a>
      </article>
    </div>
  )
}

export default ItemList

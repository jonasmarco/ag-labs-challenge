import { Ratings } from '../../types/Ratings'
import Star from '../Star'

interface IRatingList {
  ratings: Ratings[]
}

const RatingList = ({ ratings }: IRatingList) => {
  if (!ratings) return <p>Nenhum avaliação registrada para este prato.</p>

  return (
    <section className="mb-10">
      {ratings.map((props: Ratings) => (
        <div className="border-b-2 px-4 py-2" key={props.user}>
          <div className="flex justify-between mb-4">
            <h6 className="text-base">{props.user}</h6>
            <div className="flex">
              {Array.from(Array(props.rating), (e, i) => {
                return <Star key={i} />
              })}
            </div>
          </div>
          <p className="text-lg">{props.comment}</p>
        </div>
      ))}
    </section>
  )
}

export default RatingList

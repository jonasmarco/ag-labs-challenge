import axios from '../../api'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Error from '../../components/Error'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import RatingList from '../../components/RatingList'
import Search from '../../components/Search'
import { realConverter } from '../../helpers/realConverter'
import { useFetch } from '../../hooks/useFetch'
import { Menu } from '../../types/Menu'
import { Ratings } from '../../types/Ratings'
import { User } from '../../types/Users'

const MenuItem = () => {
  const { slug } = useParams()
  const { data, error } = useFetch<Menu[]>(
    `http://localhost:5000/menu?slug=${slug}&singular=1`
  )

  const [firstName, setFirstName] = useState<string | ''>('')
  const [rating, setRating] = useState<string | ''>('')
  const [ratingText, setRatingText] = useState<string | ''>('')
  const [userRated, setUserRated] = useState<boolean>(false)

  useEffect(() => {
    const firstName = sessionStorage.getItem('firstName')
    if (firstName) {
      setFirstName(firstName)
      checkIfUserRated(firstName)
    }
  }, [data])

  const checkIfUserRated = useCallback(
    async (firstName: string) => {
      const { data: userData } = await axios.get(
        `http://localhost:5000/users?firstName=${firstName}`
      )
      if (userData && data) {
        let find = {}
        userData.forEach((user: User) => {
          find = ratings.find((r) => r.email === user.email) as Ratings
        })
        if (find) setUserRated(true)
      }
    },
    [data]
  )

  if (error) return <Error />
  if (!data) return <Loader />

  const { id, name, desc, price, image, ratings } = data[0]

  const doRating = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const { data: menuData } = await axios.get(`/menu?id=${id}`)

    if (menuData) {
      const userId = sessionStorage.getItem('userId')
      const { data: userData } = await axios.get(`/users?id=${userId}`)
      const ratingData = {
        user: userData[0].firstName + ' ' + userData[0].lastName,
        email: userData[0].email,
        rating: Number(rating),
        comment: ratingText
      }
      const newRatings = [...menuData[0].ratings, ratingData]
      const rate = Math.ceil(
        newRatings.reduce((acc, obj) => acc + obj.rating, 0) / newRatings.length
      )
      const newMenu = { ...menuData[0], rating: rate, ratings: newRatings }
      const response = await axios.put(`/menu/${id}`, newMenu)
      if (response.status === 200) {
        document.location.reload()
      }
    }
  }

  return (
    <main>
      <Header />
      <Search />

      <section className="content mx-auto max-w-screen-lg py-5 px-4 text-xl">
        <div className="container my-4 mx-auto">
          <img
            alt={name}
            className="block h-auto rounded-lg mx-auto mb-10 w-full md:w-1/2"
            src={image}
            loading="lazy"
          />
          <h1 className="text-xl font-medium text-gray-700 my-10 md:text-3xl">
            {name}
          </h1>
          <p className="text-lg mb-4">{desc}</p>
          <div className="flex align-middle text-green-500 mb-10">
            <span className="text-lg font-semibold">
              {realConverter(price)}
            </span>
          </div>

          {firstName && !userRated && (
            <form onSubmit={doRating}>
              <p className="mb-6">
                Já provou? Conte o que achou desse prato. Todo feedback é
                bem-vindo.
              </p>
              <div className="mb-6">
                <select
                  className="m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  onChange={({ target }) => setRating(target.value)}
                >
                  <option value="1">1 estrela</option>
                  <option value="2">2 estrelas</option>
                  <option value="3">3 estrelas</option>
                  <option value="4">4 estrelas</option>
                  <option value="5">5 estrelas</option>
                </select>
              </div>
              <div className="mb-6">
                <textarea
                  className="m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Escreva aqui a sua avaliação..."
                  required
                  value={ratingText}
                  onChange={({ target }) => setRatingText(target.value)}
                />
              </div>
              <button
                type="submit"
                className="mb-6 inline-block w-full rounded-lg bg-rose-700 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-rose-900 hover:shadow-lg focus:bg-rose-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-800 active:shadow-lg"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Enviar avaliação
              </button>
            </form>
          )}

          <h2 className="mt-10 mb-4 font-semibold text-2xl">Avaliações</h2>
          <RatingList ratings={ratings} />
          <a href="/">
            <button
              type="button"
              className="flex w-56 items-center justify-between rounded-lg border-2 py-1 px-2 transition hover:bg-white hover:text-rose-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Voltar para a home
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default MenuItem

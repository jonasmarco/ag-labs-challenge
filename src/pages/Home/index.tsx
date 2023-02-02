import Error from '../../components/Error'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ItemList from '../../components/ItemList'
import Loader from '../../components/Loader'
import Search from '../../components/Search'
import { useFetch } from '../../hooks/useFetch'
import { Menu } from '../../types/Menu'

const Home = () => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const date = new Date()
  const dayOfWeek = daysOfWeek[date.getDay()]

  const { data, error } = useFetch<Menu[]>('http://localhost:5000/menu/')

  if (error) return <Error />
  if (!data) return <Loader />

  const dailyMenu = data.filter((menu) => menu.days.includes(dayOfWeek))

  return (
    <main>
      <Header />
      <Search />

      <section className="content mx-auto max-w-screen-lg py-5 px-4 text-xl">
        <h1 className="text-xl font-medium text-gray-700 md:text-3xl">
          Cardápio do dia
        </h1>

        <div className="container my-4 mx-auto">
          <div className="-mx-1 grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:-mx-4">
            {dailyMenu.map((props: Menu) => (
              <ItemList key={props.slug} {...props} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home

import { useCallback, useEffect, useState } from 'react'
import Error from '../../components/Error'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import MenuList from '../../components/MenuList'
import Search from '../../components/Search'
import { useFetch } from '../../hooks/useFetch'
import { Menu } from '../../types/Menu'

const Home = () => {
  const [dailyMenu, setDailyMenu] = useState<Menu[]>([])

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

  useEffect(() => {
    if (data) {
      setDailyMenu(data.filter((menu) => menu.days.includes(dayOfWeek)))
    }
  }, [data])

  const onHandleSearch = useCallback((filteredMenu: Menu[]) => {
    setDailyMenu(filteredMenu)
  }, [])

  if (error) return <Error />
  if (!data) return <Loader />

  return (
    <main>
      <Header />
      <Search onHandleSearch={onHandleSearch} />

      <section className="content mx-auto max-w-screen-lg py-5 px-4 text-xl">
        <h1 className="text-xl font-medium text-gray-700 md:text-3xl">
          Cardápio do dia
        </h1>

        <MenuList items={dailyMenu} />
      </section>

      <Footer />
    </main>
  )
}

export default Home

import axios from '../../api'
import { useCallback, useState } from 'react'
import { Menu } from '../../types/Menu'

interface ISearch {
  onHandleSearch: (menuFiltered: Menu[]) => void
}

const Search = ({ onHandleSearch }: ISearch) => {
  const [search, setSearch] = useState<string | ''>('')

  const onSearch = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault()

      const { data: menuFiltered } = await axios.get<Menu[]>(
        `/menu?name_like=${search}`
      )
      onHandleSearch(menuFiltered)
    },
    [search]
  )

  return (
    <form
      className="mx-auto -mt-7 px-4 w-full md:max-w-xl lg:max-w-2xl"
      onSubmit={onSearch}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          className="block w-full rounded-lg border border-gray-400 bg-gray-50 p-4 pl-10 text-sm text-black focus:border-black"
          placeholder="Qual comida você está procurando?"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
    </form>
  )
}

export default Search

import { useEffect, useState } from 'react'

const Header = () => {
  const [firstName, setFirstName] = useState<string | ''>('')

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString('pt-br')
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const firstName = sessionStorage.getItem('firstName')
    if (firstName) setFirstName(firstName)
  }, [])

  const handleLogOut = () => {
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('firstName')
    setFirstName('')
  }

  return (
    <header className="bg-rose-700 font-semibold text-slate-100">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between px-4 pt-4">
        <span>{currentTime}</span>
        {firstName ? (
          <button
            type="button"
            className="flex w-28 items-center justify-between rounded-lg border-2 py-1 px-2 transition hover:bg-white hover:text-rose-700"
            onClick={handleLogOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        ) : (
          <a href="/login/">
            <button
              type="button"
              className="flex w-24 items-center justify-between rounded-lg border-2 py-1 px-2 transition hover:bg-white hover:text-rose-700"
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Login
            </button>
          </a>
        )}
      </div>
      <div className="pt-10 pb-16">
        <div className="mx-auto max-w-screen-lg px-4">
          <p className="text-xl md:text-3xl">
            {firstName ? `Olá ${firstName},` : 'Olá,'}
          </p>
          <p className="text-3xl md:text-4xl">Seja Bem-vindo(a)</p>
        </div>
      </div>
    </header>
  )
}

export default Header

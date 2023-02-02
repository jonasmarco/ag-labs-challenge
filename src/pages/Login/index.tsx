import axios from '../../api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Error from '../../components/Error'

const Login = () => {
  const navigateTo = useNavigate()

  useEffect(() => {
    const firstName = sessionStorage.getItem('firstName')
    if (firstName) navigateTo('/')
  }, [])

  const [email, setEmail] = useState<string | ''>('')
  const [pass, setPass] = useState<string | ''>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [error, setError] = useState<string | ''>('')

  const validate = () => {
    setShowError(false)

    let isValid = true

    if (!email || !pass) isValid = false

    return isValid
  }

  const doLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (validate()) {
      const { data } = await axios.get(`/users?email=${email}`)

      if (data.length > 0) {
        const { password } = data[0]

        if (password === pass) {
          sessionStorage.setItem('userId', data[0].id)
          sessionStorage.setItem('firstName', data[0].firstName)
          navigateTo('/')
        } else {
          setShowError(true)
          setError('Dados inválidos.')
        }
      } else {
        setShowError(true)
        setError('Dados inválidos.')
      }
    } else {
      setShowError(true)
      setError('Por favor, preencha todos os campos.')
    }
  }

  return (
    <section className="h-screen">
      <div className="container h-full px-4 mx-auto">
        <div className="flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="md:w-8/12 lg:w-5/12">
            <img
              src="/logo.png"
              alt="Logo Sabores do Mineiro"
              width="300"
              className="mx-auto mb-10"
              loading="lazy"
            />
            <p className="mb-6">
              Para poder avaliar os pratos, por favor faça o seu login
            </p>
            <form onSubmit={doLogin}>
              <div className="mb-6">
                <input
                  type="text"
                  className="m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="E-mail"
                  required
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Senha"
                  required
                  value={pass}
                  onChange={({ target }) => setPass(target.value)}
                />
              </div>
              <button
                type="submit"
                className="mb-6 inline-block w-full rounded-lg bg-rose-700 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-rose-900 hover:shadow-lg focus:bg-rose-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-800 active:shadow-lg"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Entrar
              </button>
            </form>
            {showError && <Error message={error} />}
            <p>Ainda não tem uma conta? </p>
            <a
              href="/signup/"
              className="mb-14 block border-none text-rose-700"
            >
              Cadastre-se aqui
            </a>
            <a href="/">
              <button
                type="button"
                className="flex w-48 items-center justify-between rounded-lg border-2 py-1 px-2 transition hover:bg-white hover:text-rose-700"
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
        </div>
      </div>
    </section>
  )
}

export default Login

import axios from '../../api'
import { useState } from 'react'
import Error from '../../components/Error'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigateTo = useNavigate()

  const [firstName, setFirstName] = useState<string | ''>('')
  const [lastName, setLastName] = useState<string | ''>('')
  const [email, setEmail] = useState<string | ''>('')
  const [password, setPassword] = useState<string | ''>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [error, setError] = useState<string | ''>('')

  const validate = () => {
    setShowError(false)

    let isValid = true

    if (!firstName || !lastName || !email || !password) isValid = false

    return isValid
  }

  const doSignUp = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (validate()) {
      const user = {
        firstName,
        lastName,
        email,
        password
      }

      const { data: userExists } = await axios.get(`/users?email=${email}`)
      if (userExists.length > 0) {
        setShowError(true)
        setError('Já existe um usuário registrado com este e-mail.')
        return
      }

      const { data } = await axios.post('/users/', user)
      if (data) {
        navigateTo('/login')
      } else {
        setShowError(true)
        setError(
          'Tivemos um problema ao realizar o seu cadastro, por favor tente novamente mais tarde.'
        )
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
              Para fazer o seu cadastro, preencha os campos abaixo
            </p>
            <form onSubmit={doSignUp}>
              <div className="mb-6">
                <input
                  type="text"
                  className="m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Primeiro Nome"
                  required
                  value={firstName}
                  onChange={({ target }) => setFirstName(target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="m-0 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Último Nome"
                  required
                  value={lastName}
                  onChange={({ target }) => setLastName(target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
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
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button
                type="submit"
                className="mb-6 inline-block w-full rounded-lg bg-rose-700 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-rose-900 hover:shadow-lg focus:bg-rose-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-800 active:shadow-lg"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Cadastrar
              </button>
            </form>
            {showError && <Error message={error} />}
            <p>Já possuí uma conta?</p>
            <a href="/login/" className="border-none text-rose-700">
              Faça o login
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp

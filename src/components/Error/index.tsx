interface IError {
  message?: string
}

const Error = ({ message }: IError) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span className="font-medium">
        {message
          ? message
          : 'Tivemos um problema. Por favor tente novamente mais tarde!'}
      </span>
    </div>
  )
}

export default Error

// Types
type Props = {
  title:string
}

const index = ({ title }: Props) => {
  return (
    <h1>{title}</h1>
  )
}

export default index

type Props = {
    children : React.ReactNode,
    modal:React.ReactNode
}

function layout(props: Props) {
  return (
    <>
    {props.modal}
    {props.children}
    </>
  )
}

export default layout
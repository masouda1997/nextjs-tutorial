type Props = {
    modal:React.ReactNode,
    children : React.ReactNode
}

function layout({modal,children }: Props) {
  return (
    <>
    {modal}
    {children}
    </>
  )
}

export default layout
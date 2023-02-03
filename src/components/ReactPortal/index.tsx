import ReactDOM from "react-dom"

type ReactPortalProps = {
  containerId: string
  children: React.ReactNode
}

export default function ReactPortal({ containerId, children }: ReactPortalProps) {
  let container = document.getElementById(containerId)

  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', containerId)
    document.body.appendChild(container)
  }

  return ReactDOM.createPortal(children, container)
}

import { NotifContainer, Close } from './Notif.style'

export default function Notif({ children, notifType, onClick, margins }) {
  return (
    <NotifContainer notifType={notifType} margins={margins}>
      {children}
      <Close type='button' onClick={onClick} />
    </NotifContainer>
  )
}
import { CAvatar } from '@coreui/react'
import type { ComponentProps } from 'react'
import type { User } from '../types'

type UserAvatarProps = {
  user: User
  size?: ComponentProps<typeof CAvatar>['size']
}

const UserAvatar = ({ user, size = 'md' }: UserAvatarProps) => (
  <CAvatar src={user.avatarUrl} size={size} title={user.name} />
)

export default UserAvatar

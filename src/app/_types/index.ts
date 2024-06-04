export interface CreateChannelInfo {
  userNickname: string
  userAuth: string
  channelName: string
}

export interface ScheduleInfo {
  title: string
  startTime: string
  endTime: string
}

export interface Schedule {
  result: ScheduleInfo[]
}
export interface MemberInfo {
  userNickname: string
  userImage: string
  isSignedUp: boolean
}

export interface CodeInfo {
  code: string
}

export interface User {
  userId: number
  userImage: string
  userNickname: string
  authority: string
  userEmail: string
  createdAt: string
}

export interface Member {
  userList: User[]
}

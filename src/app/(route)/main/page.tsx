'use client'

import Fix from '@/_components/Fix/fix'
import Calendar from '@/_components/Chart/calendar'
import { useEffect, useState } from 'react'
import RoomCode from '@/_components/Admin/roomcode'
import Userlist from '@/_components/Admin/userlist'

export default function MainPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  // Admin 컴포넌트의 mx 값을 동적으로 설정
  const mainStyles = {
    marginLeft: `${windowWidth / 5 - 15}px`, // 화면 너비의 1/5 만큼 왼쪽으로 이동
  }
  return (
    <div className="flex w-full">
      <Fix />
      <div style={mainStyles} className="my-[70px] w-3/5 relative bg-[#F8F9FB]">
        <p className="px-6 py-4 text-[20px] font-bold">캘린더</p>
        <div className="pl-4 pr-4 pb-4">
          <Calendar />
        </div>
      </div>
    </div>
  )
}

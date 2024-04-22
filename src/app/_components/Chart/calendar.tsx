'use client'

import React, { useState } from 'react'
import { NextPage } from 'next'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import AddEventModal from './addEventModal'
import '@/_styles/calendar.css'

interface CalendarProps {
  showAddButton?: boolean
}

const Calendar: NextPage<CalendarProps> = ({ showAddButton = true }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [events, setEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const handleSaveEvent = (newEvent: any) => {
    if (selectedEvent) {
      // 선택된 이벤트가 있다면 해당 이벤트를 수정
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) => {
          if (event.title === selectedEvent.title) {
            return { ...event, ...newEvent }
          }
          return event
        })
        return updatedEvents
      })
    } else {
      // 선택된 이벤트가 없다면 새로운 이벤트 추가
      setEvents((prevEvents) => [...prevEvents, newEvent])
    }
  }

  const handleEventClick = (clickInfo: any) => {
    const clickedEvent = clickInfo.event
    setSelectedEvent(clickedEvent)
    setShowModal(true)
  }

  const handleAddEventButtonClick = () => {
    setShowModal(false)
    setSelectedEvent(null) // 선택된 이벤트 초기화
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null) // 선택된 이벤트 초기화
    setShowModal(false)
  }

  return (
    <div className="calendar w-full">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        timeZone="local"
        aspectRatio={2}
        headerToolbar={{
          left: 'prev,title,next',
          end: `today${showAddButton ? ',addEventButton' : ''}`,
        }}
        customButtons={{
          addEventButton: {
            text: '',
            click: handleAddEventButtonClick,
          },
        }}
        eventBackgroundColor="#FF7236"
        eventBorderColor="#FF7236"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        editable
        displayEventTime
        fixedWeekCount={false}
        events={events}
        dayMaxEvents={2} // = eventLimit
        moreLinkClassNames={['more-events-link']}
        moreLinkText={function (n) {
          return `그 외 ${n}개`
        }}
        eventClick={handleEventClick}
      />
      {showModal && (
        <AddEventModal
          onClose={handleCloseModal}
          selectedEvent={selectedEvent}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  )
}

export default Calendar

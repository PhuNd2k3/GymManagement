import React from 'react'

const TrainingHistoryItem = ({ day, time }) => {
  return (
    <div className='training-history-item'>
      <p className="training-history-day">{day}</p>
      <p className="training-history-time">{time}</p>
    </div>
  )
}

export default TrainingHistoryItem

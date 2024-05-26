import React, { useState, useParams } from 'react'
import TrainingHistoryItem from '../components/TrainingHistoryItem/TrainingHistoryItem'

const generateFakeData = () => {
  const items = []
  for (let i = 1; i <= 50; i++) {
    items.push({
      day: `Thứ ${Math.ceil(i % 7)}, ngày ${i} tháng 7`,
      time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
    })
  }
  return items
}

const TrainingHistory = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const data = generateFakeData()

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  return (
    <section className='training-history background'>
      <div className="container">
        <h1 className="training-history-title">LỊCH SỬ ĐI TẬP {id}</h1>
        <div className="training-history-list">
          {currentItems.map((item, index) => (
            <TrainingHistoryItem key={index} day={item.day} time={item.time} />
          ))}
        </div>
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
            className='btn-prev'
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(currentPage + 1)}
            className='btn-next'
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default TrainingHistory

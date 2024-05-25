import React from 'react';

const Package = (props) => {
  return (
    <div className='package-item'>
      <div className="package-info">
        <h3 className="package-name">{props.name}</h3>
        <p className='package-price'>Giá: <strong>${props.price}</strong></p>
        <p className='package-frequency'>Tần suất tập: <strong>{props.numbersOfTrainingPerWeek}</strong> buổi / tuần</p>
        <p className='package-number'>Số người tập: <strong>{props.memberCount}</strong> người</p>
      </div>
        <button className="package-btn">CHỌN GÓI</button>
      <div className="package-act">
      </div>
    </div>
  )
}

export default Package;
import React from "react";

const TrainingHistoryItem = ({ date, time }) => {
  return (
    <div className="training-history-item">
      <p className="training-history-day">{date}</p>
      <p className="training-history-time">{time}</p>
    </div>
  );
};

export default TrainingHistoryItem;

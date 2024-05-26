import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrainingHistoryItem from "../components/TrainingHistoryItem/TrainingHistoryItem";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero

  return {
    date: `Ngày ${day} tháng ${month} năm ${year}`,
    time: `${hours}:${minutes}`,
  };
};

const TrainingHistory = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [trainingHistory, setTrainingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/training/${id}`
        );
        const formattedData = response.data.map((item) => ({
          ...item,
          ...formatDate(item.trainingTime),
        }));
        setTrainingHistory(formattedData);
        console.log(formattedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="training-history background">
      <div className="container">
        <h1 className="training-history-title">LỊCH SỬ ĐI TẬP</h1>
        <div className="training-history-list">
          {trainingHistory.map((item, index) => (
            <TrainingHistoryItem
              key={index}
              date={item.date}
              time={item.time}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingHistory;

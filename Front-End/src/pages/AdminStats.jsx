import React, { useEffect, useState } from "react";
import AdminStatsItem from "../components/AdminStatsItem/AdminStatsItem";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import fileDownload from "js-file-download";
import { Document, Packer, Paragraph, TextRun } from "docx";

const AdminStats = () => {
  const [type, setType] = useState(1);
  const [practice, setPractice] = useState({
    count: 0,
    last: 0,
    now: 0,
  });
  const [newRegistration, setNewRegistration] = useState({
    count: 0,
    last: 0,
    now: 0,
  });
  const [newExtension, setNewExtension] = useState({
    count: 0,
    last: 0,
    now: 0,
  });
  const [age, setAge] = useState({
    ageFrom17To25: 0,
    ageFrom25To35: 0,
    ageOver35: 0,
    total: 0,
  });
  const [sales, setSales] = useState({});

  const fetchAdminStats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/statistical/new/${type}`
      );
      console.log(response.data);
      setPractice(response.data);
    } catch (error) {
      console.error("Error fetching gym equipment data:", error);
    }
  };
  const fetchNewRegistration = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/statistical/sign_up/${type}`
      );
      console.log(response.data);
      setNewRegistration(response.data);
    } catch (error) {
      console.error("Error fetching new registration data:", error);
    }
  };

  const fetchNewExtension = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/statistical/training/${type}`
      );
      console.log(response.data);
      setNewExtension(response.data);
    } catch (error) {
      console.error("Error fetching new extension data:", error);
    }
  };

  const fetchAge = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/statistical/age`
      );
      console.log(response.data);
      setAge(response.data);
    } catch (error) {
      console.error("Error fetching new extension data:", error);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/statistical/sales/${type}`
      );
      console.log(response.data);
      setSales(response.data.sales);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchAdminStats();
    fetchNewRegistration();
    fetchNewExtension();
    fetchAge();
    fetchSales();
  }, [type]);

  const handleTypeChange = (event) => {
    setType(Number(event.target.value));
  };

  const handleExport = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "THỐNG KÊ",
                  bold: true,
                  size: 48,
                }),
              ],
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Số buổi tập: ${practice.count}`,
                  size: 32,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Đăng ký mới: ${newRegistration.count}`,
                  size: 32,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Số buổi tập gia hạn: ${newExtension.count}`,
                  size: 32,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Tuổi từ 17 đến 25: ${Math.round(
                    (age.ageFrom17To25 / age.total) * 100
                  )}%`,
                  size: 32,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Tuổi từ 25 đến 35: ${Math.round(
                    (age.ageFrom25To35 / age.total) * 100
                  )}%`,
                  size: 32,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Tuổi trên 35: ${Math.round(
                    (age.ageOver35 / age.total) * 100
                  )}%`,
                  size: 32,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      fileDownload(blob, "Thống_Kê.docx");
    });
  };

  const salesData = {
    labels: Object.keys(sales),
    datasets: [
      {
        label: "",
        data: Object.values(sales),
        fill: false,
        borderColor: "#c21b1b",
        tension: 0.1,
      },
    ],
  };

  const salesOptions = {
    maintainAspectRatio: false, // Add this line to disable automatic resizing
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Doanh thu',
        align: 'start',
        padding: {
          top: 10,
          bottom: 30
        },
        font: {
          size: 20
        },
        color: '#000000'
      }
    }
  };
  

  return (
    <div className="admin-stats background">
      <div className="container">
        <div className="admin-stats-row">
          <h1 className="admin-stats-title">THỐNG KÊ</h1>
          <div>
            <select onChange={handleTypeChange} value={type}>
              <option value={1}>Tuần</option>
              <option value={2}>Tháng</option>
              <option value={3}>Năm</option>
            </select>
            <button onClick={handleExport} className="export-button">
              Xuất
            </button>
          </div>
        </div>
        <div className="admin-stats-container">
          <div className="admin-stats-container__top">
            <AdminStatsItem
              title={"Số buổi tập"}
              count={practice.count}
              last={practice.last}
              now={practice.now}
              type={type}
            />
            <AdminStatsItem
              title={"Đăng ký mới"}
              count={newRegistration.count}
              last={newRegistration.last}
              now={newRegistration.now}
              type={type}
            />
            <AdminStatsItem
              title={"Số buổi tập"}
              count={newExtension.count}
              last={newExtension.last}
              now={newExtension.now}
              type={type}
            />
          </div>
          <div className="admin-stats-container__bottom">
            <div className="admin-stats-container__revenue">
              <Line data={salesData} options={salesOptions} height={250}/>
            </div>
            <div className="admin-stats-container__age">
              <div className="admin-stats-container__age--contain">
                <div className="admin-stats-container__age--row">
                  <div className="admin-stats-container__age--title">
                    <p>17-25</p>
                    <p>{Math.round((age.ageFrom17To25 / age.total) * 100)}%</p>
                  </div>
                  <div className="admin-stats-container__age--percent">
                    {Array.from(
                      {
                        length: Math.round(
                          ((age.ageFrom17To25 / age.total) * 100) / 4
                        ),
                      },
                      (_, index) => (
                        <div className="icon active" key={index}></div>
                      )
                    )}
                    {Array.from(
                      {
                        length:
                          25 -
                          Math.round(
                            ((age.ageFrom17To25 / age.total) * 100) / 4
                          ),
                      },
                      (_, index) => (
                        <div className="icon" key={index}></div>
                      )
                    )}
                  </div>
                </div>
                <div className="admin-stats-container__age--row">
                  <div className="admin-stats-container__age--title">
                    <p>25-35</p>
                    <p>{Math.round((age.ageFrom25To35 / age.total) * 100)}%</p>
                  </div>
                  <div className="admin-stats-container__age--percent">
                    {Array.from(
                      {
                        length: Math.round(
                          ((age.ageFrom25To35 / age.total) * 100) / 4
                        ),
                      },
                      (_, index) => (
                        <div className="icon active" key={index}></div>
                      )
                    )}
                    {Array.from(
                      {
                        length:
                          25 -
                          Math.round(
                            ((age.ageFrom25To35 / age.total) * 100) / 4
                          ),
                      },
                      (_, index) => (
                        <div className="icon" key={index}></div>
                      )
                    )}
                  </div>
                </div>
                <div className="admin-stats-container__age--row">
                  <div className="admin-stats-container__age--title">
                    <p>&gt;35</p>
                    <p>{Math.round((age.ageOver35 / age.total) * 100)}%</p>
                  </div>
                  <div className="admin-stats-container__age--percent">
                    {Array.from(
                      {
                        length: Math.round(
                          ((age.ageOver35 / age.total) * 100) / 4
                        ),
                      },
                      (_, index) => (
                        <div className="icon active" key={index}></div>
                      )
                    )}
                    {Array.from(
                      {
                        length:
                          25 -
                          Math.round(((age.ageOver35 / age.total) * 100) / 4),
                      },
                      (_, index) => (
                        <div className="icon" key={index}></div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;

import React from "react";
import login_icon from "./../../assets/icon/login_icon";

const AdminStatsItem = ({ title, count, last, now, type }) => {
  const period = () => {
    switch (type) {
      case 1:
        return "tuần";
      case 2:
        return "tháng";
      case 3:
        return "năm";
      default:
        return "";
    }
  };

  return (
    <div className="admin-stats-item">
      <div className="admin-stats-item__title">
        <h2>{title}</h2>
        <p className={now - last > 0 ? "green" : "red"}>
          {Math.abs(((now - last) / last) * 100).toFixed(2)}%{" "}
          {now - last > 0 ? (
            <img src={login_icon.up} alt="" />
          ) : (
            <img src={login_icon.down} alt="" />
          )}
        </p>
      </div>
      <div className="admin-stats-item__contain">
        <div className="admin-stats-item__contain--left">
          <div className="admin-stats-item__count">{count}</div>
          <div className="admin-stats-item__info">
            Tăng {now} {period()} này
          </div>
        </div>
        <div className="admin-stats-item__contain--right">
          <img src={login_icon.up} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsItem;
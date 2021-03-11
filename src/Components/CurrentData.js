import React from "react";
import Styles from "../Styles/CurrentData.module.css";

export default function CurrentData({ forecast, cityInfo }) {
  const unixToDate = (unixTimeStamp, tzString = "America/Atlanta") => {
    const miliseconds = unixTimeStamp * 1000;
    const date = new Date(miliseconds);
    return date.toLocaleTimeString("en-GB", { timeZone: tzString });
  };

  return (
    <section className={Styles.dataContainer}>
      <section className={Styles.mainContent}></section>
    </section>
  );
}

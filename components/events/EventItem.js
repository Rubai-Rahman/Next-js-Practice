import React from "react";
import classes from "./event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowIcon from "../icons/arrow-icon";
import Image from "next/image";
const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-Us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(",", "\n");
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      
      <Image src={"/" + image} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
        </div>
        <div className={classes.date}>
          <DateIcon />
          <time>{humanReadableDate}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>{<ArrowIcon />}</span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;

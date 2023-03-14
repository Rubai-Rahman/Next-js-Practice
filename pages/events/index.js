import EventSearch from "@/components/events-search/events-search";
import EventList from "@/components/events/EventList";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { getAllEvents } from "@/helpers/api-util";

const HomePage = (props) => {
  const events = props.events;

  const router = useRouter();
  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default HomePage;

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

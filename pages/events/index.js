import EventSearch from '@/components/events-search/events-search';
import EventList from '@/components/events/EventList';
import { getAllEvents } from '@/dummy-data';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

const HomePage = () => {
  const events = getAllEvents();
  const router = useRouter();
  const findEventHandler = (year,month) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath);
  }
  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default HomePage;
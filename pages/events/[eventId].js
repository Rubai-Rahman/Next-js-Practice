import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Comments from "@/components/input/comments";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import Head from "next/head";
import React, { Fragment } from "react";

const EventDetailPage = (props) => {
  const event = props.event;
  if (!event) {
    return (
      <div className="center">
        <p>Loading----</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Next js Events</title>
        <meta
          name="description" content={event.description}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{<p>{event.description}</p>}</EventContent>
      <Comments eventId ={event.id}/>
    </Fragment>
  );
};

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
}


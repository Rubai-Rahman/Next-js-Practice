// import Image from 'next/image'
import { Inter } from "next/font/google";
import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helpers/api-util";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Next js Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
}

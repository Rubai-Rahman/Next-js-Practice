// import Image from 'next/image'
import { Inter } from "next/font/google";
import EventList from "@/components/events/EventList";
import { getAllEvents, getFeaturedEvents } from "@/dummy-data";
import EventSearch from "@/components/events-search/events-search";
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      
      <EventList items={featuredEvents} />
    </div>
  );
}

import Calendar from '../components/Calendar';
import { Hero } from '../components/Hero';

export default function CalendarPage() {
  return (
    <div className="">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Club Events Calendar</h1>
        <Calendar />
      </div>
    </div>
  );
} 
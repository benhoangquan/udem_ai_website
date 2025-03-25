import Image from 'next/image';
import Link from 'next/link';
import { SanityActivity } from '@/lib/types';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/lib/sanity.image';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardTitle, CardDescription, CardBar } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ActivityCardProps {
  activity: SanityActivity;
  index: number;
}

export const ActivityCard = ({ activity, index }: ActivityCardProps) => {
  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBA';
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Format time function
  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'h:mm a');
  };

  // Location display function
  const getLocationDisplay = (activity: SanityActivity) => {
    if (!activity.location) return 'Location TBA';
    
    if (activity.location.type === 'online') {
      return 'Online';
    } else if (activity.location.venue) {
      return activity.location.venue;
    } else if (activity.location.address) {
      return activity.location.address;
    }
    
    return 'Location TBA';
  };
  
  // Get appropriate color for activity type
  const getActivityColorScheme = () => {
    switch (activity.type) {
      case 'workshop':
        return 'primary';
      case 'hackathon':
        return 'accent';
      case 'study_group':
        return 'success';
      case 'social':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <Card 
      className="h-full max-h-[70vh] rounded-3xl overflow-hidden relative group border-0 shadow-none"
      variant="ghost"
    >
      {/* Activity Image */}
      {activity.mainImage ? (
        <div className="absolute inset-0">
          <Image 
            src={urlForImage(activity.mainImage).url()}
            alt={activity.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className={`absolute inset-0 bg-blue-${400 + (index % 3) * 100} flex items-center justify-center`}>
          {/* <span className="text-4xl font-bold text-white">{activity.type.replace('_', ' ')}</span> */}
        </div>
      )}
      
      {/* Dark gradient overlay for text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div> */}
      
      {/* Activity content overlay */}
      <CardContent className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
        <div className="max-w-xl">
          {/* Activity Type Badge with CardBar underneath */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 mb-2 text-sm font-medium bg-blue-600 text-white rounded-full">
              {activity.type.replace('_', ' ').toUpperCase()}
            </span>
            <CardBar colorScheme={getActivityColorScheme()} size="sm" className="ml-1" />
          </div>
          
          {/* Title */}
          <CardTitle colorScheme="default" size="lg" className="text-3xl md:text-4xl font-bold mb-3 text-white">
            {activity.title}
          </CardTitle>
          
          {/* Description */}
          {activity.description && (
            <CardDescription colorScheme="default" size="md" className="mb-6 text-white/90 line-clamp-3">
              <PortableText value={activity.description} />
            </CardDescription>
          )}
          
          {/* Activity details */}
          <div className="mb-6 space-y-2">
            {activity.schedule?.startDateTime && (
              <div className="flex items-center text-white/90">
                <Calendar size={18} className="mr-2" />
                <span>{formatDate(activity.schedule.startDateTime)}</span>
                {activity.schedule.startDateTime && (
                  <span className="ml-2">
                    <Clock size={18} className="inline mr-1" />
                    {formatTime(activity.schedule.startDateTime)}
                  </span>
                )}
              </div>
            )}
            
            <div className="flex items-center text-white/90">
              <MapPin size={18} className="mr-2" />
              <span>{getLocationDisplay(activity)}</span>
            </div>
          </div>
          
          {/* View details button */}
          {activity.slug && (
            <Button 
              variant="blue" 
              size="lg" 
              className="rounded-full"
              asChild
            >
              <Link href={`/activities/${activity.slug.current}`}>
                View Details
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 
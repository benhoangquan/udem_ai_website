import { GetStaticProps, GetStaticPaths } from 'next';
import { SanityActivity } from '@/lib/types';
import { getAllActivities, getActivityBySlug } from '@/lib/sanity/queries';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity.image';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';

interface ActivityPageProps {
  activity: SanityActivity;
}

export default function ActivityPage({ activity }: ActivityPageProps) {
  if (!activity) {
    return <div>Activity not found</div>;
  }

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBA';
    return format(new Date(dateString), 'MMMM d, yyyy');
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

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Activity Header */}
        <div className="relative h-[40vh] rounded-2xl overflow-hidden mb-8">
          {activity.mainImage ? (
            <Image 
              src={urlForImage(activity.mainImage).url()}
              alt={activity.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-blue-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">{activity.type.replace('_', ' ')}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-blue-600 text-white rounded-full">
              {activity.type.replace('_', ' ').toUpperCase()}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{activity.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              {activity.schedule?.startDateTime && (
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>{formatDate(activity.schedule.startDateTime)}</span>
                </div>
              )}
              {activity.schedule?.startDateTime && (
                <div className="flex items-center">
                  <Clock size={18} className="mr-2" />
                  <span>{formatTime(activity.schedule.startDateTime)}</span>
                </div>
              )}
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>{getLocationDisplay(activity)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">About this Activity</h2>
            {activity.description ? (
              <div className="prose max-w-none">
                <PortableText value={activity.description} />
              </div>
            ) : (
              <p>No description available.</p>
            )}

            {/* Requirements */}
            {activity.requirements && activity.requirements.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-blue-900">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {activity.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources */}
            {activity.resources && activity.resources.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-blue-900">Resources</h3>
                <div className="space-y-3">
                  {activity.resources.map((resource, index) => (
                    <a 
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-blue-800">{resource.title}</div>
                      <div className="text-sm text-blue-600">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-900">Details</h3>
              
              {/* Status */}
              <div className="mb-4">
                <div className="font-medium text-blue-800">Status</div>
                <div className="mt-1">
                  <span className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                    activity.status === 'open' ? 'bg-green-100 text-green-800' :
                    activity.status === 'full' ? 'bg-red-100 text-red-800' :
                    activity.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    activity.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                    activity.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status?.replace('_', ' ').toUpperCase() || 'PLANNED'}
                  </span>
                </div>
              </div>
              
              {/* Capacity */}
              {activity.capacity && (
                <div className="mb-4">
                  <div className="font-medium text-blue-800">Capacity</div>
                  <div className="mt-1 flex items-center">
                    <Users size={16} className="mr-2 text-blue-600" />
                    <span>
                      {activity.capacity.currentParticipants || 0} / {activity.capacity.maxParticipants || 'Unlimited'}
                    </span>
                  </div>
                  {activity.capacity.waitlistEnabled && (
                    <div className="mt-1 text-sm text-blue-600">Waitlist available</div>
                  )}
                </div>
              )}
              
              {/* Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div className="mb-4">
                  <div className="font-medium text-blue-800">Tags</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activity.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Registration button */}
              {activity.status === 'open' && (
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Register Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const activities = await getAllActivities();
  
  const paths = activities.map((activity) => ({
    params: { slug: activity.slug.current },
  }));
  
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const activity = await getActivityBySlug(slug);
  
  if (!activity) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      activity,
    },
    revalidate: 60, // Revalidate every minute
  };
}; 
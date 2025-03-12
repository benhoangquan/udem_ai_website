import { useState, useEffect } from 'react';
import { getActivities } from '@/lib/service';
import { EditorContent, useEditor } from '@tiptap/react';

interface ActivityType {
    title?: string | null;
    featuredImage?: {
        node?: {
            sourceUrl?: string | null;
        } | null;
    } | null;
    activitiesDetails?: {
        activityDate?: string | null;
        activityType?: {
            nodes?: Array<{
                name?: string | null;
            }> | null;
        } | null;
        description?: string | null;
        location?: string | null;
        recurrence?: string | null;
    } | null;
}

const Activities = () => {
    const [activities, setActivities] = useState<ActivityType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setIsLoading(true);
                const data = await getActivities();
                setActivities(data || []);
                setError(null);
            } catch (err) {
                setError('Failed to fetch activities. Please try again later.');
                console.error('Error fetching activities:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivities();
    }, []);

    if (isLoading) {
        return <div className="text-center py-8 text-white">Loading activities...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }



    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-white">Our Activities</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.length === 0 ? (
                    <p className="text-white col-span-3 text-center">No activities found.</p>
                ) : (
                    activities.map((activity, index) => (
                        <div key={index} className="rounded-lg shadow-md p-6 bg-gray-900">
                            <h2 className="text-xl font-semibold mb-3 text-white">
                                {activity.title || 'Untitled Activity'}
                            </h2>

                            <div 
                                className="text-gray-300 mb-4"
                                dangerouslySetInnerHTML={{ __html: activity.activitiesDetails?.description || 'No description available' }}
                            />

                            {activity.activitiesDetails?.location && (
                                <div className="text-sm text-gray-400 mb-2">
                                    📍 {activity.activitiesDetails.location}
                                </div>
                            )}
                            {activity.activitiesDetails?.recurrence && (
                                <div className="text-sm text-gray-400 mb-2">
                                    🔄 {activity.activitiesDetails.recurrence}
                                </div>
                            )}
                            {activity.activitiesDetails?.activityType?.nodes?.map((type, typeIndex) => (
                                type?.name && (
                                    <span
                                        key={typeIndex}
                                        className="inline-block mr-2 mt-2 px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded-full"
                                    >
                                        {type.name}
                                    </span>
                                )
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Activities;
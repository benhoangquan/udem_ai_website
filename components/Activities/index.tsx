const Activities = () => {
    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-white">Our Activities</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Activity Cards */}
                <div className="rounded-lg shadow-md p-6 bg-gray-900">
                    <h2 className="text-xl font-semibold mb-3 text-white">Weekly AI Study Groups</h2>
                    <p className="text-gray-300 mb-4">Join our weekly study sessions where we explore different AI concepts and work on projects together.</p>
                    <div className="text-sm text-gray-400">Every Wednesday, 5:00 PM - 7:00 PM</div>
                </div>

                <div className="rounded-lg shadow-md p-6 bg-gray-900">
                    <h2 className="text-xl font-semibold mb-3 text-white">Hackathons</h2>
                    <p className="text-gray-300 mb-4">Participate in our quarterly hackathons to build innovative AI solutions and compete with other teams.</p>
                    <div className="text-sm text-gray-400">Quarterly Events</div>
                </div>

                <div className="rounded-lg shadow-md p-6 bg-gray-900">
                    <h2 className="text-xl font-semibold mb-3 text-white">Guest Speaker Series</h2>
                    <p className="text-gray-300 mb-4">Listen to industry experts share their experiences and insights about AI and technology.</p>
                    <div className="text-sm text-gray-400">Monthly Events</div>
                </div>
            </div>
        </div>
    );
};

export default Activities;
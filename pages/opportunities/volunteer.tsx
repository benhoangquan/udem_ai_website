import { Hero } from '../../components/Hero';

export default function VolunteerPage() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Volunteer Opportunities</h1>

        {/* Current Openings */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Workshop Instructor</h3>
              <p className="text-gray-600 mb-4">Help teach AI concepts to beginners in our weekly workshops. Share your knowledge and help others learn!</p>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <span className="px-2 py-1 bg-blue-100 rounded">Teaching</span>
                <span className="px-2 py-1 bg-blue-100 rounded">AI/ML</span>
                <span className="px-2 py-1 bg-blue-100 rounded">2-4 hours/week</span>
              </div>
            </div>
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Project Mentor</h3>
              <p className="text-gray-600 mb-4">Guide students through their AI projects, providing technical support and best practices.</p>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <span className="px-2 py-1 bg-blue-100 rounded">Mentoring</span>
                <span className="px-2 py-1 bg-blue-100 rounded">Technical</span>
                <span className="px-2 py-1 bg-blue-100 rounded">Flexible Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Volunteer With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">Build Your Portfolio</h3>
              <p className="text-gray-600">Gain valuable experience and showcase your skills to potential employers</p>
            </div>
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">Network</h3>
              <p className="text-gray-600">Connect with industry professionals and fellow AI enthusiasts</p>
            </div>
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">Make an Impact</h3>
              <p className="text-gray-600">Help shape the future of AI education at UdeM</p>
            </div>
          </div>
        </div>

        {/* How to Apply */}
        <div className=" rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
          <div className="space-y-4">
            <p className="text-gray-600">To apply for any of our volunteer positions:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Review the position requirements and responsibilities</li>
              <li>Prepare your resume and a brief cover letter</li>
              <li>Send your application to volunteer@udemai.ca</li>
              <li>Our team will review your application and contact you within 1-2 weeks</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 
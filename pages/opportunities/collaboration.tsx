import { Hero } from '../../components/Hero';

export default function CollaborationPage() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Collaboration Opportunities</h1>

        {/* Research Collaborations */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Research Collaborations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Lab Partnerships</h3>
              <p className="text-gray-600 mb-4">Partner with our AI research labs on cutting-edge projects in machine learning and artificial intelligence.</p>
              <div className="space-y-2 text-gray-600 mb-4">
                <p>Current focus areas:</p>
                <ul className="list-disc list-inside pl-4">
                  <li>Natural Language Processing</li>
                  <li>Computer Vision</li>
                  <li>Reinforcement Learning</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Research</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Long-term</span>
              </div>
            </div>
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Industry Projects</h3>
              <p className="text-gray-600 mb-4">Work with industry partners on real-world AI applications and solutions.</p>
              <div className="space-y-2 text-gray-600 mb-4">
                <p>Collaboration types:</p>
                <ul className="list-disc list-inside pl-4">
                  <li>Sponsored Projects</li>
                  <li>Mentorship Programs</li>
                  <li>Technical Workshops</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Industry</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Project-based</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Partnerships */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Academic Partnerships</h2>
          <div className=" rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Cross-University Projects</h3>
                <p className="text-gray-600">Collaborate with AI clubs from other universities on joint research and events.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Faculty Mentorship</h3>
                <p className="text-gray-600">Connect with professors and researchers for guidance and collaboration.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Student Exchange</h3>
                <p className="text-gray-600">Participate in exchange programs with partner universities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Get Involved */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get Involved</h2>
          <div className=" rounded-lg shadow-md p-8">
            <div className="max-w-3xl">
              <h3 className="text-xl font-semibold mb-4">How to Start a Collaboration</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Initial Contact</h4>
                    <p className="text-gray-600">Reach out to us at collaborate@udemai.ca with your proposal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Discussion</h4>
                    <p className="text-gray-600">Schedule a meeting to discuss collaboration details</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Planning</h4>
                    <p className="text-gray-600">Develop a project plan and timeline together</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold">Launch</h4>
                    <p className="text-gray-600">Begin the collaboration with regular check-ins and updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
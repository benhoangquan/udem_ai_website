import { Hero } from '../../components/Hero';

export default function LeadershipPage() {
  return (
    <div className="min-h-screen">

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 ">Leadership Opportunities</h1>

        {/* Executive Positions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Executive Committee Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Technical Director</h3>
                <span className="px-3 py-1 rounded-full text-sm">2024-2025</span>
              </div>
              <p className="mb-4">Lead the technical direction of our club, oversee project development, and coordinate with other technical leads.</p>
              <ul className="space-y-2 mb-4">
                <li>• Develop technical roadmap</li>
                <li>• Mentor project teams</li>
                <li>• Organize technical workshops</li>
              </ul>
              <div className="text-sm">Term: 1 year • 10-15 hours/week</div>
            </div>

            <div className=" rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Events Coordinator</h3>
                <span className="px-3 py-1 rounded-full text-sm">2024-2025</span>
              </div>
              <p className="mb-4">Plan and execute club events, workshops, and networking sessions. Coordinate with speakers and venues.</p>
              <ul className="space-y-2 mb-4">
                <li>• Event planning and execution</li>
                <li>• Speaker coordination</li>
                <li>• Budget management</li>
              </ul>
              <div className="text-sm">Term: 1 year • 8-12 hours/week</div>
            </div>
          </div>
        </div>

        {/* Project Lead Positions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Project Lead Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">Research Project Lead</h3>
              <p className=" mb-3">Lead a team working on cutting-edge AI research projects.</p>
              <div className="text-sm">6-month commitment</div>
            </div>
            <div className="rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">Workshop Series Lead</h3>
              <p className="mb-3">Develop and lead our technical workshop series.</p>
              <div className="text-sm">4-month commitment</div>
            </div>
            <div className="rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">Hackathon Director</h3>
              <p className="mb-3">Organize and oversee our annual AI hackathon.</p>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-xl font-bold">01</div>
              <h3 className="font-semibold">Submit Application</h3>
              <p className="">Send your resume and cover letter</p>
            </div>
            <div className="space-y-2">
              <div className="text-xl font-bold ">02</div>
              <h3 className="font-semibold ">Initial Interview</h3>
              <p className="">Meet with current executives</p>
            </div>
            <div className="space-y-2">
              <div className="text-xl font-bold ">03</div>
              <h3 className="font-semibold ">Task/Presentation</h3>
              <p className="">Complete a role-specific task</p>
            </div>
            <div className="space-y-2">
              <div className="text-xl font-bold">04</div>
              <h3 className="font-semibold">Final Decision</h3>
              <p className="">Receive outcome within a week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
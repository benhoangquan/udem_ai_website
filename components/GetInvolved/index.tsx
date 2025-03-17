import Link from 'next/link';
import { MessageSquare, Users, Handshake } from 'lucide-react';

export const GetInvolved = () => {
  return (
    <section id="opportunities" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            Get Involved
          </h2>
          <div className="w-24 h-1 bg-blue-600 mb-8"></div>
          <p className="text-lg text-gray-600 text-center max-w-3xl">
            Join our community of AI enthusiasts and make a difference. Whether you're looking to connect, lead, or collaborate, there's a place for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Join Discord */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
            <div className="p-6 bg-blue-50 flex justify-center">
              <MessageSquare size={64} className="text-blue-600" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Join Discord</h3>
                <p className="text-gray-600">
                  Connect with a vibrant community of AI enthusiasts, participate in discussions, get help with projects, and stay updated on events and opportunities.
                </p>
              </div>
              <div className="mt-auto pt-6">
                <a 
                  href="https://discord.com/invite/YOUR_DISCORD_INVITE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center transition-colors"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
          
          {/* Card 2: Become a Member/Leader */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
            <div className="p-6 bg-purple-50 flex justify-center">
              <Users size={64} className="text-purple-600" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Become a Member/Leader</h3>
                <p className="text-gray-600">
                  Take your involvement to the next level. Members get access to exclusive resources, while leaders can shape the direction of our community through organizing events and initiatives.
                </p>
              </div>
              <div className="mt-auto pt-6">
                <Link 
                  href="/opportunities/leadership"
                  className="inline-block w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-center transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
          
          {/* Card 3: Collaborate */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
            <div className="p-6 bg-green-50 flex justify-center">
              <Handshake size={64} className="text-green-600" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Collaborate</h3>
                <p className="text-gray-600">
                  Bring your ideas to life through collaboration. Work on research projects, organize workshops, contribute to open-source initiatives, or partner with other members on innovative solutions.
                </p>
              </div>
              <div className="mt-auto pt-6">
                <Link 
                  href="/opportunities/collaboration"
                  className="inline-block w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-center transition-colors"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
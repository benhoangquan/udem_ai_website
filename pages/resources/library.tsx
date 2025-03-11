import { Hero } from '../../components/Hero';

export default function LibraryPage() {
  return (
    <div className="min-h-screen ">

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">AI Learning Library</h1>
        
        {/* Categories */}
        <div className="space-y-8">
          {/* Courses Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className=" rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">Introduction to Machine Learning</h3>
                <p className="text-gray-600 mb-3">Learn the fundamentals of ML algorithms and their applications.</p>
                <div className="text-sm text-blue-600">12 Modules • Beginner Friendly</div>
              </div>
              <div className=" rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">Deep Learning Fundamentals</h3>
                <p className="text-gray-600 mb-3">Explore neural networks and deep learning architectures.</p>
                <div className="text-sm text-blue-600">8 Modules • Intermediate</div>
              </div>
              <div className=" rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">Natural Language Processing</h3>
                <p className="text-gray-600 mb-3">Master text processing and language understanding.</p>
                <div className="text-sm text-blue-600">10 Modules • Advanced</div>
              </div>
            </div>
          </div>

          {/* Reading Materials */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Essential Reading</h2>
            <div className=" rounded-lg shadow-md">
              <div className="divide-y">
                <div className="p-4 hover:">
                  <h3 className="font-semibold">The Math Behind Machine Learning</h3>
                  <p className="text-gray-600">A comprehensive guide to the mathematical concepts in AI</p>
                </div>
                <div className="p-4 hover:">
                  <h3 className="font-semibold">Understanding Neural Networks</h3>
                  <p className="text-gray-600">Deep dive into neural network architectures</p>
                </div>
                <div className="p-4 hover:">
                  <h3 className="font-semibold">Ethics in AI Development</h3>
                  <p className="text-gray-600">Exploring ethical considerations in AI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Resources */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className=" rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-2">Getting Started with PyTorch</h3>
                <p className="text-gray-600">Learn the basics of PyTorch framework</p>
                <div className="text-sm text-gray-500 mt-2">Duration: 45 minutes</div>
              </div>
              <div className=" rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-2">TensorFlow Basics</h3>
                <p className="text-gray-600">Introduction to TensorFlow 2.0</p>
                <div className="text-sm text-gray-500 mt-2">Duration: 60 minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
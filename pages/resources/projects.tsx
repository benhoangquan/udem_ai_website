import { Hero } from '../../components/Hero';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Student Projects</h1>
        
        {/* Featured Projects */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className=" rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">AI-Powered Study Assistant</h3>
                <p className="text-gray-600 mb-4">An intelligent study companion that helps students organize their learning materials and create personalized study plans.</p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <span className="px-2 py-1 bg-blue-100 rounded">Python</span>
                  <span className="px-2 py-1 bg-blue-100 rounded">NLP</span>
                  <span className="px-2 py-1 bg-blue-100 rounded">Machine Learning</span>
                </div>
              </div>
            </div>
            <div className=" rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Computer Vision Research Tool</h3>
                <p className="text-gray-600 mb-4">A tool for analyzing and processing medical images using advanced computer vision techniques.</p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <span className="px-2 py-1 bg-blue-100 rounded">PyTorch</span>
                  <span className="px-2 py-1 bg-blue-100 rounded">Computer Vision</span>
                  <span className="px-2 py-1 bg-blue-100 rounded">Deep Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Categories */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Beginner Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className=" p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Image Classification</h3>
                <p className="text-gray-600">Build a simple image classifier using TensorFlow</p>
                <div className="mt-4 text-sm text-blue-600">Difficulty: Easy</div>
              </div>
              <div className=" p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Sentiment Analysis</h3>
                <p className="text-gray-600">Create a basic sentiment analyzer for text</p>
                <div className="mt-4 text-sm text-blue-600">Difficulty: Easy</div>
              </div>
              <div className=" p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Data Visualization</h3>
                <p className="text-gray-600">Visualize ML model performance metrics</p>
                <div className="mt-4 text-sm text-blue-600">Difficulty: Easy</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Advanced Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className=" p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Generative AI Art</h3>
                <p className="text-gray-600">Create an AI system that generates artistic images</p>
                <div className="mt-4 text-sm text-blue-600">Difficulty: Advanced</div>
              </div>
              <div className=" p-6 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Reinforcement Learning</h3>
                <p className="text-gray-600">Build an AI agent that learns to play games</p>
                <div className="mt-4 text-sm text-blue-600">Difficulty: Advanced</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
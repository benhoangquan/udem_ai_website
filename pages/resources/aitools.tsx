import { Hero } from '../../components/Hero';

export default function AIToolsPage() {
  return (
    <div className="">

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">AI Tools & Resources</h1>

        {/* Development Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Development Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Google Colab</h3>
              <p className="text-gray-600 mb-4">Free cloud service that supports Python, particularly well-suited for machine learning and data analysis.</p>
              <div className="text-sm text-blue-600">Free • Cloud-based • GPU Support</div>
            </div>
            <div className="rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Jupyter Notebooks</h3>
              <p className="text-gray-600 mb-4">Interactive computing environment for creating and sharing documents containing live code.</p>
              <div className="text-sm text-blue-600">Open Source • Local/Cloud • Interactive</div>
            </div>
            <div className="rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">VS Code</h3>
              <p className="text-gray-600 mb-4">Popular code editor with excellent support for Python and AI development extensions.</p>
              <div className="text-sm text-blue-600">Free • Cross-platform • Extensible</div>
            </div>
          </div>
        </div>

        {/* Frameworks & Libraries */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Frameworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">TensorFlow</h3>
              <p className="text-gray-600">Open-source ML framework developed by Google</p>
            </div>
            <div className="rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">PyTorch</h3>
              <p className="text-gray-600">Deep learning framework by Facebook</p>
            </div>
            <div className="rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">Scikit-learn</h3>
              <p className="text-gray-600">Machine learning library for Python</p>
            </div>
            <div className="rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-2">Keras</h3>
              <p className="text-gray-600">High-level neural network library</p>
            </div>
          </div>
        </div>

        {/* Online Services */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Cloud Services</h2>
          <div className="rounded-lg shadow-md divide-y">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Google Cloud AI</h3>
              <p className="text-gray-600">Suite of cloud-based AI and ML services</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">AWS SageMaker</h3>
              <p className="text-gray-600">Fully managed service for building ML models</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Azure AI</h3>
              <p className="text-gray-600">Microsoft's AI and cognitive services platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
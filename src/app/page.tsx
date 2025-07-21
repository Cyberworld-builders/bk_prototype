import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-cyan-50 font-medium">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-center">
            <Image
              src="/bk_logo.png"
              alt="BK Assistant Logo"
              width={200}
              height={80}
              priority
              className="h-16 md:h-20 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            BK Assistant Prototype
          </h1>
          <p className="text-lg md:text-xl text-gray-800 font-medium max-w-2xl mx-auto">
            Bankruptcy Case Management System
          </p>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            Professional-grade tools for modern bankruptcy practice
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid gap-6 md:gap-8">
          {/* Property Questionnaire Demo */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
            <div className="flex items-start justify-between flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-3">
                  Property Questionnaire System
                </h2>
                <p className="text-gray-800 mb-4 font-medium leading-relaxed">
                  Experience the improved UX for the 7-step property disclosure process. This demo showcases 
                  the recommendations from the technical analysis, converted to modern React with responsive 
                  design and enhanced usability.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Mobile-responsive design
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Progressive disclosure UX patterns
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Enhanced form validation and accessibility
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <Link 
                  href="/property-questionnaire"
                  className="inline-block w-full md:w-auto bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center min-h-[44px] flex items-center justify-center"
                >
                  Launch Demo →
                </Link>
              </div>
            </div>
          </div>

          {/* Technical Overview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-4">
              Technical Implementation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Frontend Stack</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Next.js 15 with App Router</li>
                  <li>• React 19 with TypeScript</li>
                  <li>• Tailwind CSS 4</li>
                  <li>• Mobile-first responsive design</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Key Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Multi-step form workflow</li>
                  <li>• Real-time progress tracking</li>
                  <li>• Accessible navigation patterns</li>
                  <li>• Docker containerization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Deployment Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-3">
              Deployment Information
            </h3>
            <p className="text-gray-800 font-medium mb-4">
              This prototype is deployed using Docker Compose with Traefik reverse proxy, 
              supporting hot reload for development and production-ready builds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Environment:</span>
                <span className="text-gray-600 ml-2">Docker + Traefik</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Port:</span>
                <span className="text-gray-600 ml-2">3011</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Domain:</span>
                <span className="text-gray-600 ml-2">bk-demo.cyberworldbuilders.dev</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="text-green-600 ml-2 font-medium">Live Demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} BK Assistant - Bankruptcy Case Management System</p>
            <p className="mt-1">Professional prototype demonstration</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

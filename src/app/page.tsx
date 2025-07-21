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
          {/* Demo Options Header */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Property Questionnaire Demos
            </h2>
            <p className="text-lg text-gray-600">
              Compare three distinct UX approaches for the 7-step property disclosure process
            </p>
          </div>

          {/* Demo Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Version 1 - Sidebar Navigation */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-blue-900">
                    Sidebar Navigation
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Version 1
                  </span>
                </div>
                <p className="text-gray-800 mb-4 font-medium leading-relaxed">
                  Traditional sidebar approach with persistent navigation and step overview. 
                  Familiar desktop-style interface optimized for efficiency.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Fixed sidebar navigation
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Always-visible progress tracking
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Professional form styling
                  </div>
                </div>
              </div>
              <Link 
                href="/property-questionnaire"
                className="inline-block w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center min-h-[44px] flex items-center justify-center"
              >
                Launch Sidebar Demo →
              </Link>
            </div>

            {/* Version 2 - Wizard Style */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-emerald-800">
                    Guided Wizard
                  </h3>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                    Version 2
                  </span>
                </div>
                <p className="text-gray-800 mb-4 font-medium leading-relaxed">
                  Modern wizard-style workflow with breadcrumb navigation and visual guidance. 
                  Step-by-step approach with enhanced visual feedback.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Breadcrumb progression
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Visual step indicators with icons
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Modern card-based design
                  </div>
                </div>
              </div>
              <Link 
                href="/property-questionnaire-v2"
                className="inline-block w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all text-center min-h-[44px] flex items-center justify-center"
              >
                Launch Wizard Demo →
              </Link>
            </div>

            {/* Version 3 - Dashboard Overview */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                    Dashboard Overview
                  </h3>
                  <span className="px-3 py-1 bg-slate-100 text-slate-800 text-sm font-medium rounded-full">
                    Version 3
                  </span>
                </div>
                <p className="text-gray-800 mb-4 font-medium leading-relaxed">
                  Modern dashboard approach showing all asset categories at once with summary metrics. 
                  Click-to-drill-down interface with real-time progress tracking.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
                    All-in-one dashboard view
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
                    Live summary statistics
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
                    Modal-based detailed forms
                  </div>
                </div>
              </div>
              <Link 
                href="/property-questionnaire-v3"
                className="inline-block w-full bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors text-center min-h-[44px] flex items-center justify-center"
              >
                Launch Dashboard Demo →
              </Link>
            </div>
          </div>

          {/* Comparison Notes */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              🔍 UX Approach Comparison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Sidebar Navigation</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Familiar desktop application pattern</li>
                  <li>• Quick navigation between any step</li>
                  <li>• Constant visibility of all sections</li>
                  <li>• Efficient for power users</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Guided Wizard</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Clear linear progression</li>
                  <li>• Less cognitive load per step</li>
                  <li>• Better mobile experience</li>
                  <li>• Visual guidance and feedback</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Dashboard Overview</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Complete overview at a glance</li>
                  <li>• Real-time progress metrics</li>
                  <li>• Flexible completion order</li>
                  <li>• Modern enterprise UI patterns</li>
                </ul>
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

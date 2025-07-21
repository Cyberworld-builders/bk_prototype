'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface StepData {
  id: number
  name: string
  completed: boolean
  description: string
  icon: string
}

const initialSteps: StepData[] = [
  { id: 1, name: 'Real Property', completed: false, description: 'Homes, land, and real estate assets', icon: '🏠' },
  { id: 2, name: 'Vehicles', completed: false, description: 'Cars, trucks, motorcycles, and RVs', icon: '🚗' },
  { id: 3, name: 'Personal Items', completed: false, description: 'Household goods and personal belongings', icon: '🏺' },
  { id: 4, name: 'Financial Assets 1', completed: false, description: 'Bank accounts and investments', icon: '💰' },
  { id: 5, name: 'Financial Assets 2', completed: false, description: 'Insurance and legal claims', icon: '📊' },
  { id: 6, name: 'Business Assets', completed: false, description: 'Equipment and intellectual property', icon: '💼' },
  { id: 7, name: 'Farm & Fishing', completed: false, description: 'Agricultural and fishing assets', icon: '🚜' }
]

export default function PropertyQuestionnaireV2() {
  const [currentStep, setCurrentStep] = useState(1)
  const [steps, setSteps] = useState(initialSteps)
  const [showPropertyDetails, setShowPropertyDetails] = useState(false)
  const [showVehicleForm, setShowVehicleForm] = useState(false)
  const [showHouseholdForm, setShowHouseholdForm] = useState(false)
  const [showFinancial1Form, setShowFinancial1Form] = useState(false)
  const [showFinancial2Form, setShowFinancial2Form] = useState(false)
  const [showBusinessForm, setShowBusinessForm] = useState(false)
  const [showFarmForm, setShowFarmForm] = useState(false)

  const overallProgress = Math.round((steps.filter(s => s.completed).length / steps.length) * 100)
  const currentStepData = steps.find(s => s.id === currentStep)

  const completeStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ))
  }

  const navigateToStep = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      completeStep(currentStep)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Reusable Components
  const Button = ({ children, variant = 'primary', onClick, disabled = false, ...props }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base
        min-h-[48px] touch-manipulation shadow-sm
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-emerald-200' 
          : variant === 'secondary'
          ? 'bg-white text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-50'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      {...props}
    >
      {children}
    </button>
  )

  const FormGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="mb-6">
      <label className="block mb-3 font-semibold text-gray-800 text-base">{label}</label>
      {children}
    </div>
  )

  const Input = ({ className, ...props }: any) => (
    <input 
      className={`w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 text-gray-900 font-medium text-base min-h-[52px] placeholder:text-gray-500 transition-all ${className || ''}`}
      {...props}
    />
  )

  const Select = ({ children, onChange, ...props }: any) => (
    <select 
      className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 text-gray-900 font-medium text-base min-h-[52px]"
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  )

  const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white border-2 border-gray-100 rounded-2xl p-6 md:p-8 shadow-lg shadow-gray-100 ${className}`}>
      {children}
    </div>
  )

  const Alert = ({ children, variant = 'info' }: { children: React.ReactNode, variant?: string }) => (
    <div className={`
      p-6 rounded-2xl mb-6 font-medium text-base border-2
      ${variant === 'info' 
        ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
        : 'bg-blue-50 border-blue-200 text-blue-900'
      }
    `}>
      {children}
    </div>
  )

  // Progress Breadcrumbs
  const ProgressBreadcrumbs = () => (
    <div className="bg-white border-b-2 border-gray-100 px-4 md:px-8 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image
              src="/bk_logo.png"
              alt="BK Assistant Logo"
              width={150}
              height={60}
              priority
              className="h-10 md:h-12 w-auto cursor-pointer"
            />
          </Link>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Overall Progress</div>
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-emerald-700">{overallProgress}%</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Breadcrumb Steps */}
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <button
                onClick={() => navigateToStep(step.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-xl transition-all
                  ${currentStep === step.id 
                    ? 'bg-emerald-100 text-emerald-800 font-semibold' 
                    : step.completed
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-lg">{step.icon}</span>
                <span className="hidden md:block text-sm font-medium">{step.name}</span>
                {step.completed && <span className="text-green-600 font-bold">✓</span>}
              </button>
              {index < steps.length - 1 && (
                <div className="mx-2 w-6 h-0.5 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{currentStepData?.icon}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{currentStepData?.name}</h1>
              <p className="text-lg text-gray-600">{currentStepData?.description}</p>
            </div>
            
            <Alert>
              📋 List all residences, buildings, land, or other real estate you own. Include properties outside the US or not in your bankruptcy case.
            </Alert>

            <Card>
              <FormGroup label="Do you own any real property?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={() => setShowPropertyDetails(true)}>
                    ✨ Yes, I have property
                  </Button>
                  <Button variant="secondary" onClick={() => alert('No real property recorded.')}>
                    ❌ No property to report
                  </Button>
                </div>
              </FormGroup>

              {showPropertyDetails && (
                <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                  <h3 className="text-xl font-bold text-emerald-900 mb-6">✏️ Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup label="Property Type">
                      <Select defaultValue="">
                        <option value="">Select property type</option>
                        <option value="primary_residence">Primary Residence</option>
                        <option value="vacation_home">Vacation Home</option>
                        <option value="investment_property">Investment Property</option>
                        <option value="raw_land">Raw Land</option>
                        <option value="commercial_property">Commercial Property</option>
                      </Select>
                    </FormGroup>
                    <FormGroup label="Estimated Value">
                      <Input type="text" placeholder="$0.00" />
                    </FormGroup>
                    <FormGroup label="Property Address">
                      <Input type="text" placeholder="123 Main Street, City, State" />
                    </FormGroup>
                    <FormGroup label="Outstanding Mortgage">
                      <Input type="text" placeholder="$0.00" />
                    </FormGroup>
                  </div>
                  <div className="mt-6">
                    <Button onClick={() => alert('Property saved!')}>
                      💾 Save Property
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )

      case 2:
        return (
          <div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{currentStepData?.icon}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{currentStepData?.name}</h1>
              <p className="text-lg text-gray-600">{currentStepData?.description}</p>
            </div>

            <Alert>
              🚗 List all vehicles you own or possess (use for transportation), even if not on title. Include cars, trucks, motorcycles, RVs, etc.
            </Alert>

            <Card>
              <FormGroup label="Do you have any vehicles?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={() => setShowVehicleForm(true)}>
                    🚙 Yes, I have vehicles
                  </Button>
                  <Button variant="secondary" onClick={() => alert('No vehicles recorded.')}>
                    🚫 No vehicles to report
                  </Button>
                </div>
              </FormGroup>

              {showVehicleForm && (
                <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                  <h3 className="text-xl font-bold text-emerald-900 mb-6">🔧 Vehicle Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup label="Vehicle Type">
                      <Select defaultValue="">
                        <option value="">Select vehicle type</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="rv">RV/Motorhome</option>
                        <option value="boat">Boat</option>
                        <option value="other">Other</option>
                      </Select>
                    </FormGroup>
                    <FormGroup label="Year">
                      <Input type="text" placeholder="e.g., 2020" />
                    </FormGroup>
                    <FormGroup label="Make & Model">
                      <Input type="text" placeholder="e.g., Toyota Camry" />
                    </FormGroup>
                    <FormGroup label="Estimated Value">
                      <Input type="text" placeholder="$0.00" />
                    </FormGroup>
                  </div>
                  <FormGroup label="VIN Number (Optional)">
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                      <Input type="text" placeholder="Enter VIN for auto-population" className="flex-1" />
                      <Button onClick={() => alert('VIN lookup feature coming soon!')}>
                        🔍 Auto-Fill
                      </Button>
                    </div>
                  </FormGroup>
                  <div className="mt-6">
                    <Button onClick={() => alert('Vehicle saved!')}>
                      💾 Save Vehicle
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )

      default:
        return (
          <div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{currentStepData?.icon}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{currentStepData?.name}</h1>
              <p className="text-lg text-gray-600">{currentStepData?.description}</p>
            </div>

            <Alert>
              ⚠️ This step is part of the demo. In the full version, you would complete the {currentStepData?.name.toLowerCase()} questionnaire here.
            </Alert>

            <Card>
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  🚧 Demo Step: {currentStepData?.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  This step would contain the full questionnaire for {currentStepData?.description.toLowerCase()}.
                </p>
                <Button onClick={() => alert(`${currentStepData?.name} form would be here in the full version.`)}>
                  📝 Preview Form Structure
                </Button>
              </div>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <ProgressBreadcrumbs />
      
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-12">
          <Button 
            variant="secondary" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            ← Previous Step
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          
          <Button 
            onClick={nextStep}
            disabled={currentStep === steps.length}
          >
            {currentStep === steps.length ? 'Complete ✓' : 'Next Step →'}
          </Button>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface StepData {
  id: number
  name: string
  completed: boolean
  description: string
  icon: React.ReactNode
  itemCount: number
  estimatedValue: string
}

const initialSteps: StepData[] = [
  { 
    id: 1, 
    name: 'Real Property', 
    completed: false, 
    description: 'Homes, land, and real estate assets', 
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    itemCount: 0,
    estimatedValue: '$0'
  },
  { 
    id: 2, 
    name: 'Vehicles', 
    completed: false, 
    description: 'Cars, trucks, motorcycles, and RVs', 
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    itemCount: 0,
    estimatedValue: '$0'
  },
  { 
    id: 3, 
    name: 'Personal Items', 
    completed: false, 
    description: 'Household goods and personal belongings', 
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21l3-1 3 1" /></svg>,
    itemCount: 0,
    estimatedValue: '$0'
  },
  { 
    id: 4, 
    name: 'Financial Assets', 
    completed: false, 
    description: 'Bank accounts and investments', 
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>,
    itemCount: 0,
    estimatedValue: '$0'
  },
  { 
    id: 5, 
    name: 'Insurance & Claims', 
    completed: false, 
    description: 'Insurance policies and legal claims', 
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    itemCount: 0,
    estimatedValue: '$0'
  },
  { 
    id: 6, 
    name: 'Business Assets', 
    completed: false, 
    description: 'Equipment and intellectual property', 
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    itemCount: 0,
    estimatedValue: '$0'
  },
  { 
    id: 7, 
    name: 'Farm & Fishing', 
    completed: false, 
    description: 'Agricultural and fishing assets', 
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    itemCount: 0,
    estimatedValue: '$0'
  }
]

export default function PropertyQuestionnaireV3() {
  const [steps, setSteps] = useState(initialSteps)
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  const overallProgress = Math.round((steps.filter(s => s.completed).length / steps.length) * 100)
  const totalValue = steps.reduce((sum, step) => {
    const value = parseFloat(step.estimatedValue.replace(/[$,]/g, '')) || 0
    return sum + value
  }, 0)

  const completeStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true, itemCount: step.itemCount + 1 } : step
    ))
  }

  const updateStepValue = (stepId: number, value: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, estimatedValue: value } : step
    ))
  }

  // Reusable Components
  const Button = ({ children, variant = 'primary', onClick, disabled = false, size = 'md', ...props }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-semibold transition-all rounded-lg shadow-sm
        ${size === 'sm' 
          ? 'px-4 py-2 text-sm min-h-[36px]' 
          : size === 'lg'
          ? 'px-8 py-4 text-lg min-h-[56px]'
          : 'px-6 py-3 text-base min-h-[44px]'
        }
        ${variant === 'primary' 
          ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200' 
          : variant === 'secondary'
          ? 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          : variant === 'success'
          ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
      <label className="block mb-2 font-medium text-slate-700 text-sm">{label}</label>
      {children}
    </div>
  )

  const Input = ({ className, ...props }: any) => (
    <input 
      className={`w-full p-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-500 text-slate-900 text-sm placeholder:text-slate-500 transition-all ${className || ''}`}
      {...props}
    />
  )

  const Select = ({ children, onChange, ...props }: any) => (
    <select 
      className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-500 text-slate-900 text-sm"
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  )

  const StepCard = ({ step }: { step: StepData }) => (
    <div 
      className={`
        relative bg-white border rounded-xl p-6 transition-all duration-200 cursor-pointer group
        ${step.completed 
          ? 'border-green-200 bg-green-50/50 shadow-sm' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
        }
      `}
      onClick={() => {
        setSelectedStep(step.id)
        setShowForm(true)
      }}
    >
      {step.completed && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
          ✓
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className={`
          p-3 rounded-lg 
          ${step.completed ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'}
        `}>
          {step.icon}
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500 mb-1">Items</div>
          <div className="font-semibold text-slate-900">{step.itemCount}</div>
        </div>
      </div>

      <h3 className="font-semibold text-slate-900 mb-2 text-lg">{step.name}</h3>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{step.description}</p>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500 mb-1">Estimated Value</div>
          <div className="font-bold text-slate-900">{step.estimatedValue}</div>
        </div>
        <div className={`
          px-3 py-1 rounded-full text-xs font-medium
          ${step.completed 
            ? 'bg-green-100 text-green-700' 
            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
          }
        `}>
          {step.completed ? 'Complete' : 'Pending'}
        </div>
      </div>
    </div>
  )

  const FormModal = () => {
    const step = steps.find(s => s.id === selectedStep)
    if (!step || !showForm) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                {step.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{step.name}</h2>
                <p className="text-slate-600">{step.description}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-slate-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            {step.id === 1 && (
              <>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup label="Property Address">
                    <Input type="text" placeholder="123 Main Street, City, State" />
                  </FormGroup>
                  <FormGroup label="Estimated Value">
                    <Input type="text" placeholder="$0.00" />
                  </FormGroup>
                </div>
                <FormGroup label="Outstanding Mortgage Balance">
                  <Input type="text" placeholder="$0.00" />
                </FormGroup>
              </>
            )}

            {step.id === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup label="Vehicle Type">
                    <Select defaultValue="">
                      <option value="">Select vehicle type</option>
                      <option value="car">Car</option>
                      <option value="truck">Truck</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="rv">RV/Motorhome</option>
                      <option value="boat">Boat</option>
                    </Select>
                  </FormGroup>
                  <FormGroup label="Year">
                    <Input type="text" placeholder="e.g., 2020" />
                  </FormGroup>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup label="Make & Model">
                    <Input type="text" placeholder="e.g., Toyota Camry" />
                  </FormGroup>
                  <FormGroup label="Estimated Value">
                    <Input type="text" placeholder="$0.00" />
                  </FormGroup>
                </div>
                <FormGroup label="VIN Number (Optional)">
                  <div className="flex space-x-3">
                    <Input type="text" placeholder="Enter VIN for auto-population" className="flex-1" />
                    <Button size="sm" onClick={() => alert('VIN lookup coming soon!')}>
                      Auto-Fill
                    </Button>
                  </div>
                </FormGroup>
              </>
            )}

            {step.id > 2 && (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  Demo Form: {step.name}
                </h3>
                <p className="text-slate-600 mb-6">
                  This would contain the full questionnaire for {step.description.toLowerCase()}.
                </p>
                <Button variant="secondary" onClick={() => alert(`${step.name} form structure would be implemented here.`)}>
                  Preview Form Fields
                </Button>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              <Button variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button 
                variant="success" 
                onClick={() => {
                  completeStep(step.id)
                  updateStepValue(step.id, step.id === 1 ? '$285,000' : step.id === 2 ? '$22,500' : '$5,000')
                  setShowForm(false)
                }}
              >
                Save & Complete
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between">
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
              <div className="text-sm text-slate-600 mb-1">Property Questionnaire</div>
              <div className="text-2xl font-bold text-slate-900">Dashboard Overview</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Progress</div>
            <div className="text-3xl font-bold text-slate-900 mb-2">{overallProgress}%</div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-900 transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Completed Sections</div>
            <div className="text-3xl font-bold text-slate-900">{steps.filter(s => s.completed).length} / {steps.length}</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Total Items</div>
            <div className="text-3xl font-bold text-slate-900">{steps.reduce((sum, s) => sum + s.itemCount, 0)}</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Estimated Total Value</div>
            <div className="text-3xl font-bold text-slate-900">${totalValue.toLocaleString()}</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">📋 Property Disclosure Instructions</h2>
          <p className="text-blue-800">
            Complete each section by clicking on the cards below. Each category represents a different type of asset 
            that must be disclosed in your bankruptcy case. Click any card to open the detailed form for that asset type.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(step => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-4">
            <Button variant="secondary" size="lg">
              Save Progress
            </Button>
            <Button 
              variant="primary" 
              size="lg"
              disabled={overallProgress < 100}
            >
              Submit Questionnaire
            </Button>
          </div>
        </div>
      </div>

      <FormModal />
    </div>
  )
} 
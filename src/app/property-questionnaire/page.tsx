'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface StepData {
  id: number
  name: string
  completed: boolean
}

interface PropertyItem {
  id: string
  type: string
  description: string
  value: string
}

const initialSteps: StepData[] = [
  { id: 1, name: 'Real Property', completed: false },
  { id: 2, name: 'Vehicles', completed: false },
  { id: 3, name: 'Personal/Household Items', completed: false },
  { id: 4, name: 'Financial Assets (Part 1)', completed: false },
  { id: 5, name: 'Financial Assets (Part 2)', completed: false },
  { id: 6, name: 'Business Assets', completed: false },
  { id: 7, name: 'Farm/Fishing Property', completed: false },
]

export default function PropertyQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(1)
  const [steps, setSteps] = useState(initialSteps)
  const [showPropertyDetails, setShowPropertyDetails] = useState(false)
  const [showVehicleForm, setShowVehicleForm] = useState(false)
  const [showHouseholdForm, setShowHouseholdForm] = useState(false)
  const [showFinancial1Form, setShowFinancial1Form] = useState(false)
  const [showFinancial2Form, setShowFinancial2Form] = useState(false)
  const [showBusinessForm, setShowBusinessForm] = useState(false)
  const [showFarmForm, setShowFarmForm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const overallProgress = Math.round((steps.filter(s => s.completed).length / steps.length) * 100)

  const navigateToStep = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const saveStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ))
    
    if (stepId < 7) {
      setCurrentStep(stepId + 1)
    } else {
      alert('Questionnaire Completed!')
    }
  }

  // addPropertyItem function removed for prototype - not currently used

  const handleResidenceChange = (value: string) => {
    setShowPropertyDetails(value === 'own')
  }

  const StepNavigation = () => (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white p-5 border-r border-slate-200 h-screen fixed">
        <h2 className="text-lg font-bold text-blue-900 mb-5">Questionnaire</h2>
        <ul className="space-y-1">
          {steps.map((step) => (
            <li
              key={step.id}
              onClick={() => navigateToStep(step.id)}
              className={`
                p-2.5 cursor-pointer rounded transition-colors font-medium
                ${currentStep === step.id 
                  ? 'bg-blue-200 font-bold text-blue-900' 
                  : 'hover:bg-blue-50 text-gray-800'
                }
                ${step.completed ? 'text-green-700 font-semibold' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{step.name}</span>
                {step.completed && <span className="text-green-600 font-bold">✓</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-80 max-w-[90vw] h-full p-5 shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-blue-900">Questionnaire</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <ul className="space-y-2">
              {steps.map((step) => (
                <li
                  key={step.id}
                  onClick={() => {
                    navigateToStep(step.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`
                    p-3 cursor-pointer rounded transition-colors font-medium
                    ${currentStep === step.id 
                      ? 'bg-blue-200 font-bold text-blue-900' 
                      : 'hover:bg-blue-50 text-gray-800'
                    }
                    ${step.completed ? 'text-green-700 font-semibold' : ''}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{step.name}</span>
                    {step.completed && <span className="text-green-600 font-bold">✓</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )

  const Header = () => (
    <div className="flex items-center justify-between mb-4 md:mb-8">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden p-2 text-blue-900 hover:bg-blue-50 rounded"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Logo - responsive sizing with navigation */}
      <Link href="/" className="transition-opacity hover:opacity-80">
        <Image
          src="/bk_logo.png"
          alt="BK Assistant Logo"
          width={150}
          height={60}
          priority
          className="h-8 md:h-12 w-auto cursor-pointer"
        />
      </Link>

      {/* Progress - responsive layout */}
      <div className="text-xs md:text-sm text-gray-800 font-medium">
        <div className="hidden sm:block">Progress: {overallProgress}%</div>
        <div className="sm:hidden text-center">{overallProgress}%</div>
        <div className="w-16 md:w-32 h-1.5 bg-blue-100 rounded-full mt-1 md:mt-2 overflow-hidden">
          <div 
            className="h-full bg-blue-900 transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  )

  const PropertyCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 md:p-4 mb-3 md:mb-4 font-medium ${className}`}>
      {children}
    </div>
  )

  const FormGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="mb-4 md:mb-5">
      <label className="block mb-2 font-semibold text-gray-800 text-sm md:text-base">{label}</label>
      {children}
    </div>
  )

  const Select = ({ children, onChange, ...props }: any) => (
    <select 
      className="w-full p-3 md:p-2.5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium text-sm md:text-base min-h-[44px] [&>option]:text-gray-900 [&>option]:font-medium [&>option:first-child]:text-gray-500"
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  )

  const Input = ({ className, ...props }: any) => (
    <input 
      className={`w-full p-3 md:p-2.5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium text-sm md:text-base min-h-[44px] placeholder:text-gray-500 placeholder:font-normal ${className || ''}`}
      {...props}
    />
  )

  const Button = ({ children, variant = 'primary', onClick, ...props }: any) => (
    <button
      onClick={onClick}
      className={`
        px-4 md:px-5 py-3 md:py-2.5 rounded font-semibold transition-colors text-sm md:text-base
        min-h-[44px] touch-manipulation
        ${variant === 'primary' 
          ? 'bg-blue-900 text-white hover:bg-blue-800 active:bg-blue-800' 
          : 'bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-800'
        }
      `}
      {...props}
    >
      {children}
    </button>
  )

  const Alert = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3 md:p-4 rounded-lg mb-4 md:mb-5 font-medium text-sm md:text-base">
      {children}
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-5">Real Property</h1>
            <Alert>
              List all residences, buildings, land, or other real estate you own. Include properties outside the US or not in your bankruptcy case.
            </Alert>
            <FormGroup label="Do you own or rent your current residence?">
              <Select onChange={(e: any) => handleResidenceChange(e.target.value)}>
                <option value="" className="text-gray-500">Select...</option>
                <option value="own" className="text-gray-900">Own</option>
                <option value="rent" className="text-gray-900">Rent</option>
              </Select>
            </FormGroup>
            {showPropertyDetails && (
              <PropertyCard>
                <FormGroup label="Property Type">
                  <Select>
                                         <option value="" className="text-gray-500">Select type...</option>
                                          <option className="text-gray-900">Single Family Home</option>
                      <option className="text-gray-900">Duplex/Multi-unit</option>
                      <option className="text-gray-900">Condominium</option>
                      <option className="text-gray-900">Manufactured Home</option>
                      <option className="text-gray-900">Land</option>
                      <option className="text-gray-900">Investment Property</option>
                      <option className="text-gray-900">Timeshare</option>
                      <option className="text-gray-900">Other</option>
                  </Select>
                </FormGroup>
                <FormGroup label="Address">
                  <Input type="text" placeholder="Enter address" />
                </FormGroup>
                <FormGroup label="Estimated Value">
                  <Input type="number" placeholder="Enter value" />
                </FormGroup>
              </PropertyCard>
            )}
            <Button onClick={() => saveStep(1)}>Save & Next</Button>
          </div>
        )

      case 2:
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-5">Vehicles</h1>
            <Alert>
              List all vehicles you own or possess (use for transportation), even if not on title. Include cars, trucks, motorcycles, RVs, etc.
            </Alert>
            <FormGroup label="Do you have any vehicles?">
              <div className="space-y-2 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
                <Button onClick={() => setShowVehicleForm(true)}>Yes</Button>
                <Button variant="secondary" onClick={() => alert('No vehicles added.')}>No</Button>
              </div>
            </FormGroup>
            {showVehicleForm && (
              <div>
                <PropertyCard>
                  <FormGroup label="Vehicle Type">
                    <Select>
                      <option>Car</option>
                      <option>Truck</option>
                      <option>SUV</option>
                      <option>Motorcycle</option>
                      <option>RV</option>
                      <option>Other</option>
                    </Select>
                  </FormGroup>
                  <FormGroup label="VIN Number">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                      <Input type="text" placeholder="Enter VIN" className="flex-1" />
                      <Button onClick={() => alert('Mock auto import')}>Auto Import</Button>
                    </div>
                  </FormGroup>
                  <FormGroup label="Year, Make, Model">
                    <Input type="text" placeholder="e.g. 2020 Toyota Camry" />
                  </FormGroup>
                  <FormGroup label="Estimated Value">
                    <Input type="number" placeholder="Enter value" />
                  </FormGroup>
                </PropertyCard>
                <Button variant="secondary" onClick={() => alert('Add Another Vehicle - Feature coming soon')}>
                  Add Another Vehicle
                </Button>
              </div>
            )}
            <div className="mt-5">
              <Button onClick={() => saveStep(2)}>Save & Next</Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-5">Personal and Household Items</h1>
            <Alert>
              List all household goods, furnishings, electronics, etc. Be thorough, even for low-value items.
            </Alert>
            <FormGroup label="Do you have household items?">
              <div className="space-y-2 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
                <Button onClick={() => setShowHouseholdForm(true)}>Yes</Button>
                <Button variant="secondary" onClick={() => alert('No household items added.')}>No</Button>
              </div>
            </FormGroup>
            {showHouseholdForm && (
              <div>
                <PropertyCard>
                  <FormGroup label="Category">
                    <Select>
                      <option>Furniture</option>
                      <option>Appliances</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Other</option>
                    </Select>
                  </FormGroup>
                  <FormGroup label="Description">
                    <Input type="text" placeholder="e.g. Sofa, TV, etc." />
                  </FormGroup>
                  <FormGroup label="Estimated Value">
                    <Input type="number" placeholder="Enter value" />
                  </FormGroup>
                </PropertyCard>
                <Button variant="secondary" onClick={() => alert('Add Another Item - Feature coming soon')}>
                  Add Another Item
                </Button>
              </div>
            )}
            <div className="mt-5">
              <Button onClick={() => saveStep(3)}>Save & Next</Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-5">Financial Assets (Part 1)</h1>
            <Alert>
              List bank accounts, investments, retirement accounts, etc.
            </Alert>
            <FormGroup label="Do you have financial assets?">
              <div className="space-y-2 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
                <Button onClick={() => setShowFinancial1Form(true)}>Yes</Button>
                <Button variant="secondary" onClick={() => alert('No financial assets added.')}>No</Button>
              </div>
            </FormGroup>
            {showFinancial1Form && (
              <div>
                <PropertyCard>
                  <FormGroup label="Asset Type">
                    <Select>
                      <option>Checking Account</option>
                      <option>Savings Account</option>
                      <option>Investment Account</option>
                      <option>Retirement Account</option>
                      <option>Other</option>
                    </Select>
                  </FormGroup>
                  <FormGroup label="Institution Name">
                    <Input type="text" placeholder="e.g. Bank of America" />
                  </FormGroup>
                  <FormGroup label="Account Number (last 4 digits)">
                    <Input type="text" placeholder="XXXX" />
                  </FormGroup>
                  <FormGroup label="Balance">
                    <Input type="number" placeholder="Enter balance" />
                  </FormGroup>
                </PropertyCard>
                <Button variant="secondary" onClick={() => alert('Add Another Asset - Feature coming soon')}>
                  Add Another Asset
                </Button>
              </div>
            )}
            <div className="mt-5">
              <Button onClick={() => saveStep(4)}>Save & Next</Button>
            </div>
          </div>
        )

      case 5:
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-5">Financial Assets (Part 2)</h1>
            <Alert>
              List insurance policies, tax refunds, legal claims, etc.
            </Alert>
            <FormGroup label="Do you have additional financial assets?">
              <div className="space-y-2 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
                <Button onClick={() => setShowFinancial2Form(true)}>Yes</Button>
                <Button variant="secondary" onClick={() => alert('No additional financial assets added.')}>No</Button>
              </div>
            </FormGroup>
            {showFinancial2Form && (
              <div>
                <PropertyCard>
                  <FormGroup label="Asset Type">
                    <Select>
                      <option>Life Insurance</option>
                      <option>Tax Refund</option>
                      <option>Legal Claim</option>
                      <option>Unpaid Wages</option>
                      <option>Other</option>
                    </Select>
                  </FormGroup>
                  <FormGroup label="Description">
                    <Input type="text" placeholder="Enter description" />
                  </FormGroup>
                  <FormGroup label="Value">
                    <Input type="number" placeholder="Enter value" />
                  </FormGroup>
                </PropertyCard>
                <Button variant="secondary" onClick={() => alert('Add Another Asset - Feature coming soon')}>
                  Add Another Asset
                </Button>
              </div>
            )}
            <div className="mt-5">
              <Button onClick={() => saveStep(5)}>Save & Next</Button>
            </div>
          </div>
        )

      case 6:
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-5">Business-Related Assets</h1>
            <Alert>
              List business equipment, inventory, intellectual property, etc.
            </Alert>
            <FormGroup label="Do you have business assets?">
              <div className="space-y-2 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
                <Button onClick={() => setShowBusinessForm(true)}>Yes</Button>
                <Button variant="secondary" onClick={() => alert('No business assets added.')}>No</Button>
              </div>
            </FormGroup>
            {showBusinessForm && (
              <div>
                <PropertyCard>
                  <FormGroup label="Asset Type">
                    <Select>
                      <option>Equipment</option>
                      <option>Inventory</option>
                      <option>Intellectual Property</option>
                      <option>Other</option>
                    </Select>
                  </FormGroup>
                  <FormGroup label="Description">
                    <Input type="text" placeholder="Enter description" />
                  </FormGroup>
                  <FormGroup label="Value">
                    <Input type="number" placeholder="Enter value" />
                  </FormGroup>
                </PropertyCard>
                <Button variant="secondary" onClick={() => alert('Add Another Asset - Feature coming soon')}>
                  Add Another Asset
                </Button>
              </div>
            )}
            <div className="mt-5">
              <Button onClick={() => saveStep(6)}>Save & Next</Button>
            </div>
          </div>
        )

      case 7:
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-5">Farm and Commercial Fishing Property</h1>
            <Alert>
              List farm equipment, livestock, crops, fishing boats, licenses, etc.
            </Alert>
            <FormGroup label="Do you have farm or fishing assets?">
              <div className="space-y-2 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
                <Button onClick={() => setShowFarmForm(true)}>Yes</Button>
                <Button variant="secondary" onClick={() => alert('No farm/fishing assets added.')}>No</Button>
              </div>
            </FormGroup>
            {showFarmForm && (
              <div>
                <PropertyCard>
                  <FormGroup label="Asset Type">
                    <Select>
                      <option>Farm Equipment</option>
                      <option>Livestock</option>
                      <option>Crops</option>
                      <option>Fishing Boat</option>
                      <option>Other</option>
                    </Select>
                  </FormGroup>
                  <FormGroup label="Description">
                    <Input type="text" placeholder="Enter description" />
                  </FormGroup>
                  <FormGroup label="Value">
                    <Input type="number" placeholder="Enter value" />
                  </FormGroup>
                </PropertyCard>
                <Button variant="secondary" onClick={() => alert('Add Another Asset - Feature coming soon')}>
                  Add Another Asset
                </Button>
              </div>
            )}
            <div className="mt-5">
              <Button onClick={() => saveStep(7)}>Save & Complete</Button>
            </div>
          </div>
        )

      default:
        return <div>Step not found</div>
    }
  }

  return (
    <div className="flex min-h-screen bg-cyan-50 font-medium">
      <StepNavigation />
      <div className="flex-1 md:ml-64 p-4 md:p-10">
        <Header />
        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  )
} 
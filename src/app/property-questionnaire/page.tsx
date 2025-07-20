'use client'

import { useState } from 'react'
import Image from 'next/image'

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
  const [propertyItems, setPropertyItems] = useState<PropertyItem[]>([])

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

  const addPropertyItem = (type: string) => {
    const newItem: PropertyItem = {
      id: Date.now().toString(),
      type,
      description: '',
      value: ''
    }
    setPropertyItems(prev => [...prev, newItem])
  }

  const handleResidenceChange = (value: string) => {
    setShowPropertyDetails(value === 'own')
  }

  const StepNavigation = () => (
    <div className="w-64 bg-white p-5 border-r border-slate-200 h-screen fixed">
      <h2 className="text-lg font-semibold text-blue-900 mb-5">Questionnaire</h2>
      <ul className="space-y-1">
        {steps.map((step) => (
          <li
            key={step.id}
            onClick={() => navigateToStep(step.id)}
            className={`
              p-2.5 cursor-pointer rounded transition-colors
              ${currentStep === step.id 
                ? 'bg-blue-200 font-semibold' 
                : 'hover:bg-blue-50'
              }
              ${step.completed ? 'text-green-700' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <span>{step.name}</span>
              {step.completed && <span className="text-green-600">✓</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  const Header = () => (
    <div className="flex items-center justify-between mb-8">
      <Image
        src="/bk_logo.png"
        alt="BK Assistant Logo"
        width={150}
        height={60}
        priority
        className="h-12 w-auto"
      />
      <div className="text-sm text-gray-600">
        Progress: {overallProgress}%
        <div className="w-32 h-1.5 bg-blue-100 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-blue-900 transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  )

  const PropertyCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 mb-4 ${className}`}>
      {children}
    </div>
  )

  const FormGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="mb-5">
      <label className="block mb-2 font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )

  const Select = ({ children, onChange, ...props }: any) => (
    <select 
      className="w-full p-2.5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  )

  const Input = (props: any) => (
    <input 
      className="w-full p-2.5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  )

  const Button = ({ children, variant = 'primary', onClick, ...props }: any) => (
    <button
      onClick={onClick}
      className={`
        px-5 py-2.5 rounded font-medium transition-colors
        ${variant === 'primary' 
          ? 'bg-blue-900 text-white hover:bg-blue-800' 
          : 'bg-gray-600 text-white hover:bg-gray-700'
        }
      `}
      {...props}
    >
      {children}
    </button>
  )

  const Alert = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-5">
      {children}
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h1 className="text-2xl font-semibold text-blue-900 mb-5">Real Property</h1>
            <Alert>
              List all residences, buildings, land, or other real estate you own. Include properties outside the US or not in your bankruptcy case.
            </Alert>
            <FormGroup label="Do you own or rent your current residence?">
              <Select onChange={(e: any) => handleResidenceChange(e.target.value)}>
                <option value="">Select...</option>
                <option value="own">Own</option>
                <option value="rent">Rent</option>
              </Select>
            </FormGroup>
            {showPropertyDetails && (
              <PropertyCard>
                <FormGroup label="Property Type">
                  <Select>
                    <option value="">Select type...</option>
                    <option>Single Family Home</option>
                    <option>Duplex/Multi-unit</option>
                    <option>Condominium</option>
                    <option>Manufactured Home</option>
                    <option>Land</option>
                    <option>Investment Property</option>
                    <option>Timeshare</option>
                    <option>Other</option>
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
            <h1 className="text-2xl font-semibold text-blue-900 mb-5">Vehicles</h1>
            <Alert>
              List all vehicles you own or possess (use for transportation), even if not on title. Include cars, trucks, motorcycles, RVs, etc.
            </Alert>
            <FormGroup label="Do you have any vehicles?">
              <div className="space-x-3">
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
                    <div className="flex space-x-2">
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
                <Button variant="secondary" onClick={() => addPropertyItem('vehicle')}>
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
            <h1 className="text-2xl font-semibold text-blue-900 mb-5">Personal and Household Items</h1>
            <Alert>
              List all household goods, furnishings, electronics, etc. Be thorough, even for low-value items.
            </Alert>
            <FormGroup label="Do you have household items?">
              <div className="space-x-3">
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
                <Button variant="secondary" onClick={() => addPropertyItem('household')}>
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
            <h1 className="text-2xl font-semibold text-blue-900 mb-5">Financial Assets (Part 1)</h1>
            <Alert>
              List bank accounts, investments, retirement accounts, etc.
            </Alert>
            <FormGroup label="Do you have financial assets?">
              <div className="space-x-3">
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
                <Button variant="secondary" onClick={() => addPropertyItem('financial1')}>
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
            <h1 className="text-2xl font-semibold text-blue-900 mb-5">Financial Assets (Part 2)</h1>
            <Alert>
              List insurance policies, tax refunds, legal claims, etc.
            </Alert>
            <FormGroup label="Do you have additional financial assets?">
              <div className="space-x-3">
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
                <Button variant="secondary" onClick={() => addPropertyItem('financial2')}>
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
            <h1 className="text-2xl font-semibold text-blue-900 mb-5">Business-Related Assets</h1>
            <Alert>
              List business equipment, inventory, intellectual property, etc.
            </Alert>
            <FormGroup label="Do you have business assets?">
              <div className="space-x-3">
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
                <Button variant="secondary" onClick={() => addPropertyItem('business')}>
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
            <h1 className="text-2xl font-semibold text-blue-900 mb-5">Farm and Commercial Fishing Property</h1>
            <Alert>
              List farm equipment, livestock, crops, fishing boats, licenses, etc.
            </Alert>
            <FormGroup label="Do you have farm or fishing assets?">
              <div className="space-x-3">
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
                <Button variant="secondary" onClick={() => addPropertyItem('farm')}>
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
    <div className="flex min-h-screen bg-cyan-50">
      <StepNavigation />
      <div className="ml-64 p-10 flex-1">
        <Header />
        <div className="max-w-4xl">
          {renderStep()}
        </div>
      </div>
    </div>
  )
} 
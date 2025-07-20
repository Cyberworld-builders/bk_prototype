# Client Property Questionnaire System Analysis

**Generated on:** December 26, 2024  
**Purpose:** Technical analysis for UX prototype development  
**System:** BKAssistant Web Application - Property Dashboard

---

## 📋 Executive Summary

The Client Property Questionnaire is a critical component of the bankruptcy case management system that guides clients through a comprehensive 7-step process to capture all property and asset information required for legal proceedings. The system ensures complete disclosure compliance while providing an attorney-supervised workflow with real-time validation and progress tracking.

## 🎯 System Purpose & Legal Context

### Primary Objectives
- **Legal Compliance**: Ensure complete property disclosure as required by bankruptcy law
- **Asset Protection**: Help clients identify and properly categorize all owned or possessed property
- **Attorney Oversight**: Enable attorney review and editing of client-submitted information
- **Progress Tracking**: Provide clear progression through complex legal requirements

### Regulatory Requirements
- **Full Disclosure Mandate**: Clients must list ALL property owned or possessed, including:
  - Property outside the United States
  - Property not being included in the bankruptcy case
  - Property with little to no value
- **Court Compliance**: Failure to disclose property may result in court action
- **Geographic Scope**: Must include domestic and international property holdings

## 🏗️ System Architecture

### Technical Stack
- **Backend**: Laravel 8+ PHP Framework
- **Frontend**: Blade Templates with Bootstrap UI
- **JavaScript**: jQuery with custom validation and AJAX handling
- **Database**: MySQL with structured property tables
- **File Storage**: S3 integration for document management

### Core Components
```
ClientPropertyController.php     # Main orchestration
├── Step Controllers (1-7)       # Individual step logic
├── Data Models                  # Property data persistence
│   ├── ClientsPropertyResident
│   ├── ClientsPropertyVehicle
│   ├── ClientsPropertyHousehold
│   └── [Additional models...]
├── Validation Layer            # Client & server-side validation
├── Progress Tracking           # Completion status management
└── Attorney Edit Interface     # Supervision capabilities
```

## 📊 Property Questionnaire Steps

### Step 1: Real Property (Residence, Building, Land, Other Real Estate)
**Route**: `/client/property/step1`  
**Controller**: `ClientPropertyController@client_property_step1`

#### Functionality
- **Property Type Selection**: 8 categorized property types
  - Single family home
  - Duplex/multi-unit building
  - Condominium/cooperative
  - Manufactured/mobile home
  - Land
  - Investment property
  - Timeshare
  - Other
- **Ownership Status**: Primary vs non-primary residence classification
- **Loan Management**: Comprehensive mortgage/loan tracking (up to 3 loans per property)
- **Property Details**: Address, value, ownership percentage
- **Retention Decision**: Keep vs surrender property choice

#### User Experience Patterns
- **Progressive Disclosure**: Property details appear based on type selection
- **Dynamic Form Addition**: "Add Additional Property" button for multiple properties
- **Visual Hierarchy**: Numbered property cards with collapsible sections
- **Validation States**: Real-time error highlighting and tooltips

### Step 2: Vehicles
**Route**: `/client/property/step2`  
**Controller**: `ClientPropertyController@client_property_step2`

#### Functionality
- **Vehicle Categories**: Cars, vans, trucks, tractors, SUVs, motorcycles, RVs, watercraft, aircraft, motorhomes, ATVs
- **Possession vs Ownership**: Distinguishes between title ownership and usage rights
- **VIN Integration**: CARMD API integration for vehicle data fetching
- **Recreational vs Transportation**: Separate categorization with different limits (8 vehicles, 5 recreational)
- **Loan Details**: Financing information for each vehicle

#### UX Innovations
- **VIN Tutorial Integration**: Video guidance for finding VIN numbers
- **Auto-population**: API-driven vehicle detail completion
- **Possession Clarity**: Clear messaging about usage vs ownership requirements
- **Limit Enforcement**: Client-side validation preventing excessive entries

### Step 3: Personal and Household Items
**Route**: `/client/property/step3`  
**Controller**: `ClientPropertyController@client_property_step3`

#### Functionality
- **Detailed vs Summary Mode**: Attorney-configurable granularity levels
- **Template System**: Pre-populated categories based on attorney templates
- **Value Assessment**: Estimated current market values
- **Category Organization**: Structured household item classification
- **Ownership Attribution**: Joint vs individual ownership designation

#### Educational Components
- **Legal Importance Messaging**: Clear explanation of disclosure requirements
- **Value Guidance**: Assistance with realistic valuation
- **Comprehensive Coverage**: Emphasis on including low-value items

### Step 4: Financial Assets (Part 1)
**Route**: `/client/property/step4`  
**Controller**: `ClientPropertyController@client_property_step4`

#### Functionality
- **Account Types**: Banking, investment, retirement accounts
- **Financial Institution Details**: Bank names, account numbers, balances
- **Statement Integration**: Connection to uploaded financial documents
- **Business Account Detection**: Alerts for business-related financial assets
- **Multi-owner Accounts**: Joint account handling

### Step 5: Financial Assets Continued (Part 2)
**Route**: `/client/property/step4/continued`  
**Controller**: `ClientPropertyController@client_property_step4_continue`

#### Functionality
- **Extended Financial Assets**: Insurance policies, tax refunds, legal claims
- **Complex Asset Types**: 
  - Life insurance cash value
  - Unpaid wages/commissions
  - Alimony/child support owed
  - Legal settlement proceeds
- **Value Determination**: Current vs potential value assessment

### Step 6: Business-Related Assets
**Route**: `/client/property/step5`  
**Controller**: `ClientPropertyController@client_property_step5`

#### Functionality
- **Business Property Classification**: Equipment, inventory, intellectual property
- **Valuation Methods**: Book value vs market value options
- **Partnership Interests**: Ownership percentages in business entities
- **Professional Practice Assets**: Special handling for professional practices

### Step 7: Farm and Commercial Fishing-Related Property
**Route**: `/client/property/step6`  
**Controller**: `ClientPropertyController@client_property_step6`

#### Functionality
- **Agricultural Assets**: Farm equipment, livestock, crops
- **Fishing Industry Assets**: Boats, equipment, licenses
- **Seasonal Considerations**: Harvest timing and value fluctuations
- **Specialized Valuation**: Industry-specific assessment methods

## 👤 User Experience Flow

### Navigation Pattern
```
Dashboard → Property Tab → Step Progression (1-7) → Completion
```

### Interaction Model
1. **Step Entry**: Guided form presentation with contextual help
2. **Information Gathering**: Progressive disclosure based on user responses
3. **Validation**: Real-time client-side and server-side validation
4. **Saving**: AJAX-powered incremental saving with progress indication
5. **Review**: Summary views with edit capabilities
6. **Attorney Review**: Professional oversight and modification capabilities

### Progress Indicators
- **Step Completion**: Visual progress bars and completion percentages
- **Form Validation**: Red highlighting for incomplete/invalid fields
- **Save State**: Clear indication of saved vs unsaved changes
- **Overall Progress**: Dashboard-level completion tracking

## 🔧 Technical Implementation

### Data Persistence
```php
// Primary property data models
ClientsPropertyResident::class      // Real estate holdings
ClientsPropertyVehicle::class       // Vehicle information
ClientsPropertyHousehold::class     // Personal items
ClientsPropertyFinancialAssets::class  // Financial accounts
ClientsPropertyBusinessAssets::class   // Business property
ClientsPropertyFarmCommercial::class   // Agricultural assets
```

### Validation Framework
```javascript
// Client-side validation patterns
- Required field validation
- Format validation (dates, currency, etc.)
- Business logic validation (date ranges, value limits)
- Real-time error messaging
- Form submission prevention on errors
```

### AJAX Architecture
```javascript
// Key interaction functions
addResidenceForm()           // Dynamic form addition
saveResident()              // Incremental saving
checkResidentSelection()    // Pre-submission validation
currently_lived_property()  // Conditional field display
```

### Permission System
```php
// Edit permission checking
Helper::isTabEditable('can_edit_property')
// Attorney-controlled client editing capabilities
```

## 📱 Responsive Design Considerations

### Mobile Optimization
- **Touch-Friendly Controls**: Large tap targets for radio buttons and dropdowns
- **Simplified Navigation**: Step-by-step progression optimized for small screens
- **Input Optimization**: Appropriate keyboard types for different input fields
- **Progress Preservation**: Robust session management for interrupted sessions

### Cross-Browser Compatibility
- **jQuery Dependency**: Extensive use of jQuery for cross-browser consistency
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Validation Fallbacks**: Server-side validation backup for client-side failures

## 🚨 Current UX Pain Points

### Complexity Management
- **Information Overload**: Dense forms with extensive legal terminology
- **Cognitive Load**: Multiple decision points requiring legal knowledge
- **Error Recovery**: Complex error states that may confuse users
- **Progress Anxiety**: Unclear time estimates for completion

### Navigation Challenges
- **Linear Progression**: Limited ability to jump between sections
- **Context Loss**: Difficulty understanding relationship between steps
- **Save State Confusion**: Unclear indicators of progress preservation
- **Exit/Re-entry**: Challenges resuming interrupted sessions

### Data Entry Friction
- **Repetitive Information**: Similar data required across multiple steps
- **Validation Timing**: Aggressive validation that interrupts user flow
- **Help System**: Limited contextual guidance for complex decisions
- **Value Estimation**: Difficulty providing accurate asset valuations

## 🎨 Design Patterns & UI Components

### Form Components
```scss
// Key UI patterns
.light-gray-div              // Section containers
.btn-toggle                  // Radio button styling
.custom-radio-group          // Radio button groupings
.circle-number-div           // Step numbering
.outline-gray-border-area    // Property item containers
```

### Interactive Elements
- **Toggle Buttons**: Radio button alternatives with visual feedback
- **Collapsible Sections**: Expandable property details
- **Tooltip System**: Contextual help integration
- **Modal Dialogs**: Additional information gathering
- **Progress Indicators**: Visual completion tracking

### Information Architecture
- **Hierarchical Organization**: Property types → Details → Loans/Values
- **Conditional Display**: Show/hide based on user selections
- **Summary Views**: Collapsed states showing key information
- **Edit States**: Expanded forms for data modification

## 🔄 Attorney Integration

### Supervision Workflow
```php
// Attorney edit capabilities
Route::post('/property/step{n}/edit')     // Attorney edit endpoints
Route::post('/property/step{n}/save')     // Attorney save endpoints
```

### Permission Management
- **Edit Request System**: Client requests for modification permissions
- **Time-Limited Access**: Controlled editing windows
- **Audit Trail**: Change tracking and attribution
- **Review States**: Attorney approval workflows

### Data Override Capability
- **Questionnaire vs Attorney Data**: Separate data storage for client vs attorney modifications
- **Merge Logic**: Complex rules for data precedence
- **Conflict Resolution**: Handling contradictory information

## 📊 Integration Points

### Document Management
- **File Upload Integration**: Property documents and supporting materials
- **OCR Processing**: Automated data extraction from uploaded documents
- **Document Association**: Linking files to specific property items
- **AI Processing**: Automated property information extraction

### External APIs
- **CARMD Integration**: Vehicle information lookup
- **Address Validation**: Property address verification
- **Financial Institution APIs**: Bank account verification (potential)

### Reporting Systems
- **Progress Tracking**: Client completion metrics
- **Attorney Dashboard**: Client status overview
- **Compliance Reporting**: Regulatory requirement fulfillment

## 🚀 Recommended UX Improvements

### Immediate Enhancements
1. **Smart Defaults**: Pre-populate common property types and values
2. **Inline Help**: Contextual guidance without modal interruption
3. **Progress Estimation**: Time-to-completion indicators
4. **Auto-Save Indicators**: Clear visual feedback for save states
5. **Error Prevention**: Proactive validation with helpful messaging

### Strategic Improvements
1. **Wizard Redesign**: More intuitive step progression with overview
2. **Smart Forms**: Conditional logic to reduce cognitive load
3. **Value Estimation Tools**: Integrated property value lookup
4. **Mobile-First Redesign**: Touch-optimized interaction patterns
5. **Accessibility Compliance**: WCAG 2.1 AA compliance implementation

### Future Enhancements
1. **AI-Powered Assistance**: Intelligent form completion suggestions
2. **Voice Input**: Speech-to-text for property descriptions
3. **Photo Integration**: Visual property documentation
4. **Collaborative Editing**: Real-time attorney-client collaboration
5. **Predictive Validation**: Machine learning-powered error prevention

---

## 📚 Related Documentation

- [Test Implementation Summary](./test_implementation_summary.md) - Testing strategy and coverage
- [Test Coverage Plan](./test_coverage_plan.md) - Comprehensive testing approach
- [Master Branch Summary](./master_branch_summary_4_weeks.md) - Recent changes and updates

---

*This analysis serves as the foundation for UX prototype development and system improvement initiatives. The complex legal requirements must be balanced with user experience optimization to ensure both compliance and usability.* 

## Grok 4 Suggestion

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BK Assistant - Property Dashboard</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f9fa;
            color: #333;
            display: flex;
        }
        .sidebar {
            width: 250px;
            background-color: #fff;
            padding: 20px;
            border-right: 1px solid #e0e7ff;
            height: 100vh;
            position: fixed;
        }
        .sidebar h2 {
            font-size: 18px;
            color: #1e3a8a;
            margin-bottom: 20px;
        }
        .sidebar ul {
            list-style: none;
            padding: none;
            margin: 0;
        }
        .sidebar li {
            padding: 10px;
            cursor: pointer;
            border-radius: 4px;
            transition: background 0.3s;
            margin-bottom: 5px;
        }
        .sidebar li:hover {
            background: #e0e7ff;
        }
        .sidebar li.active {
            background: #c7d2fe;
            font-weight: bold;
        }
        .main-content {
            margin-left: 250px;
            padding: 40px;
            width: calc(100% - 250px);
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .header img {
            height: 40px;
        }
        .progress {
            font-size: 14px;
            color: #6b7280;
        }
        .section-title {
            font-size: 24px;
            color: #1e3a8a;
            margin-bottom: 20px;
        }
        .alert {
            background: #eff6ff;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            color: #1d4ed8;
            border: 1px solid #dbeafe;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            background: #fff;
        }
        .btn {
            background: #1e3a8a;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
            font-weight: 500;
        }
        .btn:hover {
            background: #172554;
        }
        .btn-secondary {
            background: #6b7280;
        }
        .btn-secondary:hover {
            background: #4b5563;
        }
        .property-card {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 15px;
        }
        .hidden {
            display: none;
        }
        .progress-bar {
            height: 6px;
            background: #e0e7ff;
            border-radius: 3px;
            margin-top: 10px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: #1e3a8a;
            transition: width 0.3s;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>Questionnaire</h2>
        <ul id="nav-list">
            <li data-step="1" class="active">Real Property</li>
            <li data-step="2">Vehicles</li>
            <li data-step="3">Personal/Household Items</li>
            <li data-step="4">Financial Assets (Part 1)</li>
            <li data-step="5">Financial Assets (Part 2)</li>
            <li data-step="6">Business Assets</li>
            <li data-step="7">Farm/Fishing Property</li>
        </ul>
    </div>
    <div class="main-content">
        <div class="header">
            <img src="https://via.placeholder.com/150x50?text=BK+Assistant" alt="BK Assistant Logo">
            <div class="progress" id="total-progress">Progress: 0%</div>
        </div>

        <!-- Step 1 -->
        <div id="step-1" class="step-content">
            <div class="section-title">Real Property</div>
            <div class="alert">
                List all residences, buildings, land, or other real estate you own. Include properties outside the US or not in your bankruptcy case.
            </div>
            <div class="form-group">
                <label>Do you own or rent your current residence?</label>
                <select id="residence-type" onchange="togglePropertyDetails()">
                    <option value="">Select...</option>
                    <option value="own">Own</option>
                    <option value="rent">Rent</option>
                </select>
            </div>
            <div id="property-details" class="hidden">
                <div class="form-group">
                    <label>Property Type</label>
                    <select>
                        <option value="">Select type...</option>
                        <option>Single Family Home</option>
                        <option>Duplex/Multi-unit</option>
                        <option>Condominium</option>
                        <option>Manufactured Home</option>
                        <option>Land</option>
                        <option>Investment Property</option>
                        <option>Timeshare</option>
                        <option>Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address">
                </div>
                <div class="form-group">
                    <label>Estimated Value</label>
                    <input type="number" placeholder="Enter value">
                </div>
            </div>
            <button class="btn" onclick="saveStep(1)">Save & Next</button>
        </div>

        <!-- Step 2 -->
        <div id="step-2" class="step-content hidden">
            <div class="section-title">Vehicles</div>
            <div class="alert">
                List all vehicles you own or possess (use for transportation), even if not on title. Include cars, trucks, motorcycles, RVs, etc.
            </div>
            <div class="form-group">
                <label>Do you have any vehicles?</label>
                <button class="btn" onclick="showVehicleForm()">Yes</button>
                <button class="btn btn-secondary" onclick="noItems('vehicles')">No</button>
            </div>
            <div id="vehicle-form" class="hidden">
                <div class="property-card">
                    <div class="form-group">
                        <label>Vehicle Type</label>
                        <select>
                            <option>Car</option>
                            <option>Truck</option>
                            <option>SUV</option>
                            <option>Motorcycle</option>
                            <option>RV</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>VIN Number</label>
                        <input type="text" placeholder="Enter VIN">
                        <button class="btn btn-small" onclick="alert('Mock auto import')">Auto Import</button>
                    </div>
                    <div class="form-group">
                        <label>Year, Make, Model</label>
                        <input type="text" placeholder="e.g. 2020 Toyota Camry">
                    </div>
                    <div class="form-group">
                        <label>Estimated Value</label>
                        <input type="number" placeholder="Enter value">
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="addNewCard('vehicle')">Add Another Vehicle</button>
            </div>
            <button class="btn" onclick="saveStep(2)">Save & Next</button>
        </div>

        <!-- Step 3 -->
        <div id="step-3" class="step-content hidden">
            <div class="section-title">Personal and Household Items</div>
            <div class="alert">
                List all household goods, furnishings, electronics, etc. Be thorough, even for low-value items.
            </div>
            <div class="form-group">
                <label>Do you have household items?</label>
                <button class="btn" onclick="showHouseholdForm()">Yes</button>
                <button class="btn btn-secondary" onclick="noItems('household')">No</button>
            </div>
            <div id="household-form" class="hidden">
                <div class="property-card">
                    <div class="form-group">
                        <label>Category</label>
                        <select>
                            <option>Furniture</option>
                            <option>Appliances</option>
                            <option>Electronics</option>
                            <option>Clothing</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" placeholder="e.g. Sofa, TV, etc.">
                    </div>
                    <div class="form-group">
                        <label>Estimated Value</label>
                        <input type="number" placeholder="Enter value">
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="addNewCard('household')">Add Another Item</button>
            </div>
            <button class="btn" onclick="saveStep(3)">Save & Next</button>
        </div>

        <!-- Step 4 -->
        <div id="step-4" class="step-content hidden">
            <div class="section-title">Financial Assets (Part 1)</div>
            <div class="alert">
                List bank accounts, investments, retirement accounts, etc.
            </div>
            <div class="form-group">
                <label>Do you have financial assets?</label>
                <button class="btn" onclick="showFinancialForm(1)">Yes</button>
                <button class="btn btn-secondary" onclick="noItems('financial1')">No</button>
            </div>
            <div id="financial1-form" class="hidden">
                <div class="property-card">
                    <div class="form-group">
                        <label>Asset Type</label>
                        <select>
                            <option>Checking Account</option>
                            <option>Savings Account</option>
                            <option>Investment Account</option>
                            <option>Retirement Account</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Institution Name</label>
                        <input type="text" placeholder="e.g. Bank of America">
                    </div>
                    <div class="form-group">
                        <label>Account Number (last 4 digits)</label>
                        <input type="text" placeholder="XXXX">
                    </div>
                    <div class="form-group">
                        <label>Balance</label>
                        <input type="number" placeholder="Enter balance">
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="addNewCard('financial1')">Add Another Asset</button>
            </div>
            <button class="btn" onclick="saveStep(4)">Save & Next</button>
        </div>

        <!-- Step 5 -->
        <div id="step-5" class="step-content hidden">
            <div class="section-title">Financial Assets (Part 2)</div>
            <div class="alert">
                List insurance policies, tax refunds, legal claims, etc.
            </div>
            <div class="form-group">
                <label>Do you have additional financial assets?</label>
                <button class="btn" onclick="showFinancialForm(2)">Yes</button>
                <button class="btn btn-secondary" onclick="noItems('financial2')">No</button>
            </div>
            <div id="financial2-form" class="hidden">
                <div class="property-card">
                    <div class="form-group">
                        <label>Asset Type</label>
                        <select>
                            <option>Life Insurance</option>
                            <option>Tax Refund</option>
                            <option>Legal Claim</option>
                            <option>Unpaid Wages</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" placeholder="Enter description">
                    </div>
                    <div class="form-group">
                        <label>Value</label>
                        <input type="number" placeholder="Enter value">
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="addNewCard('financial2')">Add Another Asset</button>
            </div>
            <button class="btn" onclick="saveStep(5)">Save & Next</button>
        </div>

        <!-- Step 6 -->
        <div id="step-6" class="step-content hidden">
            <div class="section-title">Business-Related Assets</div>
            <div class="alert">
                List business equipment, inventory, intellectual property, etc.
            </div>
            <div class="form-group">
                <label>Do you have business assets?</label>
                <button class="btn" onclick="showBusinessForm()">Yes</button>
                <button class="btn btn-secondary" onclick="noItems('business')">No</button>
            </div>
            <div id="business-form" class="hidden">
                <div class="property-card">
                    <div class="form-group">
                        <label>Asset Type</label>
                        <select>
                            <option>Equipment</option>
                            <option>Inventory</option>
                            <option>Intellectual Property</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" placeholder="Enter description">
                    </div>
                    <div class="form-group">
                        <label>Value</label>
                        <input type="number" placeholder="Enter value">
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="addNewCard('business')">Add Another Asset</button>
            </div>
            <button class="btn" onclick="saveStep(6)">Save & Next</button>
        </div>

        <!-- Step 7 -->
        <div id="step-7" class="step-content hidden">
            <div class="section-title">Farm and Commercial Fishing Property</div>
            <div class="alert">
                List farm equipment, livestock, crops, fishing boats, licenses, etc.
            </div>
            <div class="form-group">
                <label>Do you have farm or fishing assets?</label>
                <button class="btn" onclick="showFarmForm()">Yes</button>
                <button class="btn btn-secondary" onclick="noItems('farm')">No</button>
            </div>
            <div id="farm-form" class="hidden">
                <div class="property-card">
                    <div class="form-group">
                        <label>Asset Type</label>
                        <select>
                            <option>Farm Equipment</option>
                            <option>Livestock</option>
                            <option>Crops</option>
                            <option>Fishing Boat</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" placeholder="Enter description">
                    </div>
                    <div class="form-group">
                        <label>Value</label>
                        <input type="number" placeholder="Enter value">
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="addNewCard('farm')">Add Another Asset</button>
            </div>
            <button class="btn" onclick="saveStep(7)">Save & Complete</button>
        </div>
    </div>

    <script>
        // Mock progress
        const mockProgress = {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
        };

        // Navigation
        document.querySelectorAll('.sidebar li').forEach(li => {
            li.addEventListener('click', () => {
                document.querySelectorAll('.sidebar li').forEach(l => l.classList.remove('active'));
                li.classList.add('active');
                const step = li.dataset.step;
                document.querySelectorAll('.step-content').forEach(c => c.classList.add('hidden'));
                document.getElementById(`step-${step}`).classList.remove('hidden');
            });
        });

        // Toggle functions
        function togglePropertyDetails() {
            const select = document.getElementById('residence-type');
            document.getElementById('property-details').classList.toggle('hidden', select.value !== 'own');
        }

        function showVehicleForm() {
            document.getElementById('vehicle-form').classList.remove('hidden');
        }

        function showHouseholdForm() {
            document.getElementById('household-form').classList.remove('hidden');
        }

        function showFinancialForm(part) {
            document.getElementById(`financial${part}-form`).classList.remove('hidden');
        }

        function showBusinessForm() {
            document.getElementById('business-form').classList.remove('hidden');
        }

        function showFarmForm() {
            document.getElementById('farm-form').classList.remove('hidden');
        }

        function noItems(type) {
            alert(`No ${type} items added.`);
        }

        // Add new card (mock)
        function addNewCard(type) {
            const container = document.getElementById(`${type}-form`);
            const card = container.querySelector('.property-card').cloneNode(true);
            container.insertBefore(card, container.lastElementChild);
        }

        // Save step
        function saveStep(step) {
            mockProgress[step] = 100;
            updateOverallProgress();
            const nextStep = parseInt(step) + 1;
            if (nextStep <= 7) {
                document.querySelector(`[data-step="${nextStep}"]`).click();
            } else {
                alert('Questionnaire Completed!');
            }
        }

        // Update progress
        function updateOverallProgress() {
            const total = Object.values(mockProgress).reduce((a, b) => a + b, 0) / 7;
            document.getElementById('total-progress').innerText = `Progress: ${Math.floor(total)}%`;
        }

        updateOverallProgress();
    </script>
</body>
</html>
```
# 🚀 Cypress Test Automation Framework - Production Level

A comprehensive, production-ready Cypress test automation framework designed for enterprise-level testing with Page Object Model (POM) design pattern, custom commands, utilities, and advanced reporting capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Framework Architecture](#framework-architecture)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### 🏗️ Framework Architecture
- **Page Object Model (POM)** - Organized and maintainable test structure
- **Custom Commands** - Reusable Cypress commands for common operations
- **Utility Classes** - Helper functions for data generation and test operations
- **Data-Driven Testing** - External test data management with JSON fixtures
- **Environment Configuration** - Multi-environment support (dev, staging, prod)

### 📊 Reporting & Analytics
- **Mochawesome Reports** - Beautiful HTML reports with screenshots
- **Allure Reports** - Comprehensive test execution reports with trends
- **Screenshots on Failure** - Automatic screenshot capture for failed tests
- **Video Recording** - Complete test execution videos
- **Performance Monitoring** - Page load time tracking

### 🔧 Advanced Features
- **Cross-Browser Testing** - Chrome, Firefox, Edge support
- **Responsive Testing** - Multiple viewport configurations
- **API Testing Ready** - Integrated API testing capabilities
- **Retry Mechanism** - Automatic retry on flaky tests
- **Parallel Execution** - Run tests in parallel for faster execution
- **TypeScript Support** - Ready for TypeScript conversion

## 📁 Project Structure

```
# 🚀 Cypress Test Automation Framework

## 📋 Overview
A **production-level Cypress test automation framework** built for **SDET interview preparation** and real-world e-commerce testing. This framework demonstrates industry best practices, advanced design patterns, and comprehensive testing strategies.

## 🏆 Framework Highlights

### ✨ **Key Features**
- 🎯 **Page Object Model (POM)** - Scalable and maintainable test architecture
- 🛠️ **Custom Commands Library** - 25+ reusable Cypress commands
- 📊 **Comprehensive Reporting** - Mochawesome HTML reports with screenshots/videos
- 🔄 **Data-Driven Testing** - External JSON fixtures and dynamic data generation
- 🌐 **Cross-Browser Support** - Chrome, Firefox, Edge compatibility
- 📱 **Responsive Testing** - Mobile, tablet, desktop viewport testing
- ⚡ **CI/CD Ready** - Production-ready npm scripts and configuration

### 🎯 **Test Scenarios Covered**
- **E-commerce User Journey** - Complete product selection to cart workflow
- **First Featured Product Journey** - Robust, selector-independent testing
- **Home Page Validation** - Comprehensive UI element verification
- **Product Details Testing** - End-to-end product interaction flows

## 🏗️ Architecture

### 📁 **Project Structure**


CypressPractice01/
├── cypress/
│   ├── e2e/                           # Test files
│   │   ├── firstProductJourney.cy.js  # Main test suite (reliable)
│   │   ├── basicProductJourney.cy.js  # Basic test scenarios
│   │   ├── debugWinterTop.cy.js       # Debug and exploration tests
│   │   ├── simpleProductJourney.cy.js # Simple product tests
│   │   ├── workingWinterTop.cy.js     # Winter Top specific tests
│   │   └── productJourney.cy.js       # Advanced test scenarios
│   ├── fixtures/                      # Test data
│   │   └── example.json               # Sample test data
│   ├── pages/                         # Page Object Model
│   │   ├── BasePage.js                # Base page class
│   │   ├── HomePage.js                # Home page interactions
│   │   ├── ProductDetailsPage.js      # Product page logic
│   │   └── CartPage.js                # Shopping cart functionality
│   ├── support/                       # Support files
│   │   ├── commands.js                # Custom commands (25+)
│   │   └── e2e.js                     # Global configurations
│   ├── testdata/                      # External test data
│   │   ├── environmentConfig.json     # Environment configurations
│   │   ├── productTestData.json       # Product test data
│   │   └── userTestData.json          # User test data
│   └── utils/                         # Utility functions
│       ├── DataGenerator.js           # Test data generation
│       └── TestUtils.js               # Helper utilities
├── cypress.config.js                  # Main Cypress configuration
├── package.json                       # Dependencies and scripts
├── package-lock.json                  # Dependency lock file
├── .gitignore                         # Git ignore rules
└── README.md                          # Project documentation



### 🎨 **Design Patterns**
- **Page Object Model** - Encapsulated page interactions
- **Command Pattern** - Reusable custom commands
- **Data Builder Pattern** - Dynamic test data generation
- **Strategy Pattern** - Multiple selector strategies for robust testing

## 🚀 Quick Start

### 📋 **Prerequisites**
- Node.js >= 14.0.0
- npm >= 6.0.0

### ⚡ **Installation**
```bash
# Clone the repository
git clone https://github.com/[your-username]/CypressPractice01.git
cd CypressPractice01

# Install dependencies
npm install

# Verify Cypress installation
npx cypress verify
```

### 🎮 **Running Tests**

#### **Interactive Mode (Recommended for Development)**
```bash
# Open Cypress Test Runner UI
npm run cy:open
```

#### **Headless Mode (CI/CD)**
```bash
# Run all tests
npm run cy:run

# Run specific test file
npm run cy:run:spec cypress/e2e/firstProductJourney.cy.js

# Cross-browser testing
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
```

#### **Responsive Testing**
```bash
# Mobile viewport
npm run test:mobile

# Tablet viewport  
npm run test:tablet

# Desktop viewport
npm run test:desktop
```

#### **Environment-Specific Testing**
```bash
# Test different environments
npm run test:env:dev
npm run test:env:staging
npm run test:env:prod
```

### 📊 **Generating Reports**
```bash
# Run tests with reports
npm run test:with:reports

# Generate Mochawesome HTML reports
npm run report:mochawesome
```

## 🎯 Test Scenarios

### 🛒 **Main Test: First Featured Product Journey**
**File:** `cypress/e2e/firstProductJourney.cy.js`

**User Flow:**
1. Navigate to home page
2. Select first product from Featured Items
3. View product details
4. Set quantity to 2
5. Add product to cart
6. Verify cart contents

**Why This Test is Robust:**
- ✅ No dependency on specific product names
- ✅ Dynamic product selection
- ✅ Flexible DOM selectors
- ✅ Comprehensive error handling

### 🔍 **Debug Tests**
- **`debugWinterTop.cy.js`** - DOM structure exploration
- **`workingWinterTop.cy.js`** - Multiple selector strategies
- **`basicProductJourney.cy.js`** - Simplified test scenarios

## 🛠️ **Custom Commands Library**

### 🎯 **Navigation Commands**
- `cy.navigateToHome()` - Smart home page navigation
- `cy.navigateToProducts()` - Product catalog navigation
- `cy.navigateToCart()` - Shopping cart navigation

### 🛒 **E-commerce Commands**
- `cy.selectProduct(productName)` - Product selection
- `cy.addToCart(quantity)` - Add items to cart
- `cy.verifyCartContents()` - Cart validation

### 🔍 **Utility Commands**
- `cy.waitForPageLoad()` - Intelligent page load waiting
- `cy.handleCookieConsent()` - Cookie banner handling
- `cy.scrollToElement()` - Smart scrolling with viewport detection

### 📊 **Validation Commands**
- `cy.checkA11y()` - Accessibility validation
- `cy.measurePageLoad()` - Performance monitoring
- `cy.logEnvironmentInfo()` - Environment debugging

## 📈 **Advanced Features**

### 🔄 **Data-Driven Testing**
```javascript
// Dynamic test data generation
cy.getTestData('users.json').then((userData) => {
    // Use dynamic data in tests
});

// Runtime data generation
const testUser = DataGenerator.generateUser();
const testProduct = DataGenerator.generateProduct();
```

### 🎨 **Flexible Selectors**
```javascript
// Multiple selector strategies
cy.findElementByMultipleSelectors([
    '[data-testid="product-link"]',
    '.product-link',
    'a[href*="product"]'
]);
```

### 📱 **Responsive Testing**
```javascript
// Viewport-specific testing
cy.testResponsiveElement('.navigation', {
    mobile: { visible: false },
    tablet: { visible: true },
    desktop: { visible: true }
});
```

## 🎯 **SDET Interview Ready**

### 💼 **Interview Talking Points**

#### **Framework Architecture**
- "I built a scalable Page Object Model with inheritance patterns"
- "Implemented 25+ custom commands for reusability"
- "Used data-driven approach with external JSON fixtures"

#### **Technical Excellence**
- "Handled cross-browser compatibility and responsive testing"
- "Implemented robust error handling and retry mechanisms"
- "Created comprehensive reporting with screenshots and videos"

#### **Real-World Problem Solving**
- "Built flexible selectors to handle DOM changes"
- "Implemented intelligent waiting strategies"
- "Created debugging utilities for troubleshooting"

### 🎪 **Demo Script for Interviews**

1. **Show Framework Structure** (2 minutes)
   - Explain POM architecture
   - Highlight custom commands
   - Demonstrate configuration flexibility

2. **Run Live Test** (3 minutes)
   - Execute `firstProductJourney.cy.js` in Cypress UI
   - Explain test steps as they execute
   - Show real-time debugging capabilities

3. **Discuss Best Practices** (2 minutes)
   - Explain robust selector strategies
   - Discuss data-driven testing approach
   - Highlight error handling mechanisms

## 🔧 **Configuration**

### ⚙️ **Cypress Configuration**
- **Base URL:** https://automationexercise.com/
- **Viewport:** 1280x720 (configurable)
- **Timeouts:** 10s commands, 30s page loads
- **Retries:** 1 retry in run mode, 0 in open mode
- **Video/Screenshots:** Enabled for debugging

### 📊 **Reporting Configuration**
- **Mochawesome:** HTML reports with timestamps
- **Screenshots:** Captured on failures
- **Videos:** Full test execution recording
- **Console Logs:** Comprehensive debugging information

## 🤝 **Contributing**

### 🔄 **Development Workflow**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

### 📝 **Coding Standards**
- Use meaningful test descriptions
- Follow Page Object Model patterns
- Add comprehensive comments
- Include error handling
- Write reusable custom commands

## 📄 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 **Why This Framework Stands Out**

### 🏆 **Production-Ready Features**
- ✅ Industry-standard architecture patterns
- ✅ Comprehensive error handling
- ✅ Cross-browser and responsive testing
- ✅ CI/CD integration ready
- ✅ Extensive custom command library

### 💡 **SDET Interview Advantages**
- 🎯 Demonstrates advanced Cypress knowledge
- 🎯 Shows real-world problem-solving skills
- 🎯 Highlights best practices understanding
- 🎯 Proves ability to build scalable frameworks
- 🎯 Ready for live demonstration

### 🚀 **Perfect for Portfolio**
This framework showcases **professional-level test automation skills** and serves as an excellent **portfolio piece for SDET roles**. The comprehensive architecture, robust testing strategies, and production-ready features demonstrate expertise that employers value.

---

**Built with ❤️ for SDET Excellence**
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   └── productJourney.cy.js
│   ├── fixtures/               # Test data files
│   │   └── example.json
│   ├── pages/                  # Page Object Model classes
│   │   ├── BasePage.js
│   │   ├── HomePage.js
│   │   ├── ProductDetailsPage.js
│   │   └── CartPage.js
│   ├── support/                # Support files and commands
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── testdata/               # External test data
│   │   ├── productTestData.json
│   │   ├── userTestData.json
│   │   └── environmentConfig.json
│   ├── utils/                  # Utility classes
│   │   ├── DataGenerator.js
│   │   └── TestUtils.js
│   ├── reports/                # Generated reports
│   │   ├── mochawesome/
│   │   └── allure-results/
│   ├── screenshots/            # Test screenshots
│   ├── videos/                 # Test videos
│   └── downloads/              # Downloaded files
├── cypress.config.js           # Cypress configuration
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## 🔧 Prerequisites

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0
- **Git** (for version control)
- **Modern Browser** (Chrome, Firefox, or Edge)

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd CypressPractice01
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify Cypress installation:**
   ```bash
   npx cypress verify
   ```

4. **Setup verification:**
   ```bash
   npm run setup
   ```

## 🎯 Running Tests

### Basic Test Execution

```bash
# Open Cypress Test Runner (Interactive Mode)
npm run cy:open

# Run all tests headlessly
npm run cy:run

# Run tests in headed mode
npm run cy:run:headed
```

### Browser-Specific Testing

```bash
# Run tests in Chrome
npm run cy:run:chrome

# Run tests in Firefox
npm run cy:run:firefox

# Run tests in Edge
npm run cy:run:edge
```

### Test Categories

```bash
# Run smoke tests
npm run test:smoke

# Run E2E tests
npm run test:e2e

# Run regression tests
npm run test:regression

# Run API tests
npm run test:api
```

### Device/Viewport Testing

```bash
# Mobile testing
npm run test:mobile

# Tablet testing
npm run test:tablet

# Desktop testing
npm run test:desktop
```

### Environment-Specific Testing

```bash
# Development environment
npm run test:env:dev

# Staging environment
npm run test:env:staging

# Production environment
npm run test:env:prod
```

### Single Test Execution

```bash
# Run specific test file
npm run cy:run:spec cypress/e2e/productJourney.cy.js

# Run with specific browser
npx cypress run --spec "cypress/e2e/productJourney.cy.js" --browser chrome
```

## 📊 Test Reports

### Mochawesome Reports

```bash
# Generate Mochawesome report
npm run report:mochawesome

# View report in browser
open cypress/reports/mochawesome/merged-report.html
```

### Allure Reports

```bash
# Generate and open Allure report
npm run report:allure

# Generate Allure report only
npm run report:allure:generate

# Open existing Allure report
npm run report:allure:open
```

### Complete Test with Reports

```bash
# Run tests and generate all reports
npm run test:with:reports
```

### Clean Reports

```bash
# Clean all reports, screenshots, and videos (Unix/Mac)
npm run clean:reports

# Clean all reports, screenshots, and videos (Windows)
npm run clean:reports:win
```

## 🏗️ Framework Architecture

### Page Object Model (POM)

The framework follows the Page Object Model pattern for better maintainability:

```javascript
// Example: HomePage.js
class HomePage {
    constructor() {
        this.elements = {
            logo: () => cy.get('img[alt="Website for automation practice"]'),
            searchBox: () => cy.get('#search_product'),
            // ... other elements
        };
    }
    
    visit() {
        cy.visit('/');
        return this;
    }
    
    searchProduct(productName) {
        this.elements.searchBox().type(productName);
        return this;
    }
}
```

### Custom Commands

Reusable commands for common operations:

```javascript
// Custom command example
Cypress.Commands.add('loginUser', (email, password) => {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#login-button').click();
});

// Usage in tests
cy.loginUser('user@example.com', 'password123');
```

### Utility Classes

Helper functions for data generation and test operations:

```javascript
// DataGenerator usage
const userData = DataGenerator.generateUserData();
const productData = DataGenerator.generateProductData();

// TestUtils usage
TestUtils.waitForElement('.loading-spinner');
TestUtils.takeScreenshot('checkout-page');
```

## ✍️ Writing Tests

### Basic Test Structure

```javascript
import HomePage from '../pages/HomePage';
import ProductDetailsPage from '../pages/ProductDetailsPage';

describe('Product Tests', () => {
    let homePage;
    let productDetailsPage;
    
    beforeEach(() => {
        homePage = new HomePage();
        productDetailsPage = new ProductDetailsPage();
    });
    
    it('Should add product to cart', () => {
        homePage.visit()
                .clickViewProduct('Winter Top');
                
        productDetailsPage.setQuantity(2)
                          .clickAddToCart();
                          
        // Assertions
        cy.url().should('include', '/cart');
    });
});
```

### Data-Driven Testing

```javascript
// Using fixture data
beforeEach(() => {
    cy.fixture('productTestData').then((data) => {
        this.testData = data;
    });
});

it('Should test multiple products', function() {
    this.testData.products.forEach((product) => {
        // Test logic for each product
        homePage.searchProduct(product.name);
        // ... assertions
    });
});
```

### Adding Allure Annotations

```javascript
it('Should complete purchase flow', () => {
    cy.allure()
        .feature('E2E Shopping')
        .story('Product Purchase')
        .tag('smoke')
        .severity('critical')
        .description('Complete user journey from search to purchase');
        
    // Test steps...
});
```

## 🎯 Best Practices

### 1. Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Page Objects
- Keep page objects focused and cohesive
- Use method chaining for fluent API
- Return page objects from methods

### 3. Data Management
- Use fixtures for static test data
- Generate dynamic data using utilities
- Keep test data separate from test logic

### 4. Assertions
- Use explicit assertions
- Verify both positive and negative scenarios
- Include meaningful error messages

### 5. Maintenance
- Regularly update selectors
- Review and refactor page objects
- Keep dependencies up to date

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm install
        
      - name: Run Cypress tests
        run: npm run cy:run
        
      - name: Generate reports
        run: npm run report:mochawesome
        
      - name: Upload reports
        uses: actions/upload-artifact@v3
        with:
          name: cypress-reports
          path: cypress/reports/
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm run cy:run'
            }
        }
        
        stage('Generate Reports') {
            steps {
                sh 'npm run report:allure'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports/allure-report',
                reportFiles: 'index.html',
                reportName: 'Allure Report'
            ])
        }
    }
}
```

## 🛠️ Troubleshooting

### Common Issues

1. **Cypress Installation Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall Cypress
   npm uninstall cypress
   npm install cypress --save-dev
   ```

2. **Test Failures Due to Timing**
   ```javascript
   // Use explicit waits
   cy.get('[data-testid="element"]', { timeout: 10000 });
   
   // Wait for element to be visible
   cy.get('.loading').should('not.exist');
   ```

3. **Cross-Origin Issues**
   ```javascript
   // In cypress.config.js
   chromeWebSecurity: false
   ```

4. **Memory Issues**
   ```javascript
   // In cypress.config.js
   numTestsKeptInMemory: 0
   ```

### Debug Mode

```bash
# Run tests in debug mode
npm run test:debug

# Open DevTools
DEBUG=cypress:* npm run cy:open
```

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Page Object Model Best Practices](https://martinfowler.com/bliki/PageObject.html)
- [Allure Framework](https://docs.qameta.io/allure/)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For questions and support:
- Create an issue in the repository
- Contact the automation team
- Review the troubleshooting section

---

**Happy Testing! 🎉**

*Built with ❤️ for SDET Interview Preparation and Production-Level Test Automation*

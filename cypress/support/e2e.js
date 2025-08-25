// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Import file upload plugin
import 'cypress-file-upload';

// ***********************************************************
// GLOBAL CONFIGURATIONS
// ***********************************************************

// Hide XHR requests in command log to reduce noise
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
}

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test on uncaught exceptions
    // that are not related to our test
    if (err.message.includes('Script error') || 
        err.message.includes('Non-Error promise rejection captured') ||
        err.message.includes('ResizeObserver loop limit exceeded')) {
        return false;
    }
    
    // Log the error for debugging
    cy.log('Uncaught Exception:', err.message);
    return false;
});

// Handle window alerts
Cypress.on('window:alert', (text) => {
    cy.log('Alert appeared:', text);
});

Cypress.on('window:confirm', (text) => {
    cy.log('Confirm dialog appeared:', text);
    return true; // Always confirm
});

// ***********************************************************
// BEFORE/AFTER HOOKS
// ***********************************************************

beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Set viewport size consistently
    cy.viewport(1280, 720);
});

afterEach(() => {
    // Take screenshot on test failure
    if (Cypress.currentTest.state === 'failed') {
        const testName = Cypress.currentTest.title.replace(/\s+/g, '_');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        cy.screenshot(`FAILED_${testName}_${timestamp}`);
    }
});

// ***********************************************************
// CUSTOM CHAI ASSERTIONS
// ***********************************************************

chai.use((chai, utils) => {
    // Custom assertion for checking if element is in viewport
    chai.Assertion.addMethod('inViewport', function() {
        const obj = this._obj;
        
        this.assert(
            obj.isInViewport(),
            'expected #{this} to be in viewport',
            'expected #{this} not to be in viewport'
        );
    });
    
    // Custom assertion for checking element visibility percentage
    chai.Assertion.addMethod('visibilityPercentage', function(expectedPercentage) {
        const obj = this._obj;
        
        obj.then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            const viewportHeight = Cypress.config('viewportHeight');
            const viewportWidth = Cypress.config('viewportWidth');
            
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);
            
            const elementArea = rect.height * rect.width;
            const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
            
            const visibilityPercentage = (visibleArea / elementArea) * 100;
            
            this.assert(
                visibilityPercentage >= expectedPercentage,
                `expected element to be ${expectedPercentage}% visible, but was ${visibilityPercentage.toFixed(2)}%`,
                `expected element not to be ${expectedPercentage}% visible, but was ${visibilityPercentage.toFixed(2)}%`
            );
        });
    });
});

// ***********************************************************
// PERFORMANCE MONITORING
// ***********************************************************

// Monitor page load performance
Cypress.Commands.add('measurePageLoad', () => {
    cy.window().then((win) => {
        const perfData = win.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        cy.log(`Page Load Time: ${pageLoadTime}ms`);
        cy.log(`DOM Content Loaded: ${domContentLoadedTime}ms`);
        
        // Assert reasonable load times (adjust thresholds as needed)
        expect(pageLoadTime).to.be.lessThan(10000); // 10 seconds
        expect(domContentLoadedTime).to.be.lessThan(5000); // 5 seconds
    });
});

// ***********************************************************
// ACCESSIBILITY HELPERS
// ***********************************************************

// Check for basic accessibility issues
Cypress.Commands.add('checkA11y', () => {
    cy.get('body').within(() => {
        // Check for images without alt text
        cy.get('img:not([alt])').should('not.exist');
        
        // Check for form inputs without labels
        cy.get('input:not([aria-label]):not([aria-labelledby])').each(($input) => {
            const id = $input.attr('id');
            if (id) {
                cy.get(`label[for="${id}"]`).should('exist');
            }
        });
        
        // Check for proper heading hierarchy
        let lastHeadingLevel = 0;
        cy.get('h1, h2, h3, h4, h5, h6').each(($heading) => {
            const currentLevel = parseInt($heading[0].tagName.charAt(1));
            expect(currentLevel).to.be.at.most(lastHeadingLevel + 1);
            lastHeadingLevel = currentLevel;
        });
    });
});

// ***********************************************************
// DATA-DRIVEN TEST HELPERS
// ***********************************************************

// Load test data from fixtures
Cypress.Commands.add('getTestData', (fileName) => {
    return cy.fixture(fileName);
});

// Execute test with multiple data sets
Cypress.Commands.add('runDataDrivenTest', (dataFile, testFunction) => {
    cy.fixture(dataFile).then((testData) => {
        testData.forEach((data, index) => {
            context(`Data Set ${index + 1}`, () => {
                testFunction(data);
            });
        });
    });
});
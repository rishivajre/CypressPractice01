// ***********************************************
// Custom Commands for Cypress Test Automation Framework
// ***********************************************

import 'cypress-file-upload';

// Try to import Allure plugin with error handling
try {
  require('@shelex/cypress-allure-plugin');
} catch (error) {
  console.log('Allure plugin not available, continuing without it');
}

// ***********************************************
// PAGE NAVIGATION COMMANDS
// ***********************************************

/**
 * Navigate to home page and verify it loads
 */
Cypress.Commands.add('goToHomePage', () => {
    cy.visit('/');
    cy.url().should('include', 'automationexercise.com');
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    cy.get('.features_items h2.title').should('contain.text', 'Features Items');
});

/**
 * Navigate to products page
 */
Cypress.Commands.add('goToProductsPage', () => {
    cy.get('a[href="/products"]').contains('Products').click();
    cy.url().should('include', '/products');
});

/**
 * Navigate to cart page
 */
Cypress.Commands.add('goToCartPage', () => {
    cy.get('a[href="/view_cart"]').contains('Cart').click();
    cy.url().should('include', '/view_cart');
});

// ***********************************************
// PRODUCT INTERACTION COMMANDS
// ***********************************************

/**
 * Search for a product by name
 * @param {string} productName - Name of the product to search
 */
Cypress.Commands.add('searchProduct', (productName) => {
    cy.get('#search_product').clear().type(productName);
    cy.get('#submit_search').click();
    cy.log(`Searched for product: ${productName}`);
});

/**
 * Click on View Product for a specific product
 * @param {string} productName - Name of the product
 */
Cypress.Commands.add('clickViewProduct', (productName) => {
    cy.log(`Clicking View Product for: ${productName}`);
    
    // Find the product and scroll to it
    cy.contains('.productinfo p', productName).scrollIntoView();
    
    // Click on View Product button
    cy.contains('.productinfo p', productName)
        .closest('.productinfo')
        .find('a[href*="/product_details/"]')
        .contains('View Product')
        .should('be.visible')
        .click();
        
    // Verify we're on product details page
    cy.url().should('include', '/product_details/');
});

/**
 * Add product to cart with specified quantity
 * @param {number} quantity - Quantity to add (default: 1)
 */
Cypress.Commands.add('addToCartWithQuantity', (quantity = 1) => {
    // Set quantity
    cy.get('#quantity').clear().type(quantity.toString());
    
    // Click Add to Cart
    cy.get('button.btn.btn-default.cart').click();
    
    // Verify modal appears
    cy.get('#cartModal').should('be.visible');
    cy.get('#cartModal .modal-title').should('contain.text', 'Added!');
    
    cy.log(`Added product to cart with quantity: ${quantity}`);
});

/**
 * Click View Cart from the modal
 */
Cypress.Commands.add('clickViewCartFromModal', () => {
    cy.get('#cartModal .modal-body a[href="/view_cart"]')
        .should('be.visible')
        .should('contain.text', 'View Cart')
        .click();
        
    cy.url().should('include', '/view_cart');
    cy.log('Navigated to cart from modal');
});

// ***********************************************
// CART VERIFICATION COMMANDS
// ***********************************************

/**
 * Verify product is in cart with correct details
 * @param {Object} productDetails - Object containing name, quantity, price
 */
Cypress.Commands.add('verifyProductInCart', (productDetails) => {
    const { name, quantity, price } = productDetails;
    
    // Verify product name
    cy.get('#cart_info_table tbody tr')
        .contains('.cart_description', name)
        .should('be.visible');
    
    // Verify quantity if provided
    if (quantity) {
        cy.get('#cart_info_table tbody tr')
            .contains('.cart_description', name)
            .parent()
            .find('.cart_quantity button')
            .should('contain.text', quantity.toString());
    }
    
    // Verify price if provided
    if (price) {
        cy.get('#cart_info_table tbody tr')
            .contains('.cart_description', name)
            .parent()
            .find('.cart_price p')
            .should('contain.text', price);
    }
    
    cy.log(`Verified product in cart: ${name}`);
});

/**
 * Get cart item count
 */
Cypress.Commands.add('getCartItemCount', () => {
    return cy.get('#cart_info_table tbody tr').its('length');
});

// ***********************************************
// WAIT AND RETRY COMMANDS
// ***********************************************

/**
 * Wait for element to be visible with custom timeout
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in milliseconds
 */
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
    cy.get(selector, { timeout }).should('be.visible');
});

/**
 * Wait for page to load completely
 */
Cypress.Commands.add('waitForPageLoad', () => {
    cy.get('body').should('be.visible');
    
    // Wait for any loading spinners to disappear
    cy.get('body').then(($body) => {
        if ($body.find('.loading, .spinner').length > 0) {
            cy.get('.loading, .spinner').should('not.exist');
        }
    });
});

/**
 * Retry clicking an element if it fails
 * @param {string} selector - CSS selector
 * @param {number} maxRetries - Maximum number of retries
 */
Cypress.Commands.add('retryClick', (selector, maxRetries = 3) => {
    const clickElement = (retryCount) => {
        if (retryCount > maxRetries) {
            throw new Error(`Failed to click element ${selector} after ${maxRetries} retries`);
        }
        
        cy.get('body').then(($body) => {
            if ($body.find(selector).length > 0) {
                cy.get(selector).then(($el) => {
                    if ($el.is(':visible')) {
                        cy.wrap($el).click();
                    } else {
                        cy.wait(1000);
                        clickElement(retryCount + 1);
                    }
                });
            } else {
                cy.wait(1000);
                clickElement(retryCount + 1);
            }
        });
    };
    
    clickElement(0);
});

// ***********************************************
// UTILITY COMMANDS
// ***********************************************

/**
 * Generate random test data
 * @param {string} type - Type of data (email, name, phone, etc.)
 */
Cypress.Commands.add('generateTestData', (type) => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    
    switch (type) {
        case 'email':
            return `test${timestamp}@example.com`;
        case 'firstName':
            return `FirstName${random}`;
        case 'lastName':
            return `LastName${random}`;
        case 'phone':
            return `98765${String(random).padStart(5, '0')}`;
        case 'address':
            return `${random} Test Street`;
        case 'city':
            return `TestCity${random}`;
        case 'company':
            return `TestCompany${random}`;
        default:
            return `TestData${random}`;
    }
});

/**
 * Take screenshot with timestamp
 * @param {string} name - Base name for screenshot
 */
Cypress.Commands.add('takeTimestampedScreenshot', (name) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    cy.screenshot(`${name}_${timestamp}`);
});

/**
 * Log test step with formatting
 * @param {string} step - Step description
 */
Cypress.Commands.add('logStep', (step) => {
    cy.log(`🔹 STEP: ${step}`);
    try {
        cy.allure().step(step);
    } catch (error) {
        // Allure not available, continue without it
    }
});

/**
 * Verify element text contains expected value
 * @param {string} selector - CSS selector
 * @param {string} expectedText - Expected text content
 */
Cypress.Commands.add('verifyTextContains', (selector, expectedText) => {
    cy.get(selector)
        .should('be.visible')
        .should('contain.text', expectedText);
});

/**
 * Clear browser data (cookies, local storage)
 */
Cypress.Commands.add('clearBrowserData', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });
    cy.log('Browser data cleared');
});

/**
 * Handle cookie consent if present
 */
Cypress.Commands.add('handleCookieConsent', () => {
    cy.get('body').then(($body) => {
        if ($body.find('.cookie-consent, .cookie-banner').length > 0) {
            cy.get('.cookie-consent button, .cookie-banner button')
                .contains(/accept|agree|ok/i)
                .click();
        }
    });
});

/**
 * Scroll element into view with offset
 * @param {string} selector - CSS selector
 * @param {Object} options - Scroll options
 */
Cypress.Commands.add('scrollIntoViewWithOffset', (selector, options = {}) => {
    const defaultOptions = {
        offset: { top: -100, left: 0 },
        duration: 500
    };
    
    const scrollOptions = { ...defaultOptions, ...options };
    
    cy.get(selector).scrollIntoView(scrollOptions);
});

/**
 * Wait for network idle (no pending requests)
 * @param {number} timeout - Timeout in milliseconds
 */
Cypress.Commands.add('waitForNetworkIdle', (timeout = 5000) => {
    let pendingRequests = 0;
    
    cy.intercept('**', (req) => {
        pendingRequests++;
        req.reply((res) => {
            pendingRequests--;
            res.send();
        });
    });
    
    cy.waitUntil(() => pendingRequests === 0, {
        timeout,
        interval: 100,
        errorMsg: 'Network did not become idle within timeout'
    });
});

// ***********************************************
// ASSERTION COMMANDS
// ***********************************************

/**
 * Assert page URL matches expected pattern
 * @param {string} expectedUrl - Expected URL pattern
 */
Cypress.Commands.add('assertUrl', (expectedUrl) => {
    cy.url().should('include', expectedUrl);
    cy.log(`✅ URL assertion passed: ${expectedUrl}`);
});

/**
 * Assert page title matches expected value
 * @param {string} expectedTitle - Expected page title
 */
Cypress.Commands.add('assertPageTitle', (expectedTitle) => {
    cy.title().should('contain', expectedTitle);
    cy.log(`✅ Page title assertion passed: ${expectedTitle}`);
});

/**
 * Assert element count matches expected value
 * @param {string} selector - CSS selector
 * @param {number} expectedCount - Expected element count
 */
Cypress.Commands.add('assertElementCount', (selector, expectedCount) => {
    cy.get(selector).should('have.length', expectedCount);
    cy.log(`✅ Element count assertion passed: ${expectedCount}`);
});

// ***********************************************
// OVERRIDE EXISTING COMMANDS
// ***********************************************

/**
 * Override visit command to add automatic waiting
 */
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    originalFn(url, options);
    cy.waitForPageLoad();
    cy.handleCookieConsent();
});

/**
 * Override click command to add automatic waiting and retry logic
 */
Cypress.Commands.overwrite('click', (originalFn, subject, options) => {
    const defaultOptions = {
        timeout: 10000,
        retry: 3
    };
    
    const clickOptions = { ...defaultOptions, ...options };
    
    return cy.wrap(subject)
        .should('be.visible')
        .then(($el) => {
            // Only check 'enabled' for form elements that can be disabled
            const tagName = $el[0].tagName.toLowerCase();
            if (['button', 'input', 'select', 'textarea'].includes(tagName)) {
                cy.wrap($el).should('be.enabled');
            }
            return originalFn($el, clickOptions);
        });
});
/**
 * Test Utilities
 * Contains helper methods for test execution and common operations
 */

class TestUtils {
    /**
     * Wait for element with custom timeout and retry logic
     * @param {string} selector - CSS selector
     * @param {Object} options - Options object
     */
    static waitForElement(selector, options = {}) {
        const defaultOptions = {
            timeout: 10000,
            retries: 3,
            visible: true,
            enabled: true
        };
        
        const config = { ...defaultOptions, ...options };
        
        return cy.get(selector, { timeout: config.timeout })
            .should(config.visible ? 'be.visible' : 'exist')
            .should(config.enabled ? 'be.enabled' : 'exist');
    }

    /**
     * Safe click with retry mechanism
     * @param {string} selector - CSS selector
     * @param {Object} options - Click options
     */
    static safeClick(selector, options = {}) {
        const defaultOptions = {
            timeout: 10000,
            retries: 3,
            force: false
        };
        
        const config = { ...defaultOptions, ...options };
        
        for (let i = 0; i < config.retries; i++) {
            try {
                cy.get(selector, { timeout: config.timeout })
                    .should('be.visible')
                    .should('be.enabled')
                    .click({ force: config.force });
                break;
            } catch (error) {
                if (i === config.retries - 1) {
                    throw error;
                }
                cy.wait(1000);
            }
        }
    }

    /**
     * Type text with clear and validation
     * @param {string} selector - CSS selector
     * @param {string} text - Text to type
     * @param {Object} options - Type options
     */
    static safeType(selector, text, options = {}) {
        const defaultOptions = {
            clear: true,
            delay: 50,
            validate: true
        };
        
        const config = { ...defaultOptions, ...options };
        
        const element = cy.get(selector).should('be.visible');
        
        if (config.clear) {
            element.clear();
        }
        
        element.type(text, { delay: config.delay });
        
        if (config.validate) {
            element.should('have.value', text);
        }
        
        return element;
    }

    /**
     * Select dropdown option by text or value
     * @param {string} selector - CSS selector for dropdown
     * @param {string} option - Option text or value to select
     * @param {string} method - Selection method ('text' or 'value')
     */
    static selectDropdownOption(selector, option, method = 'text') {
        const dropdown = cy.get(selector).should('be.visible');
        
        if (method === 'value') {
            dropdown.select(option);
        } else {
            dropdown.select(option);
        }
        
        // Validate selection
        dropdown.should('contain', option);
        
        return dropdown;
    }

    /**
     * Upload file to input element
     * @param {string} selector - CSS selector for file input
     * @param {string} fileName - Name of file in fixtures folder
     * @param {string} mimeType - MIME type of file
     */
    static uploadFile(selector, fileName, mimeType = 'image/png') {
        cy.get(selector)
            .should('exist')
            .attachFile({
                filePath: fileName,
                mimeType: mimeType
            });
    }

    /**
     * Scroll element into view with options
     * @param {string} selector - CSS selector
     * @param {Object} options - Scroll options
     */
    static scrollToElement(selector, options = {}) {
        const defaultOptions = {
            duration: 500,
            offset: { top: -100, left: 0 },
            easing: 'swing'
        };
        
        const config = { ...defaultOptions, ...options };
        
        cy.get(selector).scrollIntoView(config);
        cy.wait(500); // Wait for scroll to complete
    }

    /**
     * Take screenshot with custom naming
     * @param {string} testName - Name of the test
     * @param {string} step - Current step description
     */
    static takeScreenshot(testName, step) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotName = `${testName}_${step}_${timestamp}`.replace(/\s+/g, '_');
        cy.screenshot(screenshotName);
    }

    /**
     * Log test step with formatting
     * @param {string} stepDescription - Description of the test step
     * @param {string} level - Log level ('info', 'warn', 'error')
     */
    static logStep(stepDescription, level = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = {
            info: '🔹',
            warn: '⚠️',
            error: '❌',
            success: '✅'
        }[level] || '🔹';
        
        cy.log(`${prefix} [${timestamp}] ${stepDescription}`);
        
        // Add to Allure report if available
        if (cy.allure) {
            cy.allure().step(stepDescription);
        }
    }

    /**
     * Verify URL contains expected pattern
     * @param {string} expectedPattern - Expected URL pattern
     * @param {number} timeout - Timeout in milliseconds
     */
    static verifyUrl(expectedPattern, timeout = 10000) {
        cy.url({ timeout }).should('include', expectedPattern);
        this.logStep(`✅ URL verification passed: ${expectedPattern}`, 'success');
    }

    /**
     * Verify page title
     * @param {string} expectedTitle - Expected page title
     */
    static verifyPageTitle(expectedTitle) {
        cy.title().should('contain', expectedTitle);
        this.logStep(`✅ Page title verification passed: ${expectedTitle}`, 'success');
    }

    /**
     * Wait for API response
     * @param {string} url - API endpoint URL pattern
     * @param {string} method - HTTP method
     * @param {number} timeout - Timeout in milliseconds
     */
    static waitForApiResponse(url, method = 'GET', timeout = 10000) {
        cy.intercept(method, url).as('apiRequest');
        cy.wait('@apiRequest', { timeout });
        this.logStep(`✅ API response received: ${method} ${url}`, 'success');
    }

    /**
     * Check if element exists without failing test
     * @param {string} selector - CSS selector
     * @returns {boolean} True if element exists
     */
    static elementExists(selector) {
        return cy.get('body').then(($body) => {
            return $body.find(selector).length > 0;
        });
    }

    /**
     * Get element count
     * @param {string} selector - CSS selector
     * @returns {number} Number of elements found
     */
    static getElementCount(selector) {
        return cy.get(selector).its('length');
    }

    /**
     * Wait for element count to match expected value
     * @param {string} selector - CSS selector
     * @param {number} expectedCount - Expected element count
     * @param {number} timeout - Timeout in milliseconds
     */
    static waitForElementCount(selector, expectedCount, timeout = 10000) {
        cy.get(selector, { timeout }).should('have.length', expectedCount);
        this.logStep(`✅ Element count verification passed: ${expectedCount}`, 'success');
    }

    /**
     * Retry operation until condition is met
     * @param {Function} operation - Operation to retry
     * @param {Function} condition - Condition to check
     * @param {Object} options - Retry options
     */
    static retryUntil(operation, condition, options = {}) {
        const defaultOptions = {
            maxRetries: 5,
            delay: 1000,
            timeout: 30000
        };
        
        const config = { ...defaultOptions, ...options };
        
        const retry = (attempt) => {
            if (attempt > config.maxRetries) {
                throw new Error(`Operation failed after ${config.maxRetries} retries`);
            }
            
            operation();
            
            return cy.then(() => {
                return condition().then((result) => {
                    if (!result && attempt < config.maxRetries) {
                        cy.wait(config.delay);
                        return retry(attempt + 1);
                    }
                    return result;
                });
            });
        };
        
        return retry(1);
    }

    /**
     * Clear browser data (cookies, local storage, session storage)
     */
    static clearBrowserData() {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });
        this.logStep('🧹 Browser data cleared', 'info');
    }

    /**
     * Set browser viewport
     * @param {number} width - Viewport width
     * @param {number} height - Viewport height
     */
    static setViewport(width, height) {
        cy.viewport(width, height);
        this.logStep(`📱 Viewport set to ${width}x${height}`, 'info');
    }

    /**
     * Mock API response
     * @param {string} url - API endpoint URL pattern
     * @param {string} method - HTTP method
     * @param {Object} response - Mock response data
     * @param {number} statusCode - Response status code
     */
    static mockApiResponse(url, method, response, statusCode = 200) {
        cy.intercept(method, url, {
            statusCode: statusCode,
            body: response
        }).as(`mock_${method}_${url.replace(/\W/g, '_')}`);
        
        this.logStep(`🎭 API mocked: ${method} ${url}`, 'info');
    }

    /**
     * Generate random string
     * @param {number} length - String length
     * @param {string} charset - Character set to use
     * @returns {string} Random string
     */
    static generateRandomString(length = 10, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return result;
    }

    /**
     * Format currency value
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency symbol
     * @returns {string} Formatted currency string
     */
    static formatCurrency(amount, currency = 'Rs.') {
        return `${currency} ${amount.toLocaleString()}`;
    }

    /**
     * Parse currency string to number
     * @param {string} currencyString - Currency string to parse
     * @returns {number} Parsed number value
     */
    static parseCurrency(currencyString) {
        return parseFloat(currencyString.replace(/[^\d.-]/g, ''));
    }

    /**
     * Wait for page load to complete
     * @param {number} timeout - Timeout in milliseconds
     */
    static waitForPageLoad(timeout = 30000) {
        cy.window({ timeout }).should('have.property', 'document');
        cy.document().should('have.property', 'readyState', 'complete');
        
        // Wait for any loading indicators to disappear
        cy.get('body').then(($body) => {
            if ($body.find('.loading, .spinner, .loader').length > 0) {
                cy.get('.loading, .spinner, .loader', { timeout }).should('not.exist');
            }
        });
        
        this.logStep('⏳ Page load completed', 'info');
    }

    /**
     * Verify element text matches pattern
     * @param {string} selector - CSS selector
     * @param {RegExp|string} pattern - Pattern to match
     */
    static verifyTextPattern(selector, pattern) {
        if (pattern instanceof RegExp) {
            cy.get(selector).invoke('text').should('match', pattern);
        } else {
            cy.get(selector).should('contain.text', pattern);
        }
        
        this.logStep(`✅ Text pattern verification passed: ${pattern}`, 'success');
    }

    /**
     * Get current timestamp in specified format
     * @param {string} format - Timestamp format
     * @returns {string} Formatted timestamp
     */
    static getCurrentTimestamp(format = 'YYYY-MM-DD_HH-mm-ss') {
        const now = new Date();
        
        const formats = {
            'YYYY-MM-DD': now.toISOString().split('T')[0],
            'HH-mm-ss': now.toTimeString().split(' ')[0].replace(/:/g, '-'),
            'YYYY-MM-DD_HH-mm-ss': now.toISOString().replace(/[:.]/g, '-').slice(0, 19),
            'timestamp': now.getTime().toString()
        };
        
        return formats[format] || formats['YYYY-MM-DD_HH-mm-ss'];
    }
}

module.exports = TestUtils;

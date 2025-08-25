/**
 * Base Page Object Model
 * Contains common elements and methods shared across all pages
 */

class BasePage {
    constructor() {
        // Common elements across all pages
        this.elements = {
            // Header elements
            header: () => cy.get('#header'),
            logo: () => cy.get('img[alt="Website for automation practice"]'),
            navigationMenu: () => cy.get('.navbar-nav'),
            
            // Navigation links
            homeLink: () => cy.get('a[href="/"]').contains('Home'),
            productsLink: () => cy.get('a[href="/products"]').contains('Products'),
            cartLink: () => cy.get('a[href="/view_cart"]').contains('Cart'),
            signupLoginLink: () => cy.get('a[href="/login"]').contains('Signup / Login'),
            contactUsLink: () => cy.get('a[href="/contact_us"]').contains('Contact us'),
            testCasesLink: () => cy.get('a[href="/test_cases"]').contains('Test Cases'),
            apiTestingLink: () => cy.get('a[href="/api_list"]').contains('API Testing'),
            videoTutorialsLink: () => cy.get('a[href="/video_tutorials"]').contains('Video Tutorials'),
            
            // Footer elements
            footer: () => cy.get('#footer'),
            subscriptionHeading: () => cy.get('.subscription h2'),
            subscriptionEmail: () => cy.get('#susbscribe_email'),
            subscriptionButton: () => cy.get('#subscribe'),
            
            // Common buttons and alerts
            alertSuccess: () => cy.get('.alert-success'),
            alertError: () => cy.get('.alert-danger'),
            alertWarning: () => cy.get('.alert-warning'),
            alertInfo: () => cy.get('.alert-info'),
            
            // Loading and overlay elements
            loadingSpinner: () => cy.get('.loading, .spinner'),
            overlay: () => cy.get('.overlay, .modal-backdrop'),
            
            // Scroll elements
            scrollToTopButton: () => cy.get('#scrollUp'),
            
            // Advertisement (if any)
            advertisement: () => cy.get('.advertisement, .google-auto-placed')
        };
    }

    /**
     * Navigate to home page
     */
    goHome() {
        this.elements.homeLink().click();
        return this;
    }

    /**
     * Navigate to products page
     */
    goToProducts() {
        this.elements.productsLink().click();
        return this;
    }

    /**
     * Navigate to cart page
     */
    goToCart() {
        this.elements.cartLink().click();
        return this;
    }

    /**
     * Navigate to signup/login page
     */
    goToSignupLogin() {
        this.elements.signupLoginLink().click();
        return this;
    }

    /**
     * Navigate to contact us page
     */
    goToContactUs() {
        this.elements.contactUsLink().click();
        return this;
    }

    /**
     * Verify header is visible
     */
    verifyHeaderVisible() {
        this.elements.header().should('be.visible');
        this.elements.logo().should('be.visible');
        this.elements.navigationMenu().should('be.visible');
        return this;
    }

    /**
     * Verify footer is visible
     */
    verifyFooterVisible() {
        this.elements.footer().should('be.visible');
        return this;
    }

    /**
     * Verify page URL contains expected text
     * @param {string} expectedUrl - Expected URL pattern
     */
    verifyUrl(expectedUrl) {
        cy.url().should('include', expectedUrl);
        return this;
    }

    /**
     * Verify page title
     * @param {string} expectedTitle - Expected page title
     */
    verifyPageTitle(expectedTitle) {
        cy.title().should('contain', expectedTitle);
        return this;
    }

    /**
     * Wait for page to load
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    waitForPageLoad(timeout = 10000) {
        cy.get('body', { timeout }).should('be.visible');
        
        // Wait for any loading spinners to disappear
        cy.get('body').then(($body) => {
            if ($body.find('.loading, .spinner').length > 0) {
                cy.get('.loading, .spinner', { timeout }).should('not.exist');
            }
        });
        
        return this;
    }

    /**
     * Scroll to top of page
     */
    scrollToTop() {
        cy.scrollTo('top');
        return this;
    }

    /**
     * Scroll to bottom of page
     */
    scrollToBottom() {
        cy.scrollTo('bottom');
        return this;
    }

    /**
     * Scroll to specific element
     * @param {string} selector - CSS selector for element to scroll to
     */
    scrollToElement(selector) {
        cy.get(selector).scrollIntoView();
        return this;
    }

    /**
     * Handle alerts/popups
     * @param {string} action - Action to take ('accept' or 'dismiss')
     */
    handleAlert(action = 'accept') {
        if (action === 'accept') {
            cy.window().then((win) => {
                cy.stub(win, 'alert').as('windowAlert');
                cy.stub(win, 'confirm').returns(true);
            });
        } else {
            cy.window().then((win) => {
                cy.stub(win, 'confirm').returns(false);
            });
        }
        return this;
    }

    /**
     * Take screenshot with custom name
     * @param {string} screenshotName - Name for the screenshot
     */
    takeScreenshot(screenshotName) {
        cy.screenshot(screenshotName);
        return this;
    }

    /**
     * Wait for element to be visible
     * @param {string} selector - CSS selector for element
     * @param {number} timeout - Timeout in milliseconds
     */
    waitForElement(selector, timeout = 10000) {
        cy.get(selector, { timeout }).should('be.visible');
        return this;
    }

    /**
     * Wait for element to disappear
     * @param {string} selector - CSS selector for element
     * @param {number} timeout - Timeout in milliseconds
     */
    waitForElementToDisappear(selector, timeout = 10000) {
        cy.get(selector, { timeout }).should('not.exist');
        return this;
    }

    /**
     * Refresh the current page
     */
    refreshPage() {
        cy.reload();
        this.waitForPageLoad();
        return this;
    }

    /**
     * Go back in browser history
     */
    goBack() {
        cy.go('back');
        return this;
    }

    /**
     * Go forward in browser history
     */
    goForward() {
        cy.go('forward');
        return this;
    }

    /**
     * Check if element exists without failing test
     * @param {string} selector - CSS selector for element
     */
    elementExists(selector) {
        return cy.get('body').then(($body) => {
            return $body.find(selector).length > 0;
        });
    }

    /**
     * Subscribe to newsletter (if available on page)
     * @param {string} email - Email address for subscription
     */
    subscribeToNewsletter(email) {
        cy.get('body').then(($body) => {
            if ($body.find('#susbscribe_email').length > 0) {
                this.elements.subscriptionEmail().clear().type(email);
                this.elements.subscriptionButton().click();
                
                // Verify subscription success
                this.elements.alertSuccess()
                    .should('be.visible')
                    .should('contain.text', 'subscribed successfully');
            }
        });
        return this;
    }

    /**
     * Handle cookie consent (if present)
     */
    handleCookieConsent() {
        cy.get('body').then(($body) => {
            if ($body.find('.cookie-consent, .cookie-banner, #cookie-notice').length > 0) {
                cy.get('.cookie-consent button, .cookie-banner button, #cookie-notice button')
                    .contains(/accept|agree|ok/i)
                    .click();
            }
        });
        return this;
    }

    /**
     * Close any modals or popups that might be open
     */
    closeModals() {
        cy.get('body').then(($body) => {
            if ($body.find('.modal.show, .popup.show').length > 0) {
                cy.get('.modal .close, .popup .close, .modal [data-dismiss="modal"]')
                    .click({ multiple: true });
            }
        });
        return this;
    }

    /**
     * Verify no console errors on page
     */
    verifyNoConsoleErrors() {
        cy.window().then((win) => {
            // Check for JavaScript errors in console
            const consoleErrors = [];
            const originalError = win.console.error;
            
            win.console.error = (...args) => {
                consoleErrors.push(args);
                originalError.apply(win.console, args);
            };
            
            cy.wrap(consoleErrors).should('have.length', 0);
        });
        return this;
    }
}

module.exports = BasePage;

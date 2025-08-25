/**
 * E2E Test: Product Search and Add to Cart Journey
 * This test covers the complete user journey from home page to cart
 * 
 * Test Scenario:
 * 1. Navigate to home page
 * 2. Select Product by Title "Winter Top"
 * 3. Click on "View Product"
 * 4. Set product quantity = 2
 * 5. Click on Add to Cart button
 * 6. Click on "View Cart" link from modal
 */

import HomePage from '../pages/HomePage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import CartPage from '../pages/CartPage';
import BasePage from '../pages/BasePage';

describe('Product Search and Add to Cart Journey', () => {
    let homePage;
    let productDetailsPage;
    let cartPage;
    let basePage;
    let testData;

    before(() => {
        // Load test data
        cy.fixture('productTestData').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        // Initialize page objects
        homePage = new HomePage();
        productDetailsPage = new ProductDetailsPage();
        cartPage = new CartPage();
        basePage = new BasePage();

        // Clear browser data for clean test state
        cy.clearBrowserData();
        
        // Add Allure test information with error handling
        try {
            cy.allure()
                .feature('E2E Shopping')
                .story('Product Search and Add to Cart')
                .tag('smoke')
                .tag('e2e')
                .tag('shopping-cart')
                .severity('critical');
        } catch (error) {
            cy.log('Allure annotations not available');
        }
    });

    it('Should successfully complete the product purchase journey', () => {
        try {
            cy.allure().description('Complete user journey from home page to cart with Winter Top product');
        } catch (error) {
            cy.log('Allure description not available');
        }
        
        // Step 1: Navigate to home page
        cy.logStep('Step 1: Navigate to home page');
        homePage.visit();
        
        // Verify home page loaded successfully
        homePage.verifyPageLoaded();
        homePage.verifyPageTitle('Automation Exercise');
        
        // Step 2: Locate and select "Winter Top" product
        cy.logStep('Step 2: Locate and select Winter Top product');
        
        // Verify Winter Top product is displayed on home page
        homePage.verifyProductDisplayed('Winter Top');
        
        // Step 3: Click on "View Product" for Winter Top
        cy.logStep('Step 3: Click View Product for Winter Top');
        homePage.clickViewProduct('Winter Top');
        
        // Verify product details page loaded
        productDetailsPage.verifyPageLoaded();
        productDetailsPage.verifyProductName('Winter Top');
        
        // Step 4: Set product quantity to 2
        cy.logStep('Step 4: Set product quantity to 2');
        productDetailsPage.setQuantity(2);
        
        // Verify quantity was set correctly
        productDetailsPage.getQuantity().should('eq', '2');
        
        // Step 5: Click on Add to Cart button
        cy.logStep('Step 5: Add product to cart');
        productDetailsPage.clickAddToCart();
        
        // Verify cart modal appears with success message
        productDetailsPage.verifyCartModalAppears();
        
        // Step 6: Click on "View Cart" link from modal
        cy.logStep('Step 6: Navigate to cart from modal');
        productDetailsPage.clickViewCartFromModal();
        
        // Verify cart page loaded and contains correct product
        cartPage.verifyPageLoaded();
        cartPage.verifyBreadcrumb();
        
        // Verify product details in cart
        cartPage.verifyProductInCart('Winter Top');
        cartPage.verifyProductQuantity('Winter Top', 2);
        
        // Additional verifications
        cartPage.verifyCartTableHeaders();
        cartPage.getCartItemsCount().should('eq', 1);
        
        cy.logStep('✅ Test completed successfully - Winter Top added to cart with quantity 2');
    });

    it('Should verify product details and pricing in cart', () => {
        try {
            cy.allure()
                .description('Verify product details, pricing, and calculations in cart')
                .tag('cart-verification')
                .tag('pricing');
        } catch (error) {
            cy.log('Allure annotations not available');
        }
        
        // Navigate and add product to cart (reusing steps from previous test)
        cy.logStep('Setup: Add Winter Top to cart');
        
        homePage.visit();
        homePage.clickViewProduct('Winter Top');
        productDetailsPage.setQuantity(2);
        productDetailsPage.clickAddToCart();
        productDetailsPage.clickViewCartFromModal();
        
        // Verify detailed product information in cart
        cy.logStep('Verify product details in cart');
        
        cartPage.verifyProductInCart('Winter Top');
        cartPage.verifyProductQuantity('Winter Top', 2);
        
        // Get and verify product price
        cartPage.getProductPrice('Winter Top').then((price) => {
            cy.log(`Product price in cart: ${price}`);
            expect(price).to.include('Rs.');
        });
        
        // Get and verify total price
        cartPage.getProductTotal('Winter Top').then((total) => {
            cy.log(`Product total in cart: ${total}`);
            expect(total).to.include('Rs.');
        });
        
        // Verify calculated total matches displayed total
        cartPage.verifyCalculatedTotal('Winter Top');
        
        cy.logStep('✅ Product details and pricing verified successfully');
    });

    it('Should allow quantity modification and cart management', () => {
        try {
            cy.allure()
                .description('Test cart management functionalities including quantity verification')
                .tag('cart-management')
                .tag('functional');
        } catch (error) {
            cy.log('Allure annotations not available');
        }
        
        // Add product to cart
        cy.logStep('Setup: Add Winter Top to cart');
        
        homePage.visit();
        homePage.clickViewProduct('Winter Top');
        productDetailsPage.setQuantity(3); // Different quantity for this test
        productDetailsPage.clickAddToCart();
        productDetailsPage.clickViewCartFromModal();
        
        // Verify cart contents
        cy.logStep('Verify cart contents and functionality');
        
        cartPage.verifyProductInCart('Winter Top');
        cartPage.verifyProductQuantity('Winter Top', 3);
        
        // Test cart operations
        cartPage.getCartItemsCount().should('eq', 1);
        
        // Verify product details
        const expectedProductDetails = {
            name: 'Winter Top',
            quantity: 3
        };
        
        cartPage.verifyProductDetails(expectedProductDetails);
        
        cy.logStep('✅ Cart management verification completed');
    });

    it('Should handle different product quantities', () => {
        try {
            cy.allure()
                .description('Data-driven test with different product quantities')
                .tag('data-driven')
                .tag('parametrized');
        } catch (error) {
            cy.log('Allure annotations not available');
        }
        
        const quantities = [1, 2, 5, 10];
        
        quantities.forEach((quantity) => {
            cy.logStep(`Testing with quantity: ${quantity}`);
            
            // Clear cart and start fresh
            cy.clearBrowserData();
            
            homePage.visit();
            homePage.clickViewProduct('Winter Top');
            productDetailsPage.setQuantity(quantity);
            productDetailsPage.clickAddToCart();
            productDetailsPage.clickViewCartFromModal();
            
            // Verify quantity in cart
            cartPage.verifyProductQuantity('Winter Top', quantity);
            
            cy.logStep(`✅ Quantity ${quantity} verified successfully`);
        });
    });

    it('Should verify breadcrumb navigation', () => {
        try {
            cy.allure()
                .description('Test breadcrumb navigation functionality')
                .tag('navigation')
                .tag('ui');
        } catch (error) {
            cy.log('Allure annotations not available');
        }
        
        cy.logStep('Test breadcrumb navigation');
        
        // Navigate through the journey
        homePage.visit();
        homePage.clickViewProduct('Winter Top');
        
        // Verify breadcrumb on product details page
        productDetailsPage.verifyBreadcrumb();
        
        // Add to cart and navigate to cart
        productDetailsPage.setQuantity(1);
        productDetailsPage.clickAddToCart();
        productDetailsPage.clickViewCartFromModal();
        
        // Verify breadcrumb on cart page
        cartPage.verifyBreadcrumb();
        
        cy.logStep('✅ Breadcrumb navigation verified');
    });

    it('Should verify responsive design elements', () => {
        try {
            cy.allure()
                .description('Test responsive design on different viewport sizes')
                .tag('responsive')
                .tag('cross-browser');
        } catch (error) {
            cy.log('Allure annotations not available');
        }
        
        const viewports = [
            { width: 1920, height: 1080, name: 'Desktop Large' },
            { width: 1280, height: 720, name: 'Desktop Medium' },
            { width: 768, height: 1024, name: 'Tablet' },
            { width: 375, height: 667, name: 'Mobile' }
        ];
        
        viewports.forEach((viewport) => {
            cy.logStep(`Testing on ${viewport.name} (${viewport.width}x${viewport.height})`);
            
            cy.viewport(viewport.width, viewport.height);
            
            homePage.visit();
            homePage.verifyPageLoaded();
            
            // Verify key elements are visible on this viewport
            homePage.verifyProductDisplayed('Winter Top');
            
            cy.logStep(`✅ ${viewport.name} viewport verified`);
        });
    });

    afterEach(() => {
        // Take screenshot after each test
        cy.takeTimestampedScreenshot('product-journey');
        
        // Log test completion
        cy.log('🏁 Test completed');
    });

    after(() => {
        // Cleanup after all tests
        cy.clearBrowserData();
        cy.log('🧹 Test suite cleanup completed');
    });
});

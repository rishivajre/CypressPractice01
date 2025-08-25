/**
 * Basic Test: Winter Top Product Journey
 * This is a clean, minimal version without command overrides
 */

describe('Basic Product Journey Test', () => {
    
    beforeEach(() => {
        // Clear browser data for clean test state
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Should complete Winter Top product journey successfully', () => {
        // Step 1: Visit home page
        cy.visit('https://automationexercise.com/');
        
        // Wait for page to load
        cy.get('body').should('be.visible');
        
        // Verify home page loaded
        cy.get('img[alt="Website for automation practice"]', { timeout: 10000 }).should('be.visible');
        cy.get('.features_items h2.title').should('contain.text', 'Features Items');
        
        // Step 2: Look for Winter Top product and click View Product
        cy.contains('.productinfo p', 'Winter Top').should('be.visible');
        
        // Debug: Let's inspect the DOM structure around Winter Top
        cy.contains('Winter Top').then(($el) => {
            cy.log('Found Winter Top element:', $el.parent().html());
        });
        
        // Try multiple approaches to find the View Product button
        cy.get('body').then(($body) => {
            // Approach 1: Direct search for View Product near Winter Top
            if ($body.find('a:contains("View Product")').length > 0) {
                cy.contains('Winter Top')
                    .closest('.product-image-wrapper, .single-products, .col-sm-4')
                    .find('a')
                    .contains('View Product')
                    .click();
            } else {
                // Approach 2: Search for any link with product details
                cy.contains('Winter Top')
                    .closest('.product-image-wrapper, .single-products, .col-sm-4')
                    .find('a[href*="product"]')
                    .first()
                    .click();
            }
        });
        
        // Verify product details page
        cy.url().should('include', '/product_details/');
        cy.get('.product-information h2').should('be.visible');
        
        // Step 4: Set quantity to 2
        cy.get('#quantity').clear().type('2');
        cy.get('#quantity').should('have.value', '2');
        
        // Step 5: Add to cart
        cy.get('button.btn.btn-default.cart').click();
        
        // Verify modal appears
        cy.get('#cartModal', { timeout: 10000 }).should('be.visible');
        cy.get('#cartModal .modal-title').should('contain.text', 'Added!');
        
        // Step 6: Click View Cart
        cy.get('#cartModal .modal-body a[href="/view_cart"]').click();
        
        // Verify cart page
        cy.url().should('include', '/view_cart');
        
        // Verify product in cart
        cy.get('#cart_info_table tbody tr')
            .contains('.cart_description', 'Winter Top')
            .should('be.visible');
            
        // Verify quantity in cart
        cy.get('#cart_info_table tbody tr')
            .contains('.cart_description', 'Winter Top')
            .parent()
            .find('.cart_quantity button')
            .should('contain.text', '2');
            
        cy.log('✅ Test completed successfully - Winter Top added to cart with quantity 2');
    });

    it('Should verify home page basic elements', () => {
        cy.visit('https://automationexercise.com/');
        
        // Wait for page load
        cy.get('body').should('be.visible');
        
        // Verify key elements are present
        cy.get('img[alt="Website for automation practice"]', { timeout: 10000 }).should('be.visible');
        cy.get('.navbar-nav').should('be.visible');
        cy.get('.features_items').should('be.visible');
        cy.get('#footer').should('be.visible');
        
        // Verify navigation links
        cy.get('a[href="/"]').contains('Home').should('be.visible');
        cy.get('a[href="/products"]').contains('Products').should('be.visible');
        cy.get('a[href="/view_cart"]').contains('Cart').should('be.visible');
        
        cy.log('✅ Home page elements verified successfully');
    });

});

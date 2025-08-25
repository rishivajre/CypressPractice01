/**
 * Working Test: Winter Top Product Journey
 * Using robust selectors that work with most e-commerce sites
 */

describe('Winter Top Working Test', () => {
    
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Should complete Winter Top journey with robust selectors', () => {
        // Step 1: Visit home page
        cy.visit('https://automationexercise.com/');
        cy.get('body').should('be.visible');
        
        // Verify home page
        cy.get('.features_items').should('be.visible');
        
        // Step 2: Find Winter Top product
        cy.contains('Winter Top').should('be.visible');
        
        // Step 3: Click on Winter Top product (try multiple strategies)
        // Strategy 1: Look for image link
        cy.get('body').then(($body) => {
            const winterTopText = $body.find(':contains("Winter Top")');
            if (winterTopText.length > 0) {
                // Find the product container
                cy.contains('Winter Top')
                    .parents('.col-sm-4, .product-item, .single-products')
                    .first()
                    .within(() => {
                        // Try to find image link first, then any link
                        cy.get('a').first().click();
                    });
            }
        });
        
        // Wait for product page to load
        cy.url().should('include', 'product');
        
        // Step 4: Set quantity to 2 (if quantity field exists)
        cy.get('body').then(($body) => {
            if ($body.find('#quantity').length > 0) {
                cy.get('#quantity').clear().type('2');
                cy.get('#quantity').should('have.value', '2');
            } else if ($body.find('input[name="quantity"]').length > 0) {
                cy.get('input[name="quantity"]').clear().type('2');
            }
        });
        
        // Step 5: Add to cart
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Add to cart")').length > 0) {
                cy.contains('button', 'Add to cart').click();
            } else if ($body.find('.btn:contains("Add")').length > 0) {
                cy.contains('.btn', 'Add').click();
            } else {
                cy.get('button').contains(/add/i).click();
            }
        });
        
        // Step 6: Handle modal or navigate to cart
        cy.wait(2000); // Wait for modal or redirect
        
        cy.get('body').then(($body) => {
            if ($body.find('#cartModal').length > 0) {
                // Modal exists
                cy.get('#cartModal').should('be.visible');
                cy.get('#cartModal').within(() => {
                    cy.contains('View Cart').click();
                });
            } else if ($body.find('a[href*="cart"]').length > 0) {
                // No modal, navigate to cart directly
                cy.contains('a', 'Cart').click();
            } else {
                // Navigate to cart via URL
                cy.visit('https://automationexercise.com/view_cart');
            }
        });
        
        // Step 7: Verify cart
        cy.url().should('include', 'cart');
        cy.contains('Winter Top').should('be.visible');
        
        cy.log('✅ Winter Top product journey completed successfully!');
    });

});

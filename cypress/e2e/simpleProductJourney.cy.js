/**
 * Simple Test: Basic Product Journey
 * This is a simplified version for quick testing
 */

describe('Simple Product Journey Test', () => {
    
    beforeEach(() => {
        // Clear browser data for clean test state
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Should navigate to home page and find Winter Top', () => {
        // Step 1: Visit home page
        cy.visit('https://automationexercise.com/');
        
        // Verify home page loaded
        cy.get('img[alt="Website for automation practice"]').should('be.visible');
        cy.get('.features_items h2.title').should('contain.text', 'Features Items');
        
        // Step 2: Look for Winter Top product
        cy.contains('.productinfo p', 'Winter Top').should('be.visible');
        
        // Step 3: Click View Product for Winter Top
        cy.contains('.productinfo p', 'Winter Top')
            .closest('.productinfo')
            .find('a[href*="/product_details/"]')
            .contains('View Product')
            .click();
        
        // Verify product details page
        cy.url().should('include', '/product_details/');
        cy.get('.product-information h2').should('be.visible');
        
        // Step 4: Set quantity to 2
        cy.get('#quantity').clear().type('2');
        cy.get('#quantity').should('have.value', '2');
        
        // Step 5: Add to cart
        cy.get('button.btn.btn-default.cart').click();
        
        // Verify modal appears
        cy.get('#cartModal').should('be.visible');
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

    it('Should verify home page elements', () => {
        cy.visit('https://automationexercise.com/');
        
        // Verify key elements are present
        cy.get('img[alt="Website for automation practice"]').should('be.visible');
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

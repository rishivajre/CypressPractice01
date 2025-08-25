/**
 * Simple Test: First Featured Product Journey
 * This test selects the first product from Featured Items section
 */

describe('First Featured Product Journey', () => {
    
    beforeEach(() => {
        // Clear browser data for clean test state
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Should complete journey with first featured product', () => {
        // Step 1: Visit home page
        cy.visit('https://automationexercise.com/');
        
        // Wait for page to load
        cy.get('body').should('be.visible');
        
        // Verify home page loaded
        cy.get('.features_items').should('be.visible');
        cy.get('.features_items h2.title').should('contain.text', 'Features Items');
        
        // Step 2: Get the first product from Featured Items
        cy.get('.features_items .single-products').first().within(() => {
            // Scroll the product into view
            cy.get('.productinfo').scrollIntoView();
            
            // Get the product name for logging
            cy.get('.productinfo p').first().then(($productName) => {
                const productName = $productName.text();
                cy.log(`Selected product: ${productName}`);
            });
            
            // Debug: Let's see what links are available
            cy.get('a').then(($links) => {
                $links.each((index, link) => {
                    cy.log(`Link ${index}: ${link.textContent.trim()}`);
                });
            });
            
            // Try multiple approaches to find the product link
            cy.get('body').then(() => {
                // Approach 1: Look for any link with "View" or "Product"
                cy.get('a').then(($links) => {
                    const viewProductLink = $links.filter((index, link) => {
                        const text = link.textContent.trim().toLowerCase();
                        return text.includes('view') || text.includes('product');
                    });
                    
                    if (viewProductLink.length > 0) {
                        cy.wrap(viewProductLink.first()).scrollIntoView().click();
                    } else {
                        // Approach 2: Click the first link in the product
                        cy.get('a').first().scrollIntoView().click();
                    }
                });
            });
        });
        
        // Step 3: Verify product details page
        cy.url().should('include', '/product_details/');
        cy.get('.product-information').should('be.visible');
        
        // Step 4: Set quantity to 2
        cy.get('#quantity').should('be.visible').clear().type('2');
        cy.get('#quantity').should('have.value', '2');
        
        // Step 5: Add to cart
        cy.get('button.btn.btn-default.cart').should('be.visible').click();
        
        // Step 6: Handle cart modal
        cy.get('#cartModal', { timeout: 10000 }).should('be.visible');
        cy.get('#cartModal .modal-title').should('contain.text', 'Added!');
        
        // Click View Cart from modal
        cy.get('#cartModal .modal-body a[href="/view_cart"]').click();
        
        // Step 7: Verify cart page
        cy.url().should('include', '/view_cart');
        cy.get('#cart_info_table').should('be.visible');
        
        // Verify product quantity in cart
        cy.get('#cart_info_table tbody tr').should('have.length.at.least', 1);
        cy.get('#cart_info_table .cart_quantity button').should('contain.text', '2');
        
        cy.log('✅ First featured product journey completed successfully!');
    });

    it('Should verify Featured Items section', () => {
        // Visit home page
        cy.visit('https://automationexercise.com/');
        
        // Wait for page to load
        cy.get('body').should('be.visible');
        
        // Verify Featured Items section
        cy.get('.features_items').should('be.visible');
        cy.get('.features_items h2.title').should('contain.text', 'Features Items');
        
        // Verify we have multiple products
        cy.get('.features_items .single-products').should('have.length.at.least', 3);
        
        // Verify each product has required elements
        cy.get('.features_items .single-products').each(($product) => {
            cy.wrap($product).within(() => {
                cy.get('.productinfo p').should('be.visible'); // Product name
                cy.get('.productinfo h2').should('be.visible'); // Product price
                
                // Check for any clickable link (more flexible)
                cy.get('a').should('have.length.at.least', 1); // At least one link
            });
        });
        
        cy.log('✅ Featured Items section verified successfully!');
    });

    it('Should verify first product details', () => {
        // Visit home page
        cy.visit('https://automationexercise.com/');
        
        // Go to first product
        cy.get('.features_items .single-products').first().within(() => {
            // Scroll into view and click the first available link
            cy.get('a').first().scrollIntoView().click();
        });
        
        // Verify product details page elements
        cy.url().should('include', '/product_details/');
        cy.get('.product-information h2').should('be.visible'); // Product name
        cy.get('.product-information p').should('contain.text', 'Category:'); // Category
        cy.get('.product-information span span').should('be.visible'); // Price
        cy.get('#quantity').should('be.visible'); // Quantity field
        cy.get('button.btn.btn-default.cart').should('be.visible'); // Add to cart button
        
        cy.log('✅ Product details page verified successfully!');
    });

});

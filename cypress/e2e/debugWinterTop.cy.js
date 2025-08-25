/**
 * Debug Test: Winter Top Product Exploration
 * This test helps us understand the DOM structure
 */

describe('Winter Top Debug Test', () => {
    
    it('Should explore Winter Top product structure', () => {
        // Visit home page
        cy.visit('https://automationexercise.com/');
        
        // Wait for page to load
        cy.get('body').should('be.visible');
        
        // Find all products on the page
        cy.get('.features_items').should('be.visible');
        
        // Look for Winter Top specifically
        cy.contains('Winter Top').should('be.visible');
        
        // Debug: Print the structure around Winter Top
        cy.contains('Winter Top').then(($el) => {
            console.log('Winter Top element:', $el[0]);
            console.log('Parent HTML:', $el.parent()[0].outerHTML);
            console.log('Grandparent HTML:', $el.parent().parent()[0].outerHTML);
        });
        
        // Try to find any clickable elements near Winter Top
        cy.contains('Winter Top')
            .closest('div')
            .find('a')
            .should('have.length.at.least', 1)
            .then(($links) => {
                console.log('Found links:', $links.length);
                $links.each((index, link) => {
                    console.log(`Link ${index}:`, link.href, link.textContent);
                });
            });
        
        // Simple approach - just find the first link in the product container
        cy.contains('Winter Top')
            .closest('div')
            .find('a')
            .first()
            .click();
        
        // Verify we navigated somewhere
        cy.url().should('not.equal', 'https://automationexercise.com/');
        
        cy.log('✅ Successfully clicked on Winter Top product link');
    });

});

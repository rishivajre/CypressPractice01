/**
 * Home Page Object Model
 * Contains all elements and methods for the Home Page
 */

class HomePage {
    constructor() {
        // Page Elements
        this.elements = {
            // Header elements
            logo: () => cy.get('img[alt="Website for automation practice"]'),
            homeLink: () => cy.get('a[href="/"]').contains('Home'),
            productsLink: () => cy.get('a[href="/products"]').contains('Products'),
            cartLink: () => cy.get('a[href="/view_cart"]').contains('Cart'),
            
            // Product search and filters
            searchBox: () => cy.get('#search_product'),
            searchButton: () => cy.get('#submit_search'),
            
            // Featured items section
            featuredItemsHeading: () => cy.get('.features_items h2.title'),
            productsList: () => cy.get('.features_items .col-sm-4'),
            
            // Individual product elements
            productTitle: (productName) => cy.contains('.productinfo p', productName),
            productPrice: (productName) => cy.contains('.productinfo p', productName).siblings('h2'),
            viewProductButton: (productName) => cy.contains('.productinfo p', productName)
                .closest('.productinfo')
                .find('a[href*="/product_details/"]').contains('View Product'),
            addToCartButton: (productName) => cy.contains('.productinfo p', productName)
                .closest('.productinfo')
                .find('a.btn-default.add-to-cart'),
                
            // Footer elements
            footer: () => cy.get('#footer'),
            subscriptionHeading: () => cy.get('.subscription h2'),
            subscriptionEmail: () => cy.get('#susbscribe_email'),
            subscriptionButton: () => cy.get('#subscribe')
        };
    }

    /**
     * Navigate to Home Page
     */
    visit() {
        cy.visit('/');
        this.verifyPageLoaded();
        return this;
    }

    /**
     * Verify Home Page is loaded
     */
    verifyPageLoaded() {
        this.elements.logo().should('be.visible');
        this.elements.featuredItemsHeading().should('contain.text', 'Features Items');
        cy.url().should('include', 'automationexercise.com');
        return this;
    }

    /**
     * Search for a product
     * @param {string} productName - Name of the product to search
     */
    searchProduct(productName) {
        this.elements.searchBox().clear().type(productName);
        this.elements.searchButton().click();
        return this;
    }

    /**
     * Get product by title/name
     * @param {string} productName - Name of the product
     */
    getProductByName(productName) {
        return this.elements.productTitle(productName);
    }

    /**
     * Click on View Product for a specific product
     * @param {string} productName - Name of the product
     */
    clickViewProduct(productName) {
        cy.log(`Clicking View Product for: ${productName}`);
        
        // Scroll to the product first
        this.elements.productTitle(productName).scrollIntoView();
        
        // Wait for the element to be visible and clickable
        this.elements.viewProductButton(productName)
            .should('be.visible')
            .should('contain.text', 'View Product')
            .click();
            
        return this;
    }

    /**
     * Add product to cart from home page
     * @param {string} productName - Name of the product
     */
    addProductToCart(productName) {
        cy.log(`Adding product to cart: ${productName}`);
        
        this.elements.productTitle(productName).scrollIntoView();
        this.elements.addToCartButton(productName)
            .should('be.visible')
            .click();
            
        return this;
    }

    /**
     * Verify product is displayed
     * @param {string} productName - Name of the product to verify
     */
    verifyProductDisplayed(productName) {
        this.elements.productTitle(productName)
            .should('be.visible')
            .should('contain.text', productName);
        return this;
    }

    /**
     * Get product price
     * @param {string} productName - Name of the product
     */
    getProductPrice(productName) {
        return this.elements.productPrice(productName);
    }

    /**
     * Navigate to Products page
     */
    goToProducts() {
        this.elements.productsLink().click();
        return this;
    }

    /**
     * Navigate to Cart page
     */
    goToCart() {
        this.elements.cartLink().click();
        return this;
    }

    /**
     * Get all products on the page
     */
    getAllProducts() {
        return this.elements.productsList();
    }

    /**
     * Verify page title
     */
    verifyPageTitle(expectedTitle) {
        cy.title().should('contain', expectedTitle);
        return this;
    }
}

module.exports = HomePage;

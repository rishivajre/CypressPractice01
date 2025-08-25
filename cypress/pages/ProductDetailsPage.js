/**
 * Product Details Page Object Model
 * Contains all elements and methods for the Product Details Page
 */

class ProductDetailsPage {
    constructor() {
        // Page Elements
        this.elements = {
            // Product information
            productName: () => cy.get('.product-information h2'),
            productCategory: () => cy.get('.product-information p').contains('Category:'),
            productPrice: () => cy.get('.product-information span span'),
            productAvailability: () => cy.get('.product-information p').contains('Availability:'),
            productCondition: () => cy.get('.product-information p').contains('Condition:'),
            productBrand: () => cy.get('.product-information p').contains('Brand:'),
            
            // Product images
            productMainImage: () => cy.get('.product-details .view-product img'),
            productThumbnails: () => cy.get('#similar-product .product-image-wrapper'),
            
            // Product actions
            quantityInput: () => cy.get('#quantity'),
            addToCartButton: () => cy.get('button.btn.btn-default.cart'),
            
            // Cart modal/popup
            cartModal: () => cy.get('#cartModal'),
            cartModalTitle: () => cy.get('#cartModal .modal-title'),
            cartModalMessage: () => cy.get('#cartModal .modal-body p'),
            viewCartButton: () => cy.get('#cartModal .modal-body a[href="/view_cart"]'),
            continueShoppingButton: () => cy.get('#cartModal .modal-body button.btn-success'),
            
            // Breadcrumb
            breadcrumb: () => cy.get('.breadcrumb'),
            breadcrumbHome: () => cy.get('.breadcrumb li a[href="/"]'),
            breadcrumbProducts: () => cy.get('.breadcrumb li a[href="/products"]'),
            
            // Related products
            recommendedProducts: () => cy.get('#recommended-item-carousel'),
            similarProducts: () => cy.get('.recommended_items'),
            
            // Review section
            writeReviewHeading: () => cy.get('a[href="#reviews"]'),
            reviewerName: () => cy.get('#name'),
            reviewerEmail: () => cy.get('#email'),
            reviewText: () => cy.get('#review'),
            submitReviewButton: () => cy.get('#button-review'),
            
            // Success/Error messages
            alertSuccess: () => cy.get('.alert-success'),
            alertError: () => cy.get('.alert-danger')
        };
    }

    /**
     * Verify Product Details Page is loaded
     */
    verifyPageLoaded() {
        this.elements.productName().should('be.visible');
        this.elements.quantityInput().should('be.visible');
        this.elements.addToCartButton().should('be.visible');
        cy.url().should('include', '/product_details/');
        return this;
    }

    /**
     * Verify product name matches expected
     * @param {string} expectedName - Expected product name
     */
    verifyProductName(expectedName) {
        this.elements.productName()
            .should('be.visible')
            .should('contain.text', expectedName);
        return this;
    }

    /**
     * Get product name
     */
    getProductName() {
        return this.elements.productName().invoke('text');
    }

    /**
     * Get product price
     */
    getProductPrice() {
        return this.elements.productPrice().invoke('text');
    }

    /**
     * Set product quantity
     * @param {number} quantity - Quantity to set
     */
    setQuantity(quantity) {
        cy.log(`Setting product quantity to: ${quantity}`);
        
        this.elements.quantityInput()
            .should('be.visible')
            .clear()
            .type(quantity.toString())
            .should('have.value', quantity.toString());
            
        return this;
    }

    /**
     * Get current quantity value
     */
    getQuantity() {
        return this.elements.quantityInput().invoke('val');
    }

    /**
     * Click Add to Cart button
     */
    clickAddToCart() {
        cy.log('Clicking Add to Cart button');
        
        this.elements.addToCartButton()
            .should('be.visible')
            .should('be.enabled')
            .click();
            
        return this;
    }

    /**
     * Verify cart modal appears
     */
    verifyCartModalAppears() {
        this.elements.cartModal()
            .should('be.visible');
            
        this.elements.cartModalTitle()
            .should('contain.text', 'Added!');
            
        this.elements.cartModalMessage()
            .should('contain.text', 'Your product has been added to cart');
            
        return this;
    }

    /**
     * Click View Cart from modal
     */
    clickViewCartFromModal() {
        cy.log('Clicking View Cart from modal');
        
        this.verifyCartModalAppears();
        
        this.elements.viewCartButton()
            .should('be.visible')
            .should('contain.text', 'View Cart')
            .click();
            
        return this;
    }

    /**
     * Click Continue Shopping from modal
     */
    clickContinueShoppingFromModal() {
        cy.log('Clicking Continue Shopping from modal');
        
        this.verifyCartModalAppears();
        
        this.elements.continueShoppingButton()
            .should('be.visible')
            .click();
            
        return this;
    }

    /**
     * Add product to cart with specific quantity
     * @param {number} quantity - Quantity to add
     */
    addToCartWithQuantity(quantity) {
        this.setQuantity(quantity);
        this.clickAddToCart();
        return this;
    }

    /**
     * Verify product information is displayed
     */
    verifyProductInformation() {
        this.elements.productName().should('be.visible');
        this.elements.productPrice().should('be.visible');
        this.elements.productCategory().should('be.visible');
        this.elements.productAvailability().should('be.visible');
        return this;
    }

    /**
     * Verify breadcrumb navigation
     */
    verifyBreadcrumb() {
        this.elements.breadcrumb().should('be.visible');
        this.elements.breadcrumbHome().should('contain.text', 'Home');
        this.elements.breadcrumbProducts().should('contain.text', 'Products');
        return this;
    }

    /**
     * Navigate back to home via breadcrumb
     */
    goBackToHome() {
        this.elements.breadcrumbHome().click();
        return this;
    }

    /**
     * Navigate back to products via breadcrumb
     */
    goBackToProducts() {
        this.elements.breadcrumbProducts().click();
        return this;
    }

    /**
     * Write a product review
     * @param {Object} reviewData - Review data containing name, email, and review text
     */
    writeReview(reviewData) {
        const { name, email, review } = reviewData;
        
        this.elements.reviewerName().type(name);
        this.elements.reviewerEmail().type(email);
        this.elements.reviewText().type(review);
        this.elements.submitReviewButton().click();
        
        return this;
    }

    /**
     * Verify review submission success
     */
    verifyReviewSubmitted() {
        this.elements.alertSuccess()
            .should('be.visible')
            .should('contain.text', 'Thank you for your review');
        return this;
    }

    /**
     * Get product availability status
     */
    getAvailabilityStatus() {
        return this.elements.productAvailability().invoke('text');
    }

    /**
     * Verify product images are displayed
     */
    verifyProductImages() {
        this.elements.productMainImage().should('be.visible');
        return this;
    }
}

module.exports = ProductDetailsPage;

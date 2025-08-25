/**
 * Cart Page Object Model
 * Contains all elements and methods for the Cart/Shopping Cart Page
 */

class CartPage {
    constructor() {
        // Page Elements
        this.elements = {
            // Page heading and navigation
            pageHeading: () => cy.get('.breadcrumb').contains('Shopping Cart'),
            cartInfo: () => cy.get('#cart_info'),
            
            // Cart table headers
            cartTable: () => cy.get('#cart_info_table'),
            itemHeader: () => cy.get('.cart_description'),
            priceHeader: () => cy.get('.cart_price'),
            quantityHeader: () => cy.get('.cart_quantity'),
            totalHeader: () => cy.get('.cart_total'),
            
            // Cart items
            cartItems: () => cy.get('#cart_info_table tbody tr'),
            cartItemRow: (productName) => cy.get('#cart_info_table tbody tr')
                .contains('.cart_description', productName).parent(),
            
            // Product details in cart
            productImage: (productName) => cy.get('#cart_info_table tbody tr')
                .contains('.cart_description', productName).parent()
                .find('.cart_product img'),
            productName: (productName) => cy.get('#cart_info_table tbody tr')
                .contains('.cart_description', productName),
            productPrice: (productName) => cy.get('#cart_info_table tbody tr')
                .contains('.cart_description', productName).parent()
                .find('.cart_price p'),
            productQuantity: (productName) => cy.get('#cart_info_table tbody tr')
                .contains('.cart_description', productName).parent()
                .find('.cart_quantity button'),
            productTotal: (productName) => cy.get('#cart_info_table tbody tr')
                .contains('.cart_description', productName).parent()
                .find('.cart_total_price'),
            
            // Action buttons
            deleteButton: (productName) => cy.get('#cart_info_table tbody tr')
                .contains('.cart_description', productName).parent()
                .find('.cart_delete a'),
            
            // Proceed to checkout
            proceedToCheckoutButton: () => cy.get('.check_out'),
            
            // Empty cart message
            emptyCartMessage: () => cy.get('#empty_cart'),
            
            // Recommended products
            recommendedItems: () => cy.get('#recommended-item-carousel'),
            
            // Cart summary (if available)
            cartSummary: () => cy.get('.cart_summary'),
            subtotal: () => cy.get('.cart_summary .subtotal'),
            shipping: () => cy.get('.cart_summary .shipping'),
            totalAmount: () => cy.get('.cart_summary .total'),
            
            // Continue shopping
            continueShoppingButton: () => cy.get('a').contains('Continue Shopping')
        };
    }

    /**
     * Visit Cart Page
     */
    visit() {
        cy.visit('/view_cart');
        this.verifyPageLoaded();
        return this;
    }

    /**
     * Verify Cart Page is loaded
     */
    verifyPageLoaded() {
        cy.url().should('include', '/view_cart');
        this.elements.cartInfo().should('be.visible');
        return this;
    }

    /**
     * Verify cart contains specific product
     * @param {string} productName - Name of the product to verify
     */
    verifyProductInCart(productName) {
        cy.log(`Verifying product in cart: ${productName}`);
        
        this.elements.productName(productName)
            .should('be.visible')
            .should('contain.text', productName);
            
        return this;
    }

    /**
     * Verify product quantity in cart
     * @param {string} productName - Name of the product
     * @param {number} expectedQuantity - Expected quantity
     */
    verifyProductQuantity(productName, expectedQuantity) {
        cy.log(`Verifying product quantity for ${productName}: ${expectedQuantity}`);
        
        this.elements.productQuantity(productName)
            .should('be.visible')
            .should('contain.text', expectedQuantity.toString());
            
        return this;
    }

    /**
     * Get product quantity from cart
     * @param {string} productName - Name of the product
     */
    getProductQuantity(productName) {
        return this.elements.productQuantity(productName).invoke('text');
    }

    /**
     * Get product price from cart
     * @param {string} productName - Name of the product
     */
    getProductPrice(productName) {
        return this.elements.productPrice(productName).invoke('text');
    }

    /**
     * Get product total price from cart
     * @param {string} productName - Name of the product
     */
    getProductTotal(productName) {
        return this.elements.productTotal(productName).invoke('text');
    }

    /**
     * Remove product from cart
     * @param {string} productName - Name of the product to remove
     */
    removeProduct(productName) {
        cy.log(`Removing product from cart: ${productName}`);
        
        this.elements.deleteButton(productName)
            .should('be.visible')
            .click();
            
        // Verify product is removed
        this.elements.productName(productName).should('not.exist');
        
        return this;
    }

    /**
     * Proceed to checkout
     */
    proceedToCheckout() {
        cy.log('Proceeding to checkout');
        
        this.elements.proceedToCheckoutButton()
            .should('be.visible')
            .should('be.enabled')
            .click();
            
        return this;
    }

    /**
     * Verify cart is empty
     */
    verifyCartIsEmpty() {
        // Check if empty cart message is displayed or no items in cart
        cy.get('body').then(($body) => {
            if ($body.find('#empty_cart').length > 0) {
                this.elements.emptyCartMessage().should('be.visible');
            } else {
                this.elements.cartItems().should('not.exist');
            }
        });
        
        return this;
    }

    /**
     * Get total number of items in cart
     */
    getCartItemsCount() {
        return this.elements.cartItems().its('length');
    }

    /**
     * Verify cart table headers
     */
    verifyCartTableHeaders() {
        this.elements.itemHeader().should('contain.text', 'Item');
        this.elements.priceHeader().should('contain.text', 'Price');
        this.elements.quantityHeader().should('contain.text', 'Quantity');
        this.elements.totalHeader().should('contain.text', 'Total');
        return this;
    }

    /**
     * Get all products in cart
     */
    getAllCartProducts() {
        const products = [];
        
        return this.elements.cartItems().each(($row) => {
            const productName = $row.find('.cart_description h4 a').text().trim();
            const price = $row.find('.cart_price p').text().trim();
            const quantity = $row.find('.cart_quantity button').text().trim();
            const total = $row.find('.cart_total_price').text().trim();
            
            products.push({
                name: productName,
                price: price,
                quantity: parseInt(quantity),
                total: total
            });
        }).then(() => {
            return cy.wrap(products);
        });
    }

    /**
     * Verify product details in cart
     * @param {Object} expectedProduct - Expected product details
     */
    verifyProductDetails(expectedProduct) {
        const { name, price, quantity } = expectedProduct;
        
        this.verifyProductInCart(name);
        
        if (price) {
            this.elements.productPrice(name)
                .should('contain.text', price);
        }
        
        if (quantity) {
            this.verifyProductQuantity(name, quantity);
        }
        
        return this;
    }

    /**
     * Continue shopping
     */
    continueShopping() {
        this.elements.continueShoppingButton()
            .should('be.visible')
            .click();
        return this;
    }

    /**
     * Verify cart page breadcrumb
     */
    verifyBreadcrumb() {
        this.elements.pageHeading()
            .should('be.visible')
            .should('contain.text', 'Shopping Cart');
        return this;
    }

    /**
     * Calculate expected total for a product
     * @param {string} price - Product price (e.g., "Rs. 500")
     * @param {number} quantity - Product quantity
     */
    calculateExpectedTotal(price, quantity) {
        // Extract numeric value from price string
        const numericPrice = parseInt(price.replace(/[^\d]/g, ''));
        const expectedTotal = numericPrice * quantity;
        return `Rs. ${expectedTotal}`;
    }

    /**
     * Verify calculated total matches displayed total
     * @param {string} productName - Name of the product
     */
    verifyCalculatedTotal(productName) {
        this.getProductPrice(productName).then((price) => {
            this.getProductQuantity(productName).then((quantity) => {
                const expectedTotal = this.calculateExpectedTotal(price, parseInt(quantity));
                this.elements.productTotal(productName)
                    .should('contain.text', expectedTotal);
            });
        });
        
        return this;
    }
}

module.exports = CartPage;

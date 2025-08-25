/**
 * Data Generator Utility
 * Provides methods to generate test data for automation tests
 * Uses simple random generation without external dependencies
 */

// Simple data generation functions
const dataGen = {
    name: {
        firstName: () => `FirstName${Math.floor(Math.random() * 1000)}`,
        lastName: () => `LastName${Math.floor(Math.random() * 1000)}`
    },
    internet: {
        email: () => `test${Date.now()}@example.com`,
        password: (length = 8) => Math.random().toString(36).slice(-length)
    },
    phone: {
        phoneNumber: (format = '##########') => {
            return format.replace(/#/g, () => Math.floor(Math.random() * 10));
        }
    },
    address: {
        streetAddress: () => `${Math.floor(Math.random() * 999)} Test Street`,
        city: () => `TestCity${Math.floor(Math.random() * 100)}`,
        state: () => `TestState${Math.floor(Math.random() * 50)}`,
        zipCode: () => String(Math.floor(Math.random() * 90000) + 10000),
        country: () => 'Test Country'
    },
    company: {
        companyName: () => `TestCompany${Math.floor(Math.random() * 1000)}`
    },
    commerce: {
        productName: () => `TestProduct${Math.floor(Math.random() * 1000)}`,
        productDescription: () => `Test product description ${Math.floor(Math.random() * 1000)}`,
        price: () => `${Math.floor(Math.random() * 1000) + 10}`,
        department: () => `TestDepartment${Math.floor(Math.random() * 100)}`,
        color: () => ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'][Math.floor(Math.random() * 6)]
    },
    datatype: {
        uuid: () => 'test-' + Math.random().toString(36).substr(2, 9),
        number: (options = {}) => {
            const min = options.min || 0;
            const max = options.max || 100;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    date: {
        past: (years) => new Date(Date.now() - Math.random() * 31536000000), // Random date in past year
        recent: () => new Date(Date.now() - Math.random() * 86400000) // Random date in past day
    },
    finance: {
        creditCardNumber: () => '4111111111111111',
        creditCardCVV: () => String(Math.floor(Math.random() * 900) + 100)
    },
    lorem: {
        sentence: (words = 4) => `Test sentence with ${words} words ${Math.floor(Math.random() * 1000)}`,
        paragraph: () => `Test paragraph content ${Math.floor(Math.random() * 1000)}. More test content here.`,
        paragraphs: (count = 2) => Array(count).fill(0).map((_, i) => `Test paragraph ${i + 1} content.`).join(' ')
    },
    random: {
        word: () => `TestWord${Math.floor(Math.random() * 1000)}`,
        arrayElement: (array) => array[Math.floor(Math.random() * array.length)]
    }
};

class DataGenerator {
    /**
     * Generate random user data
     * @returns {Object} User data object
     */
    static generateUserData() {
        return {
            firstName: dataGen.name.firstName(),
            lastName: dataGen.name.lastName(),
            email: dataGen.internet.email(),
            password: dataGen.internet.password(8),
            phone: dataGen.phone.phoneNumber('##########'),
            address: dataGen.address.streetAddress(),
            city: dataGen.address.city(),
            state: dataGen.address.state(),
            zipCode: dataGen.address.zipCode(),
            country: dataGen.address.country(),
            company: dataGen.company.companyName(),
            dateOfBirth: dataGen.date.past(30, new Date(2000, 0, 1))
        };
    }

    /**
     * Generate random product data
     * @returns {Object} Product data object
     */
    static generateProductData() {
        return {
            name: dataGen.commerce.productName(),
            description: dataGen.commerce.productDescription(),
            price: dataGen.commerce.price(),
            category: dataGen.commerce.department(),
            brand: dataGen.company.companyName(),
            color: dataGen.commerce.color(),
            size: dataGen.random.arrayElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
            material: dataGen.random.arrayElement(['Cotton', 'Polyester', 'Silk', 'Wool', 'Leather'])
        };
    }

    /**
     * Generate random order data
     * @returns {Object} Order data object
     */
    static generateOrderData() {
        return {
            orderId: dataGen.datatype.uuid(),
            orderDate: dataGen.date.recent(),
            quantity: dataGen.datatype.number({ min: 1, max: 10 }),
            total: dataGen.commerce.price(),
            status: dataGen.random.arrayElement(['Pending', 'Processing', 'Shipped', 'Delivered']),
            paymentMethod: dataGen.random.arrayElement(['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'])
        };
    }

    /**
     * Generate random credit card data
     * @returns {Object} Credit card data object
     */
    static generateCreditCardData() {
        return {
            cardNumber: dataGen.finance.creditCardNumber(),
            expiryMonth: dataGen.datatype.number({ min: 1, max: 12 }).toString().padStart(2, '0'),
            expiryYear: dataGen.datatype.number({ min: 2024, max: 2030 }).toString(),
            cvv: dataGen.finance.creditCardCVV(),
            cardHolderName: `${dataGen.name.firstName()} ${dataGen.name.lastName()}`
        };
    }

    /**
     * Generate random review data
     * @returns {Object} Review data object
     */
    static generateReviewData() {
        return {
            rating: dataGen.datatype.number({ min: 1, max: 5 }),
            title: dataGen.lorem.sentence(4),
            comment: dataGen.lorem.paragraph(),
            reviewerName: `${dataGen.name.firstName()} ${dataGen.name.lastName()}`,
            reviewerEmail: dataGen.internet.email(),
            reviewDate: dataGen.date.recent()
        };
    }

    /**
     * Generate random contact form data
     * @returns {Object} Contact form data object
     */
    static generateContactData() {
        return {
            name: `${dataGen.name.firstName()} ${dataGen.name.lastName()}`,
            email: dataGen.internet.email(),
            subject: dataGen.lorem.sentence(3),
            message: dataGen.lorem.paragraphs(2),
            phone: dataGen.phone.phoneNumber('##########')
        };
    }

    /**
     * Generate random search terms
     * @returns {Array} Array of search terms
     */
    static generateSearchTerms() {
        return [
            dataGen.commerce.productName ? dataGen.commerce.productName() : 'Test Product',
            dataGen.commerce.color(),
            dataGen.random.arrayElement(['top', 'dress', 'jeans', 'shirt', 'shoes', 'bag'])
        ];
    }

    /**
     * Generate test data for specific test scenarios
     * @param {string} scenario - Test scenario name
     * @returns {Object} Scenario-specific test data
     */
    static generateScenarioData(scenario) {
        switch (scenario) {
            case 'login':
                return {
                    validUser: {
                        email: 'testuser@example.com',
                        password: 'password123'
                    },
                    invalidUser: {
                        email: 'invalid@example.com',
                        password: 'wrongpassword'
                    }
                };

            case 'registration':
                return this.generateUserData();

            case 'product_search':
                return {
                    validSearchTerm: 'Winter Top',
                    invalidSearchTerm: 'XYZ123NotFound',
                    partialSearchTerm: 'Top'
                };

            case 'checkout':
                return {
                    ...this.generateUserData(),
                    ...this.generateCreditCardData(),
                    deliveryNotes: dataGen.lorem.sentence()
                };

            default:
                return {};
        }
    }

    /**
     * Get current timestamp
     * @param {string} format - Format for timestamp ('datetime', 'date', 'time')
     * @returns {string} Formatted timestamp
     */
    static getTimestamp(format = 'datetime') {
        const now = new Date();
        
        switch (format) {
            case 'date':
                return now.toISOString().split('T')[0];
            case 'time':
                return now.toTimeString().split(' ')[0];
            case 'timestamp':
                return now.getTime().toString();
            default:
                return now.toISOString().replace(/[:.]/g, '-');
        }
    }

    /**
     * Generate unique identifier
     * @param {string} prefix - Prefix for the ID
     * @returns {string} Unique identifier
     */
    static generateUniqueId(prefix = 'test') {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `${prefix}_${timestamp}_${random}`;
    }

    /**
     * Generate random file name
     * @param {string} extension - File extension
     * @returns {string} Random file name
     */
    static generateFileName(extension = 'txt') {
        const baseName = `testfile_${Math.floor(Math.random() * 1000)}`;
        const timestamp = this.getTimestamp('timestamp');
        return `${baseName}_${timestamp}.${extension}`;
    }

    /**
     * Generate test environment data
     * @returns {Object} Environment configuration
     */
    static generateEnvironmentData() {
        return {
            environment: dataGen.random.arrayElement(['dev', 'staging', 'production']),
            browser: dataGen.random.arrayElement(['chrome', 'firefox', 'edge', 'safari']),
            viewport: dataGen.random.arrayElement([
                { width: 1920, height: 1080 },
                { width: 1366, height: 768 },
                { width: 1280, height: 720 },
                { width: 375, height: 667 } // Mobile
            ]),
            timeout: dataGen.datatype.number({ min: 5000, max: 30000 })
        };
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email format
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone number format
     * @param {string} phone - Phone number to validate
     * @returns {boolean} True if valid phone format
     */
    static isValidPhone(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }

    /**
     * Generate test data from template
     * @param {Object} template - Data template
     * @param {Object} overrides - Values to override in template
     * @returns {Object} Generated data with overrides applied
     */
    static fromTemplate(template, overrides = {}) {
        const baseData = JSON.parse(JSON.stringify(template));
        return { ...baseData, ...overrides };
    }
}

module.exports = DataGenerator;

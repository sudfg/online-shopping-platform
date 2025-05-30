describe('End-to-End Tests for Online Shopping Platform', () => {
  it('should navigate to the homepage', () => {
    cy.visit('/');
    cy.contains('Home').should('be.visible');
  });

  it('should add a product to the cart', () => {
    cy.visit('/');
    cy.get('.productCard').first().find('.addToCartButton').click();
    cy.get('.cartBadge').should('contain', '1');
  });

  it('should navigate to the cart page', () => {
    cy.visit('/');
    cy.get('.navItem').contains('Cart').click();
    cy.url().should('include', '/cart');
    cy.contains('Shopping Cart').should('be.visible');
  });

  it('should proceed to checkout', () => {
    cy.visit('/cart');
    cy.get('.proceedToCheckoutButton').click();
    cy.url().should('include', '/checkout');
    cy.contains('Checkout Summary').should('be.visible');
  });

  it('should place an order', () => {
    cy.visit('/checkout');
    cy.get('#name').type('John Doe');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Anytown');
    cy.get('#state').type('CA');
    cy.get('#zip').type('12345');
    cy.get('.placeOrderButton').click();
    cy.url().should('include', '/order-confirmation');
    cy.contains('Order Success').should('be.visible');
  });
});

/// <reference types = "cypress" />

context('Compra', () => {

    //carregar a url antes de cada cenario -> before each
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br')
    });

    //screenshot depois de cada teste
    afterEach(() => {
        cy.screenshot()
    });

    it('clicando em comprar o produto deve ser adicionado ao carrinho', () => {
        cy.get('#primary-menu > .menu-item-629 > a').as('comprarMenuLink') //alias botao comprar
        cy.get('@comprarMenuLink').contains('Comprar').and('have.attr', 'href').and('include', 'shop') //verifica que contem o titulo comprar e eh um link com caminho shop
        cy.get('@comprarMenuLink').click() //clica no botao comprar
        cy.url().should('contain', '/shop') //verifica que o caminho eh shop
        cy.get('.page-title').should('contain', 'Produtos') //verifica que titulo da pagina contem a palavra Produtos
        cy.get('.post-2559 > .product-block > .caption > .meta > .infor > .name > a').click() //seleciona produto 1
        cy.get('.product_title').should('contain', 'Abominable Hoodie') //verifica titulo do produto 1 selecionado
        cy.get('.button-variable-item-M').click() //escolhe tamanho do produto
        cy.get('.button-variable-item-Green').click() //escolhe cor do produto
        cy.get('.single_add_to_cart_button').click() //clica no botao comprar
        cy.get('.woocommerce-message').should('contain', '“Abominable Hoodie” foi adicionado no seu carrinho.') //verifica mensagem adicionado ao carrinho
        cy.get('.woocommerce-message > .button').as('verCarrinhoBotao') //alias botao ver carrinho
        cy.get('@verCarrinhoBotao').click() //clica no botao ver carrinho
        cy.url().should('contain', '/cart') //verifica que foi direcionado p o caminho cart
        cy.get('.product-name > a').should('contain', 'Abominable Hoodie - M, Green') //verifica que o produto do carrinho eh o mesmo que foi selecionado
        cy.get('.checkout-button').as('concluirCompraBotao') //alias botao concluir compra
        cy.get('@concluirCompraBotao').click() //clica no botao concluir compra
        cy.get('.page-title').should('contain', 'Checkout') //verifica que foi para pagina de checkout
    });
});
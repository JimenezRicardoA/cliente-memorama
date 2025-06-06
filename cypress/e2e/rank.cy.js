describe('Vista Ranking', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/rank');
    })

    it('Debe mostrar la tabla de ranking de nivel facil', () => {
        cy.contains('Dificultad Facil').should('be.visible');
        cy.contains('Dificultad Facil')
            .parent()
            .next('.tabla')
            .should('be.visible');
    })

    it('Debe mostrar la tabla de ranking de nivel Medio', () => {
        cy.contains('Dificultad Medio').should('be.visible');
        cy.contains('Dificultad Medio')
            .parent()
            .next('.tabla')
            .should('be.visible');
    })

    it('Debe mostrar la tabla de ranking de nivel Dificil', () => {
        cy.contains('Dificultad Dificil').should('be.visible');
        cy.contains('Dificultad Dificil')
            .parent()
            .next('.tabla')
            .should('be.visible');
    })
})
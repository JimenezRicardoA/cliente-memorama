describe('Vista Score', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
        cy.get('input#username').should('be.visible').type('Yomero');
        cy.get('button').contains('Registro/Ingreso').should('be.visible').click();
        cy.get('button').contains('Kanto').click();
        cy.get('button').contains('Facil').click();
        cy.get('button').contains('Start Game').should('be.visible').click();

        let cardData = [];
        const ditto = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png';

        cy.get('.box').each(($card, index) => {
            cy.wrap($card).click();
            cy.wait(300);
            cy.wrap($card).find('img').invoke('attr', 'src').then((src) => {
                cardData.push({ index, src });
                cy.wrap($card).click();
                cy.wait(300);
            });
        }).then(() => {
            function findMatchingPair(data) {
                for (let i = 0; i < data.length; i++) {
                    for (let j = i + 1; j < data.length; j++) {
                        if (data[i].src === data[j].src && data[i].src !== ditto) {
                            return [data[i], data[j]];
                        }
                    }
                }
                return [];
            }

            function revealAllPairs() {
                const pair = findMatchingPair(cardData);

                if (pair.length === 2) {
                    const [card1, card2] = pair;

                    cy.get('.box').eq(card1.index).click();
                    cy.get('.box').eq(card2.index).click();

                    cy.wait(600);

                    cy.get('.box').eq(card1.index).find('img').should('not.have.attr', 'src', ditto);
                    cy.get('.box').eq(card2.index).find('img').should('not.have.attr', 'src', ditto);

                    card1.src = ditto;
                    card2.src = ditto;

                    revealAllPairs();
                } else {
                    cy.contains('Juego Terminado').should('be.visible');
                }
            }

            revealAllPairs();
        });

        cy.get('h1').contains('Juego Terminado').should('be.visible');
        cy.get('button').contains('Score').should('be.visible').click();
    });

    it('Debe mostrar el puntaje del jugador', () => {
        cy.get('h2').contains('Nombre de Usuario: Yomero').should('be.visible');
        cy.get('h2').contains('Región: Kanto').should('be.visible');
        cy.get('h2').contains('Dificultad: Facil').should('be.visible');
        cy.get('h2').contains('Puntaje: 18').should('be.visible');
        cy.get('button').contains('Volver a jugar').should('be.visible');
        cy.get('button').contains('Puntajes').should('be.visible');
    })

    it('Al dar click en el boton de Volver a jugar debe regresar a la vissta game, recuperando los datos para volver a jugar', () => {
        cy.get('button').contains('Volver a jugar').should('be.visible').click();

        cy.url().should('include', '/game');
        cy.get('h2').contains('Username: Yomero').should('be.visible');
        cy.get('h2').contains('Region: Kanto').should('be.visible');
        cy.get('h2').contains('Dificultad: Facil').should('be.visible');
    })

    it('Al dar click en el boton de Puntajes debe redirigir a la vista de Ranking', () => {
        cy.get('button').contains('Puntajes').should('be.visible').click();

        cy.url().should('include', '/rank');
    })
})
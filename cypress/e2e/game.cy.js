function findDifferentCards(cardData) {
    const different = [];
    for (let i = 0; i < cardData.length; i++) {
        for (let j = i + 1; j < cardData.length; j++) {
            if (cardData[i].src !== cardData[j].src) {
                different.push(cardData[i], cardData[j]);
                break;
            }
        }
        if (different.length >= 2) break;
    }
    return different;
}

function findMatchingPair(cardData) {
    for (let i = 0; i < cardData.length; i++) {
        for (let j = i + 1; j < cardData.length; j++) {
            if (cardData[i].src === cardData[j].src) {
                return [cardData[i], cardData[j]];
            }
        }
    }
    return [];
}

describe('Vista Game', () => {
    beforeEach(() => {
        cy.get('input#username').should('be.visible').type('Yomero');
        cy.get('button').contains('Registro/Ingreso').should('be.visible').click();
        cy.get('button').contains('Kanto').click();
        cy.get('button').contains('Facil').click();
        cy.get('button').contains('Iniciar Juego').should('be.visible').click();
        cy.url().should('include', '/game');
    });

    it('Debe ser visible el titulo de la', () => {
        cy.get('h1').contains('Encuentra los pares lo mas pronto posible!').should('be.visible');
    })

    it('Debe mostrar los datos de username, regioon y modo seleccionados', () => {
        cy.get('h2').contains('Username: Yomero').should('be.visible');
        cy.get('h2').contains('Region: Kanto').should('be.visible');
        cy.get('h2').contains('Dificultad: Facil').should('be.visible');
    })

    it('Los bootones de las cartas deben ser visibles', () => {
        cy.wait(1500);
        cy.get('.box').should('exist').and('have.length.greaterThan', 1);
    })

    it('Al ser clickeada una carta esta debe voltearse mostrando la imagen del pokemon. Ademas debe aumentar el puntaje', () => {
        cy.get('.box img').first().invoke('attr', 'src').then((initialSrc) => {
            cy.get('.box').first().click();
            cy.get('.box img').first().should('have.attr', 'src').and('not.eq', initialSrc);
        })

        cy.get('h2').contains('Puntaje: 1').should('be.visible');
    })

    it('Debe manejar pares incorrectos correctamente - Método controlado', () => {
        let cardData = [];
        const ditto = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png';

        cy.get('.box').each(($card, index) => {
            cy.wrap($card).click();
            cy.wrap($card).find('img').invoke('attr', 'src').then((src) => {
                cardData.push({ index, src, element: $card });

                if (index > 0) {
                    cy.wait(600);
                }
            });
        }).then(() => {
            const differentCards = findDifferentCards(cardData);

            if (differentCards.length >= 2) {
                const [card1, card2] = differentCards;

                cy.get('.box').eq(card1.index).click();
                cy.get('.box').eq(card2.index).click();

                cy.wait(600);
                cy.get('.box').eq(card1.index).find('img').should('have.attr', 'src', ditto)
                cy.get('.box').eq(card2.index).find('img').should('have.attr', 'src', ditto);
            }
        });
    });

    it('Debe manejar pares correctos correctamente - Método controlado', () => {
        let cardData = [];
        const ditto = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png';

        cy.get('.box').each(($card, index) => {
            cy.wrap($card).click();
            cy.wait(500);
            cy.wrap($card).find('img').invoke('attr', 'src').then((src) => {
                cardData.push({ index, src, element: $card });

                cy.wrap($card).click();
                cy.wait(500);
            });
        }).then(() => {
            const matchingPair = findMatchingPair(cardData);

            if (matchingPair.length === 2) {
                const [card1, card2] = matchingPair;

                cy.get('.box').eq(card1.index).click();
                cy.get('.box').eq(card2.index).click();

                cy.wait(1000);

                cy.get('.box').eq(card1.index).find('img').should('not.have.attr', 'src', ditto);
                cy.get('.box').eq(card2.index).find('img').should('not.have.attr', 'src', ditto);
            }
        });
    });

    it('Debe finalizar el juego revelando todos los pares correctos', () => {
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
        cy.get('button').contains('Score').should('be.visible');
    });
});
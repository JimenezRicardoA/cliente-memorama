
describe('Vista Home', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Deben ser visibles los textos dentr de la vista', () => {
    cy.get('h2').contains('¿Eres el mejor maestro Pokemon del mundo?').should('be.visible');
    cy.get('h3').contains('Encuentra Todos los Pookemons ocultos y demuestralo!!').should('be.visible');
  })

  it('Deben ser visibles las instrucciones del juego', () => {
    cy.get('h2').contains('Instrucciones:').should('be.visible');
    cy.get('p').contains('Para mostrar al pokemon detrás del Ditto da click en el pokemon deseado, después elige otra opción para encontrar el par').should('be.visible');
    cy.get('p').contains('Una vez que hayas encontrado todos los pares, el juego te mostrará tu puntaje').should('be.visible');
    cy.get('label').contains('Nombre de Usuario:').should('be.visible')
  })

  it('Una vez agregado el nombre de usuario y se da click en el boton de registro debe mostrar los botones de Region', () => {
    cy.get('input#username').should('be.visible').type('Yomero');
    cy.get('button').contains('Registro/Ingreso').should('be.visible').click();

    cy.get('button').should('be.visible');
  })

  it('Al dar Click en el boton de Region debe mostrar los botones de "Modo"', () => {
    cy.get('input#username').should('be.visible').type('Yomero');
    cy.get('button').contains('Registro/Ingreso').should('be.visible').click();
    cy.get('button').contains('Kanto').click();
    cy.get('button').should('be.visible');
  })

  it('Al seleccioonar el modo debe mostrarse el boton de start game', () => {
    cy.get('input#username').should('be.visible').type('Yomero');
    cy.get('button').contains('Registro/Ingreso').should('be.visible').click();
    cy.get('button').contains('Kanto').click();
    cy.get('button').contains('Facil').click();
    cy.get('button').contains('Iniciar Juego').should('be.visible')
  })

  it('Al Llenar los datos y dar click en el boton de startGame debe enviarte a la vista de GameView', () => {
    cy.get('input#username').should('be.visible').type('Yomero');
    cy.get('button').contains('Registro/Ingreso').should('be.visible').click();
    cy.get('button').contains('Kanto').click();
    cy.get('button').contains('Facil').click();
    cy.get('button').contains('Iniciar Juego').should('be.visible').click();
    cy.url().should('include', '/game');
  })
})

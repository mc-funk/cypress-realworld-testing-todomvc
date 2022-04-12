describe('React TodoMVC', () => {
  const TODO_ITEM_1 = 'Buy Milk'
  const TODO_ITEM_2 = 'Pay Rent'
  const TODO_ITEM_3 = 'Pickup Dry Cleaning'

  beforeEach(() => {
    cy.visit('http://127.0.0.1:8888')
  })

  it('adds a single todo', () => {
    cy.get('.new-todo').type(`${TODO_ITEM_1}{enter}`)
    cy.get('.todo-list li')
    .eq(0)
    .find('label')
    .should('contain', TODO_ITEM_1)

    cy.get('.todo-list li').should('have.length', 1)
  })

  it('adds three todos', () => {
    cy.createDefaultTodos().as('todos')
    cy.get('@todos').should('have.length', 3)
  })

  it('should append new items to the bottom of the list', () => {
    cy.createDefaultTodos().as('todos')

    // Todo 1
    cy.get('@todos')
    .eq(0)
    .find('label')
    .should('contain', TODO_ITEM_1)

    // Todo 2
    cy.get('@todos')
    .eq(1)
    .find('label')
    .should('contain', TODO_ITEM_2)

    // Todo 3
    cy.get('@todos')
    .eq(2)
    .find('label')
    .should('contain', TODO_ITEM_3)

    cy.get('.todo-count').contains('3 items left')
  })

  it('does NOT display the footer or todo-list when there are no todos', () => {
    cy.get('.footer').should('not.exist')
    cy.get('.todo-list').should('not.exist')
  })
})

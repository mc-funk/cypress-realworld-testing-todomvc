Cypress.Commands.add('createDefaultTodos', () => {
  const TODO_ITEM_1 = 'Buy Milk'
  const TODO_ITEM_2 = 'Pay Rent'
  const TODO_ITEM_3 = 'Pickup Dry Cleaning'

  let cmd = Cypress.log({
    name: 'create default todos',
    consoleProps () {
      return {
        'Inserted Todos': [TODO_ITEM_1, TODO_ITEM_2, TODO_ITEM_3],
      }
    },
  })

  cy.get('.new-todo', { log: false })
  .type(`${TODO_ITEM_1}{enter}`, { log: false })
  .type(`${TODO_ITEM_2}{enter}`, { log: false })
  .type(`${TODO_ITEM_3}{enter}`, { log: false })

  cy.get('.todo-list li', { log: false }).then((listItems) => {
    cmd.set({ el: listItems }).snapshot().end()
  })
})

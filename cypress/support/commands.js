import { TODO_ITEM_1, TODO_ITEM_3, TODO_ITEM_2 } from './constants';

Cypress.Commands.add("createDefaultTodos", () => {
    let cmd = Cypress.log({
        name: 'create default todos',
        consoleProps() {
            return {
                'Inserted todos': [TODO_ITEM_1, TODO_ITEM_2, TODO_ITEM_3],
            }
        },
    });

    cy.get(".new-todo", { log: false })
        .type(`${TODO_ITEM_1}{enter}`, {log: false})
        .type(`${TODO_ITEM_2}{enter}`, {log: false})
        .type(`${TODO_ITEM_3}{enter}`, {log: false});

    cy.get(".todo-list li", { log: false }).then((listItems) => {
        cmd.set({ el: listItems }).snapshot().end()
    });
});
import { TODO_ITEM_1, TODO_ITEM_3, TODO_ITEM_2 } from '../support/constants';

describe('React TodoMVC', () => {
    beforeEach(() => {
        cy.visit("http://localhost:8888")
    })
    it('adds a single todo', () => {
        cy.get(".new-todo").type(`${TODO_ITEM_1}{enter}`);
        cy.get('.todo-list li').should('have.length', 1);
        cy.get('.todo-list li').eq(0).find('label').should("contain", TODO_ITEM_1);
    });
    it('adds three todos', () => {
        cy.createDefaultTodos().as('todos');
        cy.get('@todos').should('have.length', 3);
    });
    it('should append three items in correct order,', () => {
        cy.createDefaultTodos().as('todos');
        cy.get('@todos').eq(0).find('label').should("contain", TODO_ITEM_1);
        cy.get('@todos').eq(1).find('label').should("contain", TODO_ITEM_2);
        cy.get('@todos').eq(2).find('label').should("contain", TODO_ITEM_3);

    });
    it('Should show correct todo count for 3 items', () => {
        cy.createDefaultTodos();
        cy.get('.todo-list li').should('have.length', 3);
        cy.get('.todo-count').contains('3 items left');
    });
    it('does NOT display the footer or todo list when there are no todos',() => {
        cy.get('.footer').should('not.exist');
        cy.get(".todo-list").should("not.exist")
    });
})
import { TODO_ITEM_1, TODO_ITEM_2, TODO_ITEM_3, TODO_ITEM_4, TODO_ITEM_5 } from '../../support/constants';
describe('React TodoMVC practice', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8888")
  })
  it('adds five todos', () => {
    // Without using the cy.createDefaultTodos() custom command
    // write a test that asserts you can add 5 todos
    // Hint: make sure to assert the length is equal to 5
    cy.get('.new-todo').type(`${TODO_ITEM_1}{enter}`)
      .type(`${TODO_ITEM_2}{enter}`)
      .type(`${TODO_ITEM_3}{enter}`)
      .type(`${TODO_ITEM_4}{enter}`)
      .type(`${TODO_ITEM_5}{enter}`);
    cy.get('.todo-list li').should('have.length', 5);
  })

  it('focuses on the todo input field, when the app is first opened', () => {
    // Write a test that asserts that the input field
    // is focused automatically when the app is first loaded.
    // Hint: you will need to use cy.focused()
    // https://docs.cypress.io/api/commands/focused
    // console.log(cy.focused());
    cy.focused().should('have.class', 'new-todo');
  })

  it('should clear text input field when an item is added', () => {
    // Write a test that ensures that the input field is cleared
    // after adding a todo
    cy.get('.new-todo').type(`${TODO_ITEM_1}`);
    cy.get('.new-todo').should('have.value', TODO_ITEM_1);
    cy.get('.new-todo').type('{enter}');
    cy.get('.new-todo').should('have.value', '');
  })

  it('can mark a todo as "completed"', () => {
    // Write a test that ensures that a todo can be "completed"
    // Hint: You will need to verify the class name of the completed todo
    cy.get('.new-todo').type(`${TODO_ITEM_1}{enter}`)
      .type(`${TODO_ITEM_2}{enter}`);
    cy.get('.todo-list .toggle').eq(0).click();
    cy.get('.todo-list li').eq(0).should('have.class', 'completed');
    cy.get('.todo-list li').eq(1).should('not.have.class', 'completed');
  })

  it('the "Clear completed" button clears all completed todos', () => {
    // Write a test that ensures that the "Clear completed" removes
    // all completed todos from the app
    // Hint: You will need to verify the class name of the completed todo
    cy.get('.new-todo').type(`${TODO_ITEM_1}{enter}`)
      .type(`${TODO_ITEM_2}{enter}`);
      cy.get('.clear-completed').should('not.exist');
    cy.get('.todo-list .toggle').eq(0).click();
    cy.get('li.completed').should('have.length', 1);
    cy.get('.clear-completed')
      .should('exist')
      .click();
    cy.get('li.completed').should('not.exist');
    cy.get('.todo-list li').should('have.length', 1);
  })

  it('allows you to edit a todo', () => {
    // Write a test that ensures that you can edit a todo
    // Hint: You will need to use cy.dblclick()
    // https://docs.cypress.io/api/commands/dblclick
    cy.get('.new-todo').type(`${TODO_ITEM_1}{enter}`)
    .type(`${TODO_ITEM_2}{enter}`);
    cy.get('.todo-list li').eq(0).dblclick();
    cy.get('.editing').should('have.length', 1);
  })

  it('should save edits on blur', () => {
    // Write a test that ensures that an edited todo is saved when it is blurred
    // Hint: You will need to use cy.blur()
    // https://docs.cypress.io/api/commands/blur
    cy.get('.new-todo').type(`${TODO_ITEM_1}{enter}`)
    .type(`${TODO_ITEM_2}{enter}`);
    cy.get('.todo-list li').eq(0)
      .dblclick()
      .find('.edit')
      .type(' and stuff')
      .blur();
    cy.get('.editing').should('not.exist');
    cy.get('.todo-list li').eq(0).find('label').should('contain', `${TODO_ITEM_1} and stuff`)
  })

  it('should display the current number of todo items', () => {
    // Write a test that ensures that the app counts the correct number of todos
    // left to be completed, i.e "3 items left" in the bottom left corner.
    cy.get('.new-todo').type(`${TODO_ITEM_1}{enter}`)
    .type(`${TODO_ITEM_2}{enter}`)
    .type(`${TODO_ITEM_3}{enter}`)
    .type(`${TODO_ITEM_4}{enter}`)
    .type(`${TODO_ITEM_5}{enter}`);
    cy.get('.clear-completed').should('not.exist');
    cy.get('.todo-list .toggle').eq(0).click();
    cy.get('.todo-list .toggle').eq(3).click();
    cy.get('li.completed').should('have.length', 2);
    cy.get('.todo-list li').should('have.length', 5);
    cy.get('.todo-count').contains('3 items left');
  })

  it('should persist its data after a page refresh', () => {
    // Write a test that ensures that the todos are persisted in the app
    // after the browser refreshes the page
    // Hint: You will need to use cy.reload()
    // https://docs.cypress.io/api/commands/reload

    cy.get('.new-todo').type(`${TODO_ITEM_1}{enter}`)
      .type(`${TODO_ITEM_2}{enter}`)
      .type(`${TODO_ITEM_3}{enter}`)
      .type(`${TODO_ITEM_4}{enter}`)
      .type(`${TODO_ITEM_5}{enter}`);
    cy.get('.todo-list li').should('have.length', 5);
    cy.reload();
    cy.get('.todo-list li').should('have.length', 5);
  });

  it('can display only completed todos', () => {
    // Write a test that ensures that only the completed todos are
    // displayed when the "Completed" button is clicked at the bottom
    cy.get('.new-todo').type(`${TODO_ITEM_1}{enter}`)
    .type(`${TODO_ITEM_2}{enter}`)
    .type(`${TODO_ITEM_3}{enter}`)
    .type(`${TODO_ITEM_4}{enter}`)
    .type(`${TODO_ITEM_5}{enter}`);
    cy.get('.clear-completed').should('not.exist');
    cy.get('.todo-list .toggle').eq(0).click();
    cy.get('.todo-list .toggle').eq(3).click();
    cy.get('li.completed').should('have.length', 2);
    cy.get('.todo-list li').should('have.length', 5);
    cy.get('.filters li').eq(2).click();
    cy.get('.todo-list li').should('have.length', 2);
  })
})

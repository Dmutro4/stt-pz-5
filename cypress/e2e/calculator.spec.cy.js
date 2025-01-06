describe('e2e test for calculator app', () => {
  let bnt1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn0;
  let btnPlus, btnMinus, btnEqual, dashboard;

  
  before(() => {
    cy.visit('http://localhost:3000/');
    
    cy.get('[data-test="btn-1"]').then(($el) => {
      bnt1 = $el
    });
    btn2 = cy.get('[data-test="btn-2"]').then(($el) => {
      btn2 = $el
    });
    cy.get('[data-test="btn-6"]').then(($el) => {
      btn6 = $el
    });
    cy.get('[data-test="btn-9"]').then(($el) => {
      btn9 = $el
    });
    cy.get('[data-test="btn-plus"]').then(($el) => {
      btnPlus = $el
    });
    cy.get('[data-test="btn-minus"]').then(($el) => {
      btnMinus = $el
    });
    cy.get('[data-test="dashboard"]').then(($el) => {
      dashboard = $el
    });
    cy.get('[data-test="btn-equal"]').then(($el) => {
      btnEqual = $el
    });
  });
  

  it('should check expression 2+9-6', () => {
    btn2.click()
    btnPlus.click()
    btn9.click()
    btnMinus.click()
    btn6.click()

    cy.wrap(dashboard).invoke('val').then(val => {
      expect(val).to.equal('2+9-6');
    })

  })

  it('should check result of expression 2+9-6', () => {
    btnEqual.click()
    cy.wrap(dashboard).invoke('val').then(val => {
      expect(val).to.equal('5');
    })

  })
  it('should check result of expression 1+2+3+4-5-6-7-8-9', () => {
    cy.get('[data-test="btn-clr"]').click()
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.get('[data-test="btn-2"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.get('[data-test="btn-3"]').click();
    cy.get('[data-test="btn-plus"]').click();
    cy.get('[data-test="btn-4"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-5"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-6"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-7"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-8"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-equal"]').click();
    cy.get('[data-test="dashboard"]').invoke('val').should('equal', '-25');
   
  })

  it('should check result expression 10/10', () => {
    cy.get('[data-test="btn-clr"]').click();
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-slash"]').click();
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-equal"]').click();
  
    cy.get('[data-test="dashboard"]').invoke('val').should('equal', '1');
    
  })

  it('should check result expression 0.5*10', () => {
    cy.get('[data-test="btn-clr"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-dot"]').click();
    cy.get('[data-test="btn-5"]').click();
    cy.get('[data-test="btn-multiply"]').click();
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-equal"]').click();

    cy.get('[data-test="dashboard"]').invoke('val').should('equal', '5');
  })

  it('should check result expression 0.1*99', () => {
    cy.get('[data-test="btn-clr"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-dot"]').click();
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-multiply"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-equal"]').click();

    cy.get('[data-test="dashboard"]').invoke('val').should('equal', '9.9');
  })

  it('should calculate 10 percent of 1,000', () => {
    cy.get('[data-test="btn-clr"]').click();
    cy.get('[data-test="btn-1"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-minus"]').click();
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-0"]').click();
    cy.get('[data-test="btn-percentages"]').click();
    cy.get('[data-test="btn-equal"]').click();
  
    cy.get('[data-test="dashboard"]').invoke('val').should('equal', '100');
  })

  it('should check clear button', () => {
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-clr"]').click();
  
    cy.get('[data-test="dashboard"]').invoke('val').should('equal', '');
  })

  it('should check save button', () => {
    cy.get('[data-test="btn-9"]').click();
    cy.get('[data-test="btn-save"]').click();
  
    cy.window().then((win) => {
      const savedValue = win.localStorage.getItem('saved-result');
      expect(savedValue).to.equal('9');
    });
  })

  it('should check paste button', () => {
    cy.get('[data-test="btn-clr"]').click();
    cy.window().then((win) => {
      cy.get('[data-test="btn-1"]').click();
      cy.get('[data-test="btn-2"]').click();
      cy.get('[data-test="btn-3"]').click();
      win.localStorage.setItem('saved-result', '123');
    });

    cy.get('[data-test="btn-paste"]').click();
    cy.get('[data-test="dashboard"]').invoke('val').should('equal', '123');
  })

  it('should check change theme, toggle theme button', () => {
    cy.get('[data-test="btn-theme"]').click();
    cy.get('body').should('have.class', 'theme-second');

    cy.get('[data-test="btn-toggle-theme"]').click();
    cy.get('body').should('have.class', 'theme-one');
  })

})

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Змінити на правильний URL вашого застосунку
    defaultCommandTimeout: 10000, // Збільшення таймауту для команд
    responseTimeout: 20000, // Збільшення часу очікування відповіді сервера
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Каталог для тестів
    supportFile: "cypress/support/e2e.js", // Файл підтримки
    setupNodeEvents(on, config) {
      // Додайте плагіни або події, якщо потрібно
      return config;
    },
  },
});

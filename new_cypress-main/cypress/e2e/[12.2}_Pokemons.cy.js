describe('Покупка нового аватара для тренера', function () {

    beforeEach('Открытие сайта покемонов и авторизация', function () {
        cy.visit('https://pokemonbattle.ru/');

        // Ввод логина
        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN');

        // Ввод пароля
        cy.get('#password').type('USER_PASSWORD');

        // Нажатие на кнопку авторизации
        cy.get('.auth__button').click();
    });

    it('Покупка доступного аватара', function () {
        // Переход на страницу профиля
        cy.get('.header__container > .header__id').click();

        // Ожидание появления элемента для перехода в магазин
        cy.get('[href="/shop"]').should('be.visible');

        // Переход на страницу магазина
        cy.get('[href="/shop"]').click();

        // Ожидание загрузки страницы магазина
        cy.get('.shop__list').should('be.visible');

        // Поиск всех доступных аватаров с классом available
        cy.get('.shop__list > .available').then(avatars => {
            const randomIndex = Math.floor(Math.random() * avatars.length);
            const selectedAvatar = avatars[randomIndex];

            // Клик по выбранному аватару
            cy.wrap(selectedAvatar).click({ force: true });

            // Найти и нажать на кнопку покупки, связанную с выбранным аватаром
            cy.wrap(selectedAvatar).closest('.shop__item').find('.shop__button').click({ force: true });
        });

        // Ввод данных карты
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996'); // Номер карты
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // CVV карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type('1225'); // Срок действия карты
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('NAME'); // Имя владельца карты

        // Нажатие на кнопку оплаты
        cy.get('.pay-btn').click();

        // Ввод кода подтверждения СМС
        cy.get('#cardnumber').type('56456');

        // Нажатие на кнопку отправки
        cy.get('#root > div > main.payment__main > form > div > div > button').click();

        // Проверка успешной покупки
        cy.contains('Покупка прошла успешно').should('be.visible');

        cy.get('.payment__adv').click();

    });
});
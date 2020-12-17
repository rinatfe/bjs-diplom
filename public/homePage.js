const exit = new LogoutButton()

exit.action = function() {
    ApiConnector.logout(response => { 
        if (response.success === true)   
            location.reload()
        }
    )
}
ApiConnector.current(item => {
    if(item.success === true)
        ProfileWidget.showProfile(item.data)
})

const board = new RatesBoard()
function getRateCurrencies() {
    ApiConnector.getStocks(response => {
        if(response.success === true) {
            board.clearTable()
            board.fillTable(response.data)
        }  
    })
}

setInterval(() => getRateCurrencies(), 5000)

const money = new MoneyManager()
money.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data)
            money.setMessage(true, 'Баланс успешно пополнен')
        }

        if(response.success === false)
            money.setMessage(false, 'Пополнить баланс не удалось')
    })
}

money.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data)
            money.setMessage(true, 'Конвертация прошла успешно')
        }

        if(response.success === false)
            money.setMessage(false, 'Конвертация выполнить не удалось')

    })
}

money.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data)
            money.setMessage(true, 'Перевод совершен успешно')
        }

        if(response.success === false)
            money.setMessage(false, 'Выполнить перевод не удалось')
    })
}

const widget = new FavoritesWidget()
ApiConnector.getFavorites(response => {
    if(response.success === true) {
        widget.clearTable()
        widget.fillTable(response.data)
        money.updateUsersList(response.data)
    }  
})

widget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success === true) {
            widget.clearTable()
            widget.fillTable(response.data)
            money.setMessage(true, 'Пользователь успешно добавлен')
        }
        
        if(response.success === false)
            money.setMessage(false, 'Добавить пользователя не удалось')    
    })
}

widget.removeUserCallback = function(id) {
    ApiConnector.removeUserFromFavorites(id, response => {
        if(response.success === true) {
            widget.clearTable()
            widget.fillTable(response.data)
            money.setMessage(true, 'Пользователь успешно удален')
        }

        if(response.success === false)
            money.setMessage(false, 'Пользователя удалить не удалось')    
    })
}

///
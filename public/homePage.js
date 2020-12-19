const exit = new LogoutButton()

exit.action = function() {
    ApiConnector.logout(response => { 
        if (response.success)   
            location.reload()
        }
    )
}
ApiConnector.current(item => {
    if(item.success)
        ProfileWidget.showProfile(item.data)
})

const board = new RatesBoard()
function getRateCurrencies() {
    ApiConnector.getStocks(response => {
        if(response.success) {
            board.clearTable()
            board.fillTable(response.data)
        }  
    })
}

getRateCurrencies()

setInterval(() => getRateCurrencies(), 5000)

const money = new MoneyManager()
money.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data)
            money.setMessage(response.success, 'Баланс успешно пополнен')
        } else {
            money.setMessage(response.success, response.error)
        }    
    })
}

money.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data)
            money.setMessage(response.success, 'Конвертация прошла успешно')
        } else {
            money.setMessage(response.success, response.error)
        }    
    })
}

money.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data)
            money.setMessage(response.success, 'Перевод выполнен успешно')
        } else {
            money.setMessage(response.success, response.error)
        }    
    })
}

const widget = new FavoritesWidget()
ApiConnector.getFavorites(response => {
    if(response.success) {
        widget.clearTable()
        widget.fillTable(response.data)
        money.updateUsersList(response.data)
    }  
})

widget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success) {
            widget.clearTable()
            widget.fillTable(response.data)
            money.setMessage(response.success, 'Пользователь успешно добавлен')
        } else {
            money.setMessage(response.success, response.error)
        }        
    })
}

widget.removeUserCallback = function(id) {
    ApiConnector.removeUserFromFavorites(id, response => {
        if(response.success) {
            widget.clearTable()
            widget.fillTable(response.data)
            money.setMessage(response.success, 'Пользователь успешно удален')
        } else {
            money.setMessage(response.success, response.error)
        }        
    })
}


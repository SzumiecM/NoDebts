document.addEventListener('DOMContentLoaded', () => {

    list_debtors()

    document.querySelector('#add_debtor').onsubmit = () => {
        name = document.querySelector('#debtor_name').value
        amount = document.querySelector('#dept_amount').value

        add_to_local_storage(name, amount)
    }

    document.querySelector('#clear_depts').addEventListener("click", clear_depts)

})

function add_to_local_storage(name, amount) {
    if (localStorage.getItem(name)) {
        let sum = +localStorage.getItem(name) + +amount
        localStorage.setItem(name, sum.toString())
    } else {
        localStorage.setItem(name, amount)
    }
}

function list_debtors() {
    for (let i=0; i < localStorage.length; i++){
        let name = localStorage.key(i)
        let amount = localStorage.getItem(name)

        debtor = document.createElement('li')
        debtor.innerHTML = `${name} payed ${amount} already`

        document.querySelector('#debtors').append(debtor)
    }
}

function clear_depts() {
    alert('dupa')
    localStorage.clear()
}
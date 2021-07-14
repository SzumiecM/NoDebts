document.addEventListener('DOMContentLoaded', () => {

    list_debtors()
    sort_debtors_alphabeticaly()

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
    total_spent = sum_values(localStorage)
    number_of_deptors = localStorage.length
    document.querySelector('#total_spent').innerHTML = `Total spent: ${total_spent}`

    for (let i=0; i < number_of_deptors; i++){
        let name = localStorage.key(i)
        let amount = localStorage.getItem(name)

        let dept = total_spent/number_of_deptors - amount

        debtor = document.createElement('li')
        debtor.innerHTML = `${name} payed ${amount} | owes ${dept.toFixed(2)}`

        document.querySelector('#debtors').append(debtor)
    }
}

function clear_depts() {
    localStorage.clear()
    location.reload()
}

function sort_debtors_alphabeticaly() {

}

const sum_values = obj => Object.values(obj).reduce((a, b) => +a + +b, 0);
document.addEventListener('DOMContentLoaded', () => {

    list_debtors()
    sort_debtors_alphabeticaly()

    document.querySelector('#add_debtor').onsubmit = () => {
        name = document.querySelector('#debtor_name').value
        amount = document.querySelector('#dept_amount').value

        add_to_local_storage(name, amount)
    }

    delete_deptor_buttons = document.querySelectorAll('.material-icons')

    for (let i = 0; i< delete_deptor_buttons.length; i++){
        delete_deptor_buttons[i].addEventListener('click', delete_deptor)
    }

    document.querySelector('#clear_depts').addEventListener('click', clear_depts)
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

    if (number_of_deptors) {
        document.querySelector('#titles').append(document.createElement('th'))
    }

    for (let i = 0; i < number_of_deptors; i++) {
        let name = localStorage.key(i)
        let amount = localStorage.getItem(name)

        let dept = total_spent / number_of_deptors - amount

        debtor = document.createElement('tr')

        debtor.append(create_column(name))
        debtor.append(create_column(amount))
        debtor.append(create_column(dept.toFixed(2), 1))

        delete_button = document.createElement('button')
        delete_button.setAttribute('class', 'material-icons')
        delete_button.setAttribute('id', name)
        delete_button.innerHTML = 'delete'
        debtor.append(delete_button)

        document.querySelector('#debtors').append(debtor)
    }
}

function create_column(element, value = null) {
    column = document.createElement('td')
    column.innerHTML = element

    if (value) {
        if (element > 0) {
            column.setAttribute('class', 'positive')
        } else if (element < 0) {
            column.setAttribute('class', 'negative')
        }
    }

    return column
}

function clear_depts() {
    localStorage.clear()
    location.reload()
}

function delete_deptor(e) {
    console.log(e.target.id)
    localStorage.removeItem(e.target.id)
    location.reload()
}

function sort_debtors_alphabeticaly() {

}

const sum_values = obj => Object.values(obj).reduce((a, b) => +a + +b, 0);
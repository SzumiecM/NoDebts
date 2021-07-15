document.addEventListener('DOMContentLoaded', () => {

    list_debtors()

    document.querySelector('#add_debtor').onsubmit = () => {
        name = document.querySelector('#debtor_name').value
        amount = document.querySelector('#dept_amount').value

        add_to_local_storage(name, amount)
    }

    delete_deptor_buttons = document.querySelectorAll('.material-icons')

    for (let i = 0; i < delete_deptor_buttons.length; i++) {
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

    if (number_of_deptors) {
        dept_per_person = total_spent / number_of_deptors
    } else {
        dept_per_person = 0
    }

    document.querySelector('#total_spent').innerHTML = `Total spent: ${total_spent} | ${dept_per_person.toFixed(2)} each`

    if (number_of_deptors) {
        document.querySelector('#titles').append(document.createElement('th'))
    }

    let deptors = []

    for (let i = 0; i < number_of_deptors; i++) {
        deptors.push(localStorage.key(i))
    }

    deptors.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    })

    for (let i = 0; i < number_of_deptors; i++) {
        let name = deptors[i]
        let amount = localStorage.getItem(name)

        let dept = total_spent / number_of_deptors - amount

        deptors[i] = [name, dept]

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
    if (localStorage.length) {
        list_transfers(deptors)
    }
}

function list_transfers(deptors) {
    while (true) {
        if (deptors.length === 1) {
            break
        }

        deptors.sort((a, b) => (a[1] > b[1] ? -1 : 1))

        for (let i = 0; i < deptors.length; i++) {
            console.log(`${deptors[i][0]} | ${deptors[i][1]}`)
        }

        if (deptors[0][1] <= Math.abs(deptors[deptors.length - 1][1])) {
            a = document.createElement('li')
            a.innerHTML = `${deptors[0][0]} -- ${deptors[0][1].toFixed(2)} --> ${deptors[deptors.length - 1][0]}`
            document.querySelector('#transfers').append(a)

            deptors[deptors.length - 1][1] += deptors[0][1]
            deptors.shift()
        } else {
            console.log('else')
            a = document.createElement('li')
            a.innerHTML = `${deptors[0][0]} -- ${Math.abs(deptors[deptors.length - 1][1]).toFixed(2)} --> ${deptors[deptors.length - 1][0]}`
            document.querySelector('#transfers').append(a)

            deptors[0][1] += deptors[deptors.length - 1][1]
            deptors.pop()
        }
        console.log('PASSED')
    }
    console.log('finished')
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

const sum_values = obj => Object.values(obj).reduce((a, b) => +a + +b, 0);
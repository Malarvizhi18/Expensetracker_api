const expense = document.getElementById('category')
const amount = document.getElementById('amount')
const date = document.getElementById('date')

const add = document.getElementById('add')
add.addEventListener('click',async function(){
    const respobj = await fetch('/add-entry',{
        method : "POST",// surely need to say to server about method for POst
        body : JSON.stringify({//json.stringify change to json
            "Expense" : expense.value,
            "Amount" : amount.value,
            "Date": date.value
        }),
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        }
    })
    const data = await respobj.json()
    console.log(data)
    })
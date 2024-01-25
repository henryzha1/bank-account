function Account(name, deposit) {
    this.name = name;
    this.balance = deposit;
}



function handleRegistration(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const deposit = parseInt(document.getElementById("initialDeposit").value);
    
    let account = new Account;
    if(name && deposit >= 10) {
        account.name = name;
        account.balance = deposit;

        document.querySelector("div#balance>h2").append(account.name);
        document.getElementById("current").innerText = account.balance;
        const li = document.createElement("li");
        li.append("Initial Deposit: $" + account.balance);
        document.getElementById("transactions").append(li);
        document.getElementById("balance").removeAttribute("class");
        
        document.getElementById("name").value = null;
        document.getElementById("initialDeposit").value = null;
        e.target.lastElementChild.disabled = true;

        document.querySelector("div#update>form").addEventListener("submit", (e) => handleUpdate(e, account));
    } else {
        document.getElementById("error1").removeAttribute("class");
        document.getElementById("name").value = null;
        document.getElementById("initialDeposit").value = null;
        e.target.lastElementChild.disabled = true;
    }
}

function handleUpdate(e, account) {
    e.preventDefault();

    document.getElementById("error2").setAttribute("class", "hidden");
    document.getElementById("error3").setAttribute("class", "hidden");

    const deposit = parseInt(document.getElementById("deposit").value);
    const withdraw = parseInt(document.getElementById("withdraw").value);

    updateBalance(deposit, withdraw, account);
}

function updateBalance(deposit, withdraw, account) {
    const li = document.createElement("li");
    if(deposit && !withdraw) {
        account.balance += deposit;
        document.getElementById("current").innerText = account.balance;
        li.append("Deposited $" + deposit + ". New Balance: $" + account.balance);
        document.getElementById("transactions").prepend(li);
    } else if(!deposit && withdraw) {
        if(checkBalance(withdraw, account)) {
            account.balance -= withdraw;
            document.getElementById("current").innerText = account.balance;
            li.append("Withdrew $" + withdraw + ". New Balance: $" + account.balance);
            document.getElementById("transactions").prepend(li);
        } else {
            document.getElementById("error3").removeAttribute("class");
        }
    } else if(deposit && withdraw) {
        if(checkBalance(withdraw, account, deposit)) {
            account.balance += deposit;
            account.balance -= withdraw;
            document.getElementById("current").innerText = account.balance;
            li.append("Deposited $" + deposit + ". Withdrew $" + withdraw + ". New Balance: $" + account.balance);
            document.getElementById("transactions").prepend(li);
        } else {
            document.getElementById("error3").removeAttribute("class");
        }
    } else {
        document.getElementById("error2").removeAttribute("class");
    }
}

function checkBalance(withdraw, account, deposit = 0) {
    if(account.balance - withdraw + deposit < -10) {
        return false;
    } 
    return true;
}

window.addEventListener("load", function() {
    document.querySelector("div#register>form").addEventListener("submit", handleRegistration);


});
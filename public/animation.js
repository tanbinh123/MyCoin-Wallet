document.addEventListener("DOMContentLoaded", function(){
    
    // 
    const sendcoin = document.getElementsByClassName('btnsendcoid')[0];
    var sendcoinform = document.getElementsByClassName('card-send-coin')[0];
    const exitsendcoin = document.getElementsByClassName('exitsendcoin')[0];

    const btnview = document.getElementsByClassName('btnview')[0];
    var cardview = document.getElementsByClassName('card-view')[0];
    const iconexit = document.getElementsByClassName('iconexit')[0];

    const btncreatewallet = document.getElementsByClassName('btncreatewallet')[0];
    const btnchangewallet = document.getElementsByClassName('btnchangewallet')[0];
    const btnformcreatewallet = document.getElementsByClassName('btnformcreatewallet')[0];

    var cardcreatewallet = document.getElementsByClassName('cardcreatewallet')[0];
    var cardchangewallet = document.getElementsByClassName('cardchangewallet')[0];

    var formcreatewallet = document.getElementsByClassName('formcreatewallet')[0];
    formcreatewallet.onclick = () =>{
        formcreatewallet.reset();
    }



     // button click send coin
    sendcoin.onclick = () =>{
    	sendcoinform.classList.toggle('xuathien');
        cardview.classList.remove('xuathien');
        cardchangewallet.classList.remove('xuathien');
        cardcreatewallet.classList.remove('xuathien');
        formcreatewallet.reset();
        document.getElementById('formsendcoin').reset();
        document.getElementsByClassName('txtinvalid')[0].classList.remove('xuathientxtinvalid');
    }
    exitsendcoin.onclick = () =>{
        sendcoinform.classList.remove('xuathien');
        formcreatewallet.reset();
        document.getElementById('formsendcoin').reset();
    }



    // button click view statistical

    btnview.onclick = () =>{
    	cardview.classList.toggle('xuathien');
        sendcoinform.classList.remove('xuathien');
        cardchangewallet.classList.remove('xuathien');
        cardcreatewallet.classList.remove('xuathien');
        formcreatewallet.reset();
        document.getElementById('formsendcoin').reset();
    }
    iconexit.onclick = () =>{
    	cardview.classList.remove('xuathien');
    }

    
    
    btncreatewallet.onclick = () =>{
    	cardcreatewallet.classList.toggle('xuathien');
        cardchangewallet.classList.remove('xuathien');
        cardview.classList.remove('xuathien');
        sendcoinform.classList.remove('xuathien');
        document.getElementById('formsendcoin').reset();
    }

    btnchangewallet.onclick = () =>{
    	cardchangewallet.classList.toggle('xuathien');
        cardcreatewallet.classList.remove('xuathien');
        cardview.classList.remove('xuathien');
        sendcoinform.classList.remove('xuathien');
        formcreatewallet.reset();
        document.getElementById('formsendcoin').reset();
    }

    btnformcreatewallet.onclick = () =>{
        cardcreatewallet.classList.remove('xuathien');
    }

    
})
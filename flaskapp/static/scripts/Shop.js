$(document).ready(function () {
   
    let click = false
    window.addToCart = function(bookId, bookName){
        click = true;
        console.log(bookName);
        fetch("/addToCart/"+bookId,{ method: 'POST'}).then(()=>{
            click = false;
            let notif;
            if ($(".notification").length === 0)
            {
                notif = notify(bookName + " is added to your cart");
            }
            else{
                $(".notification").remove();
                notify(bookName + " is added to your cart");
            }
        })
    }
    window.navigateToBook = function(bookId){
        if (!click){ 
            window.location.href = "/book/"+bookId;
        }
    }
});

function notify(text){
    let notif = $("<div>").addClass("notification");
    notif.text(text)
    $("body").append(notif);
    setTimeout(function(){
        notif.remove();
    }, 3000)
    return notif;
}
/*function addToCart(bookId){
    fetch("/addToCart/"+bookId,{ method: 'POST'})
}
function navigateToBook(bookId){
}*/
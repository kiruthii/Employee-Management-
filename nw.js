const books = [
    { id: 1, title: 'Book A', price: 300, stock: 5 },
    { id: 2, title: 'Book B', price: 150, stock: 3 },
    { id: 3, title: 'Book C', price: 600, stock: 4 },
    { id: 2, title: 'Book B', price: 150, stock: 3 }, // Duplicate
    
];

const customers = [
    { id: 101, name: 'John Doe', isExistingCustomer: true, lastPurchase: null },
    { id: 102, name: 'Jane Smith', isExistingCustomer: false, lastPurchase: null },
];

const customerChosenBookId=[1,2];
const customerId=101;

function removeDuplicate(){
    const uniqueBookList=[];
    const rBook=new Set();
    for(const bk of books){
        
        if(!rBook.has(bk.id)){
            rBook.add(bk.id);
            uniqueBookList.push(bk);
        }
        
    }
    return uniqueBookList;
    
    
}

function filterCustomerChosenBooks(uniBookList){
    return uniBookList.filter(book =>customerChosenBookId.includes(book.id));
}

function generateBill(){
    const uniBookList=removeDuplicate();
    const bookStorage = uniBookList.map(book => ({ ...book }));  //here uniBookList is copied to bookStorage,so if any changes made in uniBookList doesnot reflect in bookStorage.
    console.log("Unique Books in the book store after removing duplicates \n");
    console.log(uniBookList);
    const custChosenBook=filterCustomerChosenBooks(uniBookList);
    
    calculateDiscount(custChosenBook);
    updateStock(bookStorage,custChosenBook);
   

}

generateBill();


function calculateDiscount(custChosenBook){
    //check
    const currentCustomer=customers.find(customer=>customer.id === customerId);
    console.log("Current customer \n");
    console.log(currentCustomer);
    let isExisting=currentCustomer? true:false;
    let totalPrice=0;
    let totalDiscount=0;

    for(let book of custChosenBook){
        if(isExisting){
            if(book.price >200){
                book.discount=book.price *(15/100);
            }
            else{
                book.discount=0;
            }
        }else{
            switch(book.price){
                case (book.price>=100 && book.price<200):
                    book.discount=book.price*2/100;
                    break;

                case (book.price>=200 && book.price<500):
                        book.discount=book.price*5/100;
                        break;
                case (book.price>=500 && book.price<750):
                        book.discount=book.price*10/100;
                        break;

                case (book.price>=750):
                            book.discount=book.price*15/100;
                            break;
                default:
                    book.discount=0;
                    break;
                    
            }
        }
        
        book.price=book.price-book.discount;
        totalPrice+=book.price;
        totalDiscount+=book.discount;
       
          

    }
    console.log("Customer choosen books \n");
    console.log(custChosenBook);
    console.log("Total Discount :"+ totalDiscount);
    console.log("Total Price :" + totalPrice);
    updateCustDet(currentCustomer,totalPrice,custChosenBook);
    
    

}


function updateCustDet(currentCustomer,totalPrice,_custChosenBook){
    if(!currentCustomer){
        console.log("Not existing customer !!!");
    }
    const lastPurchaseDetails={
        date:"xyzxyz",
        booksPurchased:_custChosenBook.map(book => ({
            id: book.id,
            title: book.title,
            price: book.price
        })),
        totalAmount:totalPrice
    }
    currentCustomer.lastPurchase = lastPurchaseDetails;
    console.log("Customer Details are successfully updated!!!");
    console.log(currentCustomer);
    
}


function updateStock(_bookStorage,custChosenBook){

    for(let uB of _bookStorage){
        const updatedCustomerDetails=custChosenBook.find(bk=>bk.id===uB.id);
        if(updatedCustomerDetails){
            uB.stock-=1;
        }
    }
    console.log("Stocks Updated Successfully! \n");
    console.log(_bookStorage);
}





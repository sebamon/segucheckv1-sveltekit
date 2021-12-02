type checkItem = {
    checkItem_id    : number,
    item            : string,
    description     : string,
    categories      : checkcategory[],
}//Listo model checkitem

type checkcategory = {
    category_id        : number,
    categoryName       : string,
    checkItems         : checkItem[]
}//Listo model checkcategory

type verifyItem = {
    verifyItem_id : number
    checkItem : checkItem,
    checked   : boolean,
    observation : string,
}//Listo model verifyItem

type verify = {
    verify_id       : number,
    list       : verifyItem[] 
}

type checkList = {
    checkList_id    : number,
    checkListName   : string
    verify          : verify
}

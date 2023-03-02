export const convertNumberToMoney=(number)=>{
    const format = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `${format} vnđ`
}
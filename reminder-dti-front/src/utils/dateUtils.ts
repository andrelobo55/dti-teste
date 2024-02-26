// function that creates a current date of type Date and formats it (year, month and day) without the time, returning it as a string.
export function currentDayFormated():string{
    const currentDate = new Date()
    const fromatedDate = currentDate.toISOString().split('T')[0]

    return fromatedDate
}

// function that receives the current date as a string, formats it to the standard (day, month and year) and returns it as a string.
export function dateFormated(date : string):string{
    const rDate = new Date(date);
    return rDate.toLocaleDateString('pt-BR', {year:'numeric', month:'2-digit', day:'2-digit'});
}
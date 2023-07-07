
export const formatDate = (date: any):string => {
    return `${date['$y']}.${date['$M']}.${date['$D']}`
}
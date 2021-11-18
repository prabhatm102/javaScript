function dateDiff(date1,date2){
    let day = (date1.getFullYear()-date2.getFullYear())*365;
    day+=(date1.getMonth()-date2.getMonth())*30;
    day+=(date1.getDate()-date2.getDate());
    return day;
}

module.exports.dateDiff = dateDiff;
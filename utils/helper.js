const toLocalDateString = (date, formatType) => {
    formatType = formatType ? formatType : "YYYY-MM-DD";
    date = new Date(date);
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    let result = "";
    switch (formatType) {
        case "YYYY-MM-DD": {
            result = year + '-' + month + '-' + day;
            break;
        }
        case "DD/MM/YYYY": {
            result = day + '/' + month + '/' + year;
            break;
        }
    }
    return result;
}

module.exports = {
    toLocalDateString,
}
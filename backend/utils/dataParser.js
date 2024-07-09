const dataParserForItems = (items) => {
    let curr = new Date().getTime();
    let prev = new Date();
    prev.setMonth(prev.getMonth() - 1);
    prev = prev.getTime();

    let newItems = items.filter(item => {
        let itDate = new Date(item.date);
        return (itDate.getTime() >= prev && itDate <= curr);
    });

    let parsedData = [];
    let total = 0;

    function getDate(itemDate) {
        let dater = new Date(Date.parse(itemDate));
        let date = dater.toString().substring(8, 10) + " " + dater.toString().substring(4, 7);
        return date;
    }

    newItems.forEach((item, index) => {
        let curr = {
            sno: index + 1,
            date: getDate(item.date),
            amount: item.amount,
            category: item.category,
        };
        total += curr.amount;
        parsedData.push(Object.values(curr));
    });

    return { body: parsedData, total };
};

module.exports = dataParserForItems;

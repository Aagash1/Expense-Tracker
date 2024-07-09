let total = new Map();
let expenseArr = [];

export const sortCategoryWise = (expdata, categories) => {
    for (let item of categories) {
        total.set(item, 0);
    }
    for (let item of expdata) {
        let tmp = total.get(item.category);
        total.set(item.category, tmp + item.amount);
    }
    let arr = Array.from(total.values());
    expenseArr = arr;
    return arr;
};

export const getTotal = () => {
    let totalSum = 0;
    for (const item of expenseArr) {
        totalSum += item;
    }
    return totalSum;
};



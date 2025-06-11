// 5. Есть массив в котором лежат объекты с датами, отсортировать по датам.
//     var arr = [{date: '10.01.2017'}, {date: '05.11.2016'}, {date: '21.13.2002'}];
// Напишите функцию, которая вернет, отсортированный массив.

function sortDates(arr) {
    return arr.sort(function(a, b) {
        const parseDate = (str) => {
            const [day, month, year] = str.split('.');
            if (month < 1 || month > 12 || day < 1 || day > 31) {
                return new Date(0);
            }
            return new Date(year, month - 1, day);
        };

        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);

        return dateA - dateB;
    });
}

var arr = [
    { date: '05.11.2016' },
    { date: '10.01.2017' },
    { date: '21.13.2002' }
    // { date: '21.13.2004' },
];

console.log(sortDates(arr));


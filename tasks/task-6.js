// 6. Есть несколько слов, определить состоят ли они из одних и тех же букв('кот', 'ток', 'окт')
//
// var arr = ['kot', 'tok', 'okt'], arr1 = ['kot', 'tok', 'ott'];
// function sameWords(arr) {
// ...
// }

// решила сделать более универсальным, добавила игнорирование регистра

function sameWords(arr) {
    const normalize = word => word.toLowerCase().split('').sort().join('');

    const base = normalize(arr[0]);

    for (let i = 1; i < arr.length; i++) {
        if (normalize(arr[i]) !== base) {
            return false;
        }
    }

    return true;
}

const arr1 = ['kot', 'tok', 'okt'];
const arr2 = ['kot', 'tok', 'ott'];

console.log(sameWords(arr1));
console.log(sameWords(arr2));


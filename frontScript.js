const { getPackedSettings } = require("http2");
const { stringify } = require("querystring");
const { text } = require("stream/consumers");

// 1. Функция для проверки является ли слово анаграммой
function isAnagram(s1, s2) {
    return s1.split('').sort().join('') === s2.split('').sort().join('');
}

// 2. Функция возвращает первый элемент массива

// этот вариант будет мутировать исходный массив, нужно переделать, чтобы просто возвращал первый элемент, достаточно
// просто вернуть элемент с 0 индексом, так же добавила случай пустого массива
// function getFirstElement(array) {
//     return array.shift();
// }

function getFirstElement(array) {
    return array.length > 0 ? array[0] : undefined;
}

// 3. True or False

// == — это нестрогое сравнение(с приведением типов)
// === — это строгое сравнение (тип и значение должны совпадать)
// 1) [] == 0, [] — пустой массив -> 0, поэтому [] == 0 ->true (т.к. по сти 0 == 0 -> true).
// неявное преобразование из строки в число. Строка '0' -> 0. Поэтому 0 == '0' возвращает true
// В итоге левая часть true, правая true, true === true -> true
// 2) [] == 0 возвращает true (это как в предыдущем примере
// [] == '0': Пустой массив [] опять преобразуется в пустую строку "", и затем сравнивается со строкой '0',
// этом случае "" не равно '0', поэтому ([] == '0') возвращает false
// В итоге true === false -> false
// 3) Здесь мы уже знаем что правая часть -> false, левую часть мы уже находили (правая часть в 1 примере), она равна true
// Таким образом true === false

([] == 0) === (0 == '0'); // (1)   -> true
([] == 0) === ([] == '0'); // (2)   -> false
(0 == '0') === ([] == '0'); // (3) -> false

//4. RegExp or not

// 1) Поскольку пустой объект не является строкой,RegExp будет приводить его к строке. При преобразовании объекта к
// строке будет [object Object]/. далее у нас есть квадратные скобки, которые в регулярном выражении будут значить набор символов
// то есть будет совпадение если на проверке будет слово из наборра следующих символов: 'o', 'b', 'j', 'e', 'c', 't', 'O',
// или ' ' (неуникальные символы просто как бы убираем). В первом случае у нас 'n' 'u' 'l' 'l', ли одного совпадения, получается
// test вернет нам = false
// 2) /\\[object Object\\]/.test("undefined"). Аналогично, 'u' 'n' 'd' 'e' 'f' 'i' 'n' 'e' 'd' -> true, т.к. совпадение
// есть = 'e'

new RegExp({}).test('null'); // (1) false
new RegExp({}).test('undefined'); // (2) true

//5. Classes
// 1) убрала ненужный пробел
// 2) static apiUrl: string; это уже что-т похожее на TypeScript )), убрала string, в JS для задания переменной как строки
// достаточно указать static apiUrl = ''
// 3) В конструкторе apiUrl = apiUrl — не присваивается к this.apiUrl. исправила на this.apiUrl для задания значения экземпляра
// 4) Опечатка в шаблонной строке console.log(User Name: ${user.name});

class UserService { // (1)
    static apiUrl = ''; // (2)

    constructor (apiUrl) { // (2)
        this.apiUrl = apiUrl;
    }

    async fetchUser() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('HTTP error');
            }

            const userdata = await response.json(); // исправила на userdata
            this.printUserName(userdata);
            return userdata;
        } catch (error) {
            throw new Error('Failed to fetch user');
        }
    }

    printUserName(user) {
        console.log(`User Name: ${user.name}`); // (4)
    }
}


// 6. function for request

// В данном задании были нарушены правила области видимости и порядка выполнения + переменная userdata не определена +
// неверный синтаксис функции- function (serviceName, userName, text, callback)sendStatics {}
// так же неверная URL-конкатенация + getPackedSettings.isStatisticsAllowed — не определён, и последнее - это то что callback не вызывался

let userName = '';
const userService = new UserService('https://api.example.com/users/1');

async function sendStatics(serviceName, userName, text, callback) {
    const url = `http://example.com?service=${serviceName}&user=${userName}&text=${text}`;

    if (!window.isStatisticsAllowed) {
        return;
    }

    try {
        const response = await fetch(url);
        if (response.ok) {
            console.log('success');
            if (callback) callback();
        }
    } catch (error) {
        console.error('Request failed', error);
    }
}

userService.fetchUser().then(userData => {
    userName = userData.name;
    sendStatics('UserService', userName, 'some text', () => {
        console.log('Callback executed');
    });
});


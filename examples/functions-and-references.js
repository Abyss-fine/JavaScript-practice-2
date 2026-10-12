
console.log("Эксперимент 1. Числа и строки");

function sum(a, b) {
  return a + b;
}

console.log(sum(2, 3), typeof sum(2, 3));
console.log(sum("2", 3), typeof sum("2", 3));

console.log("\nЭксперимент 2. Возврат значения");

const square = (value) => {
  return value * value;
};

console.log("square(4):", square(4));

console.log("\nЭксперимент 3. Ссылки на объект");

const original = { title: "Черновик", published: false };
const alias = original;
alias.published = true;

console.log("original.published:", original.published);
console.log("Один объект:", original === alias);

console.log("\nЭксперимент 4. Копирование массива");

const tasks = [{ id: 1, title: "Задача" }];
const copiedTasks = [...tasks];

copiedTasks.push({ id: 2, title: "Новая задача" });

console.log("Длина исходного массива:", tasks.length);
console.log("Длина копии:", copiedTasks.length);
console.log("Один и тот же первый объект:", tasks[0] === copiedTasks[0]);

console.log("\nЭксперимент 5. Spread объекта");

const oldBook = { id: 12, title: "Черновик", available: false };
const newBook = { ...oldBook, available: true };

console.log("Старый объект:", oldBook);
console.log("Новый объект:", newBook);

console.log("\nЭксперимент 6. Параметр по умолчанию");

function makeCaption(text = "Без названия") {
  return text;
}

console.log("Без аргумента:", makeCaption());
console.log("undefined:", makeCaption(undefined));
console.log("null:", makeCaption(null));
console.log("Пустая строка:", makeCaption(""));

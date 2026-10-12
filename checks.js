
import assert from "node:assert/strict";

import { demoTasks, variantTasks } from "./src/data.js";

import {
  createTask,
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
  searchTasksByTitle,
} from "./src/task-service.js";

// Создание задач
assert.equal(createTask(50, "Новая задача").ok, true);
assert.equal(createTask(0, "Новая задача").ok, false);
assert.equal(createTask(51, "   ").ok, false);

// Поиск задачи по ID
assert.equal(findTaskById(demoTasks, 4).title, "Подготовить модель задач");
assert.equal(findTaskById(demoTasks, 999), undefined);

// Получение невыполненных задач
assert.deepEqual(
  getPendingTasks(demoTasks).map((task) => task.id),
  [4, 7]
);
assert.deepEqual(getPendingTasks([]), []);

// Получение названий задач
assert.deepEqual(getTaskTitles(demoTasks), [
  "Изучить функции",
  "Подготовить модель задач",
  "Проверить методы массивов",
  "Оформить README",
]);

// Расчёт статистики
assert.deepEqual(getTaskStats(demoTasks), {
  total: 4,
  completed: 2,
  pending: 2,
  progress: 50,
});

// Добавление задачи
const added = addTask(demoTasks, 50, "Новая задача", "high");
assert.equal(added.ok, true);
assert.equal(added.tasks.length, 5);
assert.equal(demoTasks.length, 4);
assert.equal(addTask(demoTasks, 1, "Дубликат").ok, false);

// Изменение статуса
const changed = setTaskCompleted(demoTasks, 4, true);
assert.equal(changed.ok, true);
assert.equal(changed.tasks.find((task) => task.id === 4).completed, true);
assert.equal(demoTasks.find((task) => task.id === 4).completed, false);

assert.equal(setTaskCompleted(demoTasks, 777, true).ok, false);
assert.equal(setTaskCompleted(demoTasks, 4, "true").ok, false);

// Переименование задачи
const renamed = renameTask(demoTasks, 4, "Новое название");
assert.equal(renamed.ok, true);
assert.equal(
  renamed.tasks.find((task) => task.id === 4).title,
  "Новое название"
);
assert.equal(
  demoTasks.find((task) => task.id === 4).title,
  "Подготовить модель задач"
);

// Удаление задачи
const removed = removeTask(demoTasks, 7);
assert.equal(removed.ok, true);
assert.deepEqual(
  removed.tasks.map((task) => task.id),
  [1, 4, 10]
);
assert.equal(demoTasks.length, 4);
assert.equal(removeTask(demoTasks, 777).ok, false);

// Индивидуальный вариант
assert.equal(variantTasks.length, 6);

// Дополнительное задание: поиск по названию
const searchResults = searchTasksByTitle(demoTasks, " ФУНК ");
assert.deepEqual(searchResults.map((task) => task.id), [1]);

assert.deepEqual(
  searchTasksByTitle(demoTasks, "несуществующий фрагмент"),
  []
);

assert.equal(searchTasksByTitle(demoTasks, " ").length, 4);

assert.notEqual(searchTasksByTitle(demoTasks, "Функции"), demoTasks);
assert.equal(demoTasks.length, 4);

console.log("Все проверки пройдены успешно!");
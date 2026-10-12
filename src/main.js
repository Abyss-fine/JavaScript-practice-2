
import { demoTasks, variantTasks } from "./data.js";

import {
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

function showTasks(title, tasks) {
  console.log(`\n${title}`);
  console.table(tasks);
}

function showStats(title, tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);

  console.log(`\n${title}`);
  console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);

  if (total === 0) {
    console.log("Задач пока нет");
  } else {
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
  }
}

console.log("========== ОБЩИЙ СЦЕНАРИЙ ==========");

let currentTasks = demoTasks;

showTasks("Исходные задачи", currentTasks);
console.log("Названия:", getTaskTitles(currentTasks));
console.log("Невыполненные:", getPendingTasks(currentTasks));
showStats("Начальная сводка", currentTasks);

let result = addTask(currentTasks, 20, "Добавить проверку", "high");
if (result.ok) {
  currentTasks = result.tasks;
}
showStats("После добавления задачи 20", currentTasks);

result = setTaskCompleted(currentTasks, 4, true);
if (result.ok) {
  currentTasks = result.tasks;
}
showStats("После выполнения задачи 4", currentTasks);

result = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
if (result.ok) {
  currentTasks = result.tasks;
}
showStats("После переименования задачи 10", currentTasks);

result = removeTask(currentTasks, 7);
if (result.ok) {
  currentTasks = result.tasks;
}
showTasks("Итоговые задачи", currentTasks);
showStats("Итоговая сводка", currentTasks);

const rejected = addTask(currentTasks, 20, "Повторная задача", "high");
console.log("\nОтказ при повторном добавлении:", rejected);

showTasks("Исходный demoTasks не изменился", demoTasks);

console.log("\nПоиск задачи 4:", findTaskById(demoTasks, 4));
console.log("Задачи без выполнения:", getPendingTasks(demoTasks));

console.log("\n========== ИНДИВИДУАЛЬНЫЙ ВАРИАНТ ==========");

let variantCurrent = variantTasks;

showTasks("Исходные задачи варианта", variantCurrent);
showStats("Начальная сводка варианта", variantCurrent);

let variantResult = addTask(
  variantCurrent,
  80,
  "Подготовить раздаточные материалы",
  "high"
);

if (variantResult.ok) {
  variantCurrent = variantResult.tasks;
}

variantResult = setTaskCompleted(variantCurrent, 11, true);
if (variantResult.ok) {
  variantCurrent = variantResult.tasks;
}

variantResult = renameTask(
  variantCurrent,
  23,
  "Завершить подготовку материалов"
);
if (variantResult.ok) {
  variantCurrent = variantResult.tasks;
}

variantResult = removeTask(variantCurrent, 37);
if (variantResult.ok) {
  variantCurrent = variantResult.tasks;
}

const duplicateResult = addTask(
  variantCurrent,
  80,
  "Повторное добавление",
  "high"
);

console.log("Отказ при повторном добавлении ID 80:", duplicateResult);
showTasks("Итоговые задачи варианта", variantCurrent);
showStats("Итоговая сводка варианта", variantCurrent);

showTasks("Исходный variantTasks не изменился", variantTasks);

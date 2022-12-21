[![Maintainability](https://api.codeclimate.com/v1/badges/8624ad4e6fdf199f1166/maintainability)](https://codeclimate.com/github/Vetrash/ToDoList/maintainability)<br>
# ToDoList.OK
Приложение состоит из двух основных компонентов:
1)  Вертикальный список с заметок;
2)  Область взаимодействия c заметкой.
В десктопной версии шириной блоков можно управлять, потянув за край блока, когда появится символ с стрелками.

Каждая заметка хранит в себе:
1) Наименование задачи (обязательно к заполнению)
2) Описание задачи
3) Статус задачи (обязательный к заполнению)
4) Дата дедлайна
5) Набор прикрепленных файлов

*Задачи можно добавлять, удалять и редактировать.<br>
*Длинные наименования обрезаются троеточием.<br>
*Добавлена цветовая индикация в зависимости от статуса задачи.<br>
*Также можно найти интересующую заметку по имени, приложение выдаст порядковый номер задачи и обрамит её рамкой.<br>
*К задачам можно прикрепить не более 10 файлов.<br>
*Реализована регистрация и авторизация. Файлы пользователей разделены на сервере по папкам.<br>
*Реализована проверка статуса задачи от даты дедлайна.<br>
*Реализована фильтрация задач по статусу.<br>
*Реализован адаптив приложения до ширины экрана 320px.<br>

Стек: react, mobx, typescript, FireBase
Стили: sass.

Развернутый проект на Vercel доступен по следующим ссылкам:<br>
https://to-do-list-vetrash.vercel.app/login<br>
https://to-do-list-git-master-vetrash.vercel.app/login<br>
https://to-do-list-ten-omega.vercel.app/login<br>

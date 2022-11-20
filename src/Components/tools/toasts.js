import { toast } from 'react-toastify';

export const toastOverfloy = () => toast.error('К задаче можно прикрепить не болеее 10 файлов');
export const toastAddToDo = () => toast.success('Новая задача создана');
export const toastDeleteToDo = () => toast.success('Задача удалена');
export const toastRedacted = () => toast.success('Данные задачи успешно отредактированы');
export const toastNotRedacted = () => toast.error('Проверте данные ввода');
export const toastOverdue = () => toast.warning('Задача помечена как просроченая, проверте дедлайн');
export const toastLoadedEarlier = (name) => toast.warning(`файл с именем ${name} уже есть в списке загруженных`);
export const toastDeleteFile = () => toast.success('Файл удален');
export const toastUpload = (num) => toast.success(`успешно загруженно ${num} файл(а,ов)`);
export const toastNotDelete = () => toast.warning('Нельзя удалить редактируемый объект');
export const toastNotFound = () => toast.info('Задачи с таким именем нет в списке. Пора её создать!');
export const toastFound = () => toast.info('Задача найдена и выделена рамкой');

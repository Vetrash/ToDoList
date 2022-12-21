import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import TodoState from '../../../../store/mobx/TodoState';
import TrigerUIState from '../../../../store/mobx/TrigerUIState';
import { nameSchema } from '../../../../Components/validate';
import safeTodo, { modeList } from './components/safeTodo';

const ToDoRedactor = observer(() => {
  const formik = useFormik({
    initialValues: {
      topic: '',
      topicDublicate: '',
      description: '',
      deadline: '',
      status: 'waiting',
    },
    onSubmit: () => {
      console.log('send');
    },
    validationSchema: nameSchema(TodoState.todoTopics),
  });

  useEffect(() => {
    if (TodoState.redactedItemId !== null) {
      const id = TodoState.redactedItemId;
      const { topic } = TodoState.todoItems[id];
      formik.setValues({ ...TodoState.todoItems[id], topicDublicate: topic });
    }
  }, [TodoState.redactedItemId]);
  useEffect(() => {
    formik.setFieldValue('topicDublicate', formik.values.topic);
  }, [formik.values.topic]);
  useEffect(() => {
    formik.setFieldValue('topic', '', true);
  }, []);

  const shovedFileMenu = () => { TrigerUIState.switchShowedFileMenu(true); };

  const closerRedactor = () => { TrigerUIState.switchShowedRedactor(false); };

  const isMobailRedactor = TrigerUIState.isShovedRedactor && TrigerUIState.isStyleMobail;

  return (
    <>
      <div className={cn('redactorToDO__back', { elem_show: isMobailRedactor })} />
      <form className={cn('redactorToDO', { elem_activ: TrigerUIState.isShovedRedactor })}>
        <button
          className={cn('btn__cross', 'btn__cross_in mobileElement', { elem_show: isMobailRedactor })}
          onClick={closerRedactor}
          type="button"
          aria-label="close"
        />
        <div className="redactorConteiner">
          <p>Название задачи </p>
          <input type="text" name="topic" onChange={formik.handleChange} value={formik.values.topic} />
          <p>Описание задачи</p>
          <textarea name="description" onChange={formik.handleChange} value={formik.values.description} />
          <button type="button" className="btn" onClick={shovedFileMenu}>
            Работа с файлами
          </button>
          <div className="flexConteiner">
            <div className="flexConteiner__item">
              <p>Статус задачи</p>
              <select name="status" onChange={formik.handleChange} value={formik.values.status}>
                <option value="waiting">ожидает</option>
                <option value="inProcess">в процессе</option>
                <option value="done">выполнена</option>
                <option value="undone">просрочена</option>
              </select>
            </div>
            <div className="flexConteiner__item">
              <p>Дедлайн</p>
              <input
                className="input__date"
                type="date"
                name="deadline"
                onChange={formik.handleChange}
                value={formik.values.deadline}
              />
            </div>
          </div>
          <div className="alertlog">
            {formik.errors.topic}
            {formik.errors.deadline}
          </div>
          <div className="flexConteiner">
            <div className={cn('flexConteiner__item', { hide: TodoState.redactedItemId === null })}>
              <button type="button" className={cn('btn', 'btn_BlockHeight')} onClick={() => safeTodo(formik, modeList.redactItem)}>
                Сохранить изменения
              </button>
            </div>
            <div className="flexConteiner__item">
              <button type="button" className="btn btn_BlockHeight" onClick={() => safeTodo(formik, modeList.newItem)}>
                Сохранить новую задачу
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
});

export default ToDoRedactor;

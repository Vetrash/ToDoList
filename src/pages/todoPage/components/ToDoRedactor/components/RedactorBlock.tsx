import React from 'react';
import { FormikProps } from 'formik';
import cn from 'classnames';
import safeTodo, { modeList } from './safeTodo';
import type { FormValues } from './ToDoRedactorTypes';
import TodoState from '../../../../../store/mobx/TodoState';
import TrigerUIState from '../../../../../store/mobx/TrigerUIState';

const buttonBlock = (formik: FormikProps<FormValues>) => (
  <div className="flexConteiner">
    <div className={cn('flexConteiner__item', { hide: TodoState.redactedItemId === null })}>
      <button
        type="button"
        className={cn('btn', 'btn_BlockHeight')}
        onClick={() => safeTodo(formik, modeList.redactItem)}
      >
        Сохранить изменения
      </button>
    </div>
    <div className="flexConteiner__item">
      <button type="button" className="btn btn_BlockHeight" onClick={() => safeTodo(formik, modeList.newItem)}>
        Сохранить новую задачу
      </button>
    </div>
  </div>
);

const statusAndDeadLineBlock = (formik: FormikProps<FormValues>) => (
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
);

const shovedFileMenu = () => { TrigerUIState.switchShowedFileMenu(true); };

const redactorConteinerBlock = (formik: FormikProps<FormValues>) => (
  <div className="redactorConteiner">
    <p>Название задачи </p>
    <input type="text" name="topic" onChange={formik.handleChange} value={formik.values.topic} />
    <p>Описание задачи</p>
    <textarea name="description" onChange={formik.handleChange} value={formik.values.description} />
    <button type="button" className="btn" onClick={shovedFileMenu}>
      Работа с файлами
    </button>
    {statusAndDeadLineBlock(formik)}
    <div className="alertlog">
      {formik.errors.topic}
      {formik.errors.deadline}
    </div>
    {buttonBlock(formik)}
  </div>
);

const RedactorBlock = (formik: FormikProps<FormValues>) => {
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
        {redactorConteinerBlock(formik)}
      </form>
    </>
  );
};

export default RedactorBlock;

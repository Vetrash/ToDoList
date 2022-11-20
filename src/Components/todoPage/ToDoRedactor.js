import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';
import cn from 'classnames';
import dayjs from 'dayjs';
import { todoState, addItem, redactItem, switchShowedFileMenu } from '../../store/todoSlice.js';
import { nameSchema } from '../tools/validate.js';
import { toastAddToDo, toastRedacted, toastNotRedacted, toastOverdue } from '../tools/toasts.js';

const ToDoRedactor = () => {
  const { todoItems, redactedItemId, todoTopics } = useSelector(todoState);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      topic: '',
      topicDublicate: '',
      description: '',
      deadline: '',
      status: 'waiting',
    },
    validationSchema: nameSchema(todoTopics),
  });

  useEffect(() => {
    if (redactedItemId !== null) {
      const { topic, description, status, deadline } = todoItems[redactedItemId];
      formik.setValues({ topic, description, status, deadline });
    }
  }, [redactedItemId]);

  useEffect(() => {
    formik.setFieldValue('topicDublicate', formik.values.topic);
  }, [formik.values.topic]);

  useEffect(() => {
    formik.setFieldValue('topic', '', true);
  }, []);

  const getCheckStatys = (deadline, status) => {
    const nowDate = dayjs();
    const endDate = dayjs(deadline);
    const diffDate = endDate.diff(nowDate, 'day');
    const statusRed = () => {
      if (diffDate < 0) {
        if (status !== 'completed') return 'overdue';
        return status;
      }
      if (status === 'overdue') return 'waiting';
      return status;
    };
    return statusRed();
  };

  const redactToDoItem = () => {
    if (!_.has(formik.errors, 'topicDublicate')) {
      const { topic, description, status, deadline } = formik.values;
      const statusRed = getCheckStatys(deadline, status);
      dispatch(redactItem({ topic, description, status: statusRed, id: redactedItemId, deadline }));
      formik.setValues({ topic: '', description: '', status: 'waiting', deadline: '' });
      toastRedacted();
      if (statusRed === 'overdue') { toastOverdue(); }
    } else {
      toastNotRedacted();
    }
  };

  const addNewToDo = () => {
    console.log(formik);
    if (formik.isValid) {
      const { topic, description, status, deadline } = formik.values;
      const statusRed = getCheckStatys(deadline, status);
      dispatch(addItem({ topic, description, status: statusRed, deadline }));
      formik.setValues({ topic: '', description: '', status: 'waiting', deadline: '' });
      toastAddToDo();
      if (statusRed === 'overdue') { toastOverdue(); }
    } else {
      toastNotRedacted();
    }
  };

  const shovedFileMenu = () => { dispatch(switchShowedFileMenu(true)); };

  const isResizebleWidth = window.innerWidth > 600;
  const styleWidth = isResizebleWidth ? '50%' : '100%';

  return (
    <form className="redactorToDO" style={{ width: styleWidth }} onSubmit={(e) => { e.preventDefault(); }}>
      <div className="redactorConteiner">
        <p>Название задачи </p>
        <input
          type="text"
          name="topic"
          onChange={formik.handleChange}
          value={formik.values.topic}
        />
        <p>Описание задачи</p>
        <textarea
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <button type="button" className="btn" onClick={shovedFileMenu}>Работа с файлами</button>
        <div className="flexConteiner">
          <div className="flexConteiner__item">
            <p>Статус задачи</p>
            <select
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
            >
              <option value="waiting">ожидает</option>
              <option value="inProcess">в процессе</option>
              <option value="completed">выполнена</option>
              <option value="overdue">просрочена</option>
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
          <div className={cn('flexConteiner__item', { hide: redactedItemId === null })}>
            <button
              type="button"
              className={cn('btn')}
              onClick={redactToDoItem}
            >
              Сохранить изменения
            </button>
          </div>
          <div className="flexConteiner__item">
            <button type="button" className="btn" onClick={addNewToDo}>Сохранить новую задачу</button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ToDoRedactor;

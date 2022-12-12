import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { getDatabase, ref, set, push } from 'firebase/database';
import _ from 'lodash';
import cn from 'classnames';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import TodoState from '../../../store/mobx/TodoState';
import TrigerUIState from '../../../store/mobx/TrigerUIState';
import { nameSchema } from '../../../Components/validate';
import { toastAddToDo, toastRedacted, toastNotRedacted, toastOverdue } from '../../../Components/toasts';

const ToDoRedactor = observer(() => {
  const localLogin = localStorage.getItem('login');
  const formik = useFormik({
    initialValues: {
      topic: '',
      topicDublicate: '',
      description: '',
      deadline: '',
      status: 'waiting',
    },
    onSubmit: () => { console.log('send'); },
    validationSchema: nameSchema(TodoState.todoTopics),
  });

  useEffect(() => {
    if (TodoState.redactedItemId !== null) {
      const id = TodoState.redactedItemId;
      const { topic, description, status, deadline } = TodoState.todoItems[id];
      formik.setValues({ topic, topicDublicate: topic, description, status, deadline });
    }
  }, [TodoState.redactedItemId]);
  useEffect(() => {
    formik.setFieldValue('topicDublicate', formik.values.topic);
  }, [formik.values.topic]);
  useEffect(() => {
    formik.setFieldValue('topic', '', true);
  }, []);

  const getCheckStatys = (deadline:string, status:string) => {
    const nowDate = dayjs();
    const endDate = dayjs(deadline);
    const diffDate = endDate.diff(nowDate, 'day');
    const statusRed = () => {
      if (diffDate < 0) {
        if (status !== 'done') return 'undone';
        return status;
      }
      if (status === 'undone') return 'waiting';
      return status;
    };
    return statusRed();
  };

  const redactToDoItem = () => {
    if (!_.has(formik.errors, 'topicDublicate')) {
      const { topic, description, status, deadline } = formik.values;
      const statusRed = getCheckStatys(deadline, status);
      const files = _.cloneDeep(TodoState.uploadFile);
      const db = getDatabase();
      console.log(topic);
      set(ref(db, `data/${TodoState.redactedItemId}`), {
        topic,
        description,
        status: statusRed,
        files,
        deadline,
        username: `${localLogin}@test.ru`,
      })
        .then(() => {
          TodoState.redactItem(
            {
              topic,
              description,
              status: statusRed,
              id: TodoState.redactedItemId as string,
              deadline,
              files,
            },
          );
          formik.setValues({ topic: '', topicDublicate: '', description: '', status: 'waiting', deadline: '' });
          toastRedacted();
          if (statusRed === 'overdue') { toastOverdue(); }
          if (window.innerWidth < 650) { TrigerUIState.switchShowedRedactor(false); }
        })
        .catch(() => {
          toastNotRedacted();
        });
    }
  };

  const addNewToDo = () => {
    if (formik.isValid) {
      const { topic, description, status, deadline } = formik.values;
      const statusRed = getCheckStatys(deadline, status);
      const files = _.cloneDeep(TodoState.uploadFile);
      const db = getDatabase();
      push(ref(db, 'data/'), {
        topic,
        description,
        status: statusRed,
        files,
        deadline,
        username: `${localLogin}@test.ru`,
      })
        .then((res) => {
          TodoState.addItem(
            { id: res.key as string, topic, description, status: statusRed, deadline, files },
          );
          formik.setValues({ topic: '', topicDublicate: '', description: '', status: 'waiting', deadline: '' });
          toastAddToDo();
          if (statusRed === 'overdue') { toastOverdue(); }
          if (window.innerWidth < 650) { TrigerUIState.switchShowedRedactor(false); }
        })
        .catch(() => {
          toastNotRedacted();
        });
    }
  };

  const shovedFileMenu = () => { TrigerUIState.switchShowedFileMenu(true); };

  const closerRedactor = () => { TrigerUIState.switchShowedRedactor(false); };

  const isMobailRedactor = TrigerUIState.isShovedRedactor && TrigerUIState.isStyleMobail;

  return (
    <>
      <div className={cn('redactorToDO__back', { elem_show: isMobailRedactor })} />
      <form className={cn('redactorToDO', { elem_activ: TrigerUIState.isShovedRedactor })} onSubmit={(e) => { e.preventDefault(); }}>
        <button
          className={cn('btn__cross', 'btn__cross_in mobileElement', { elem_show: isMobailRedactor })}
          onClick={closerRedactor}
          type="button"
          aria-label="close"
        />
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
              <button
                type="button"
                className={cn('btn', 'btn_BlockHeight')}
                onClick={redactToDoItem}
              >
                Сохранить изменения
              </button>
            </div>
            <div className="flexConteiner__item">
              <button type="button" className="btn btn_BlockHeight" onClick={addNewToDo}>Сохранить новую задачу</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
});

export default ToDoRedactor;

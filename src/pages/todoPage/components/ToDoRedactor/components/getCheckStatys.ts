import dayjs from 'dayjs';

const getCheckStatys = (deadline:string, status:string) => {
  const nowDate = dayjs();
  const endDate = dayjs(deadline);
  const diffDate = endDate.diff(nowDate, 'day');
  if (diffDate > 0 && status === 'undone') return 'waiting';
  if (diffDate < 0 && status !== 'done') return 'undone';
  return status;
};
export default getCheckStatys;

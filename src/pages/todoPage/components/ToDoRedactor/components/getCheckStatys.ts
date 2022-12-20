import dayjs from 'dayjs';

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
export default getCheckStatys;

import AddItem from '@components/Admin/AddItem/AddItem';
import Protected from '@components/Admin/Protected';

const Add = () => {
  return (
    <Protected>
      <AddItem />
    </Protected>
  );
};

export default Add;

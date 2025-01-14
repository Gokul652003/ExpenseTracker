import categoryIcon from './assets/CategoryIcon.svg';

interface CategoryComponentProps {
  color?: string;
  label?: string;
}
export const CategoryComponent = ({
  color = 'grey',
  label = 'Food',
}: CategoryComponentProps) => {
  return (
    <div>
      <div className="flex gap-1.5">
        <img src={categoryIcon} />
        <div className="rounded-lg p-2 flex gap-1.5 items-center">
          <div
            className="rounded w-3.5 h-3.5"
            style={{ backgroundColor: color }}
          ></div>
          <div className="font-normal text-secondary text-base">{label}</div>
        </div>
      </div>
    </div>
  );
};

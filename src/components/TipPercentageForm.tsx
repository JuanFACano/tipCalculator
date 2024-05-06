import type { Dispatch } from 'react';
import { OrderActions } from '../reducers/orderReduce';

const tipOptions = [
  {
    id: 'tip-10',
    value: 0.1,
    label: '10%',
  },
  {
    id: 'tip-20',
    value: 0.2,
    label: '20%',
  },
  {
    id: 'tip-50',
    value: 0.5,
    label: '50%',
  },
];

type TipPercentageFormProps = {
  dispatch: Dispatch<OrderActions>;
  tip: number;
};

export default function TipPercentageForm({
  tip,
  dispatch,
}: TipPercentageFormProps) {
  return (
    <div>
      <h3 className="font-black text-2xl">Propina</h3>
      <form>
        {tipOptions.map((tipOption) => (
          <div className="flex gap-2" key={tipOption.id}>
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
            <input
              type="radio"
              name="tipOption"
              id={tipOption.id}
              value={tipOption.value}
              onChange={(e) =>
                dispatch({
                  type: 'define-tip',
                  payload: { tip: +e.target.value },
                })
              }
              checked={tipOption.value === tip}
            />
          </div>
        ))}
      </form>
    </div>
  );
}

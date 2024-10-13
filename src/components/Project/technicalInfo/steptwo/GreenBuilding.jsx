import React from 'react';
import { ConsumptionComponent } from '../../../eligibilitytest/lookingforaudit/SecondStep';
function GreenBuilding() {

  return (
    <div>
      <p className="py-2 border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
        Resources consumption
      </p>
      <ConsumptionComponent type="electricity" isFirstItem />
      <ConsumptionComponent type="water" />
      <ConsumptionComponent type="naturalGas" />
      <ConsumptionComponent type="gasoline" />
      <ConsumptionComponent type="diesel" />
    </div>
  );
}

export default GreenBuilding;

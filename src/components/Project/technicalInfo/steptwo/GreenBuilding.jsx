import React from 'react';
import { ConsumptionComponent } from '../../../eligibilitytest/lookingforaudit/SecondStep';
function GreenBuilding() {
  return (
    <div>
      <ConsumptionComponent type="electricity" isFirstItem />
      <ConsumptionComponent type="water" />
      <ConsumptionComponent type="naturalGas" />
      <ConsumptionComponent type="gasoline" />
      <ConsumptionComponent type="diesel" />
    </div>
  );
}

export default GreenBuilding;

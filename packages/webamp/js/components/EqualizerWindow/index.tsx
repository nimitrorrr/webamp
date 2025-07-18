import classnames from "classnames";

import { BANDS } from "../../constants";
import * as Actions from "../../actionCreators";
import * as Selectors from "../../selectors";

import Band from "./Band";
import EqOn from "./EqOn";
import EqAuto from "./EqAuto";
import EqGraph from "./EqGraph";
import PresetsContextMenu from "./PresetsContextMenu";

import { Band as BandType } from "../../types";
import { useTypedSelector, useActionCreator } from "../../hooks";

const bandClassName = (band: BandType) => `band-${band}`;

const EqualizerWindow = () => {
  const doubled = useTypedSelector(Selectors.getDoubled);

  const setPreampValue = useActionCreator(Actions.setPreamp);
  const setEqToMin = useActionCreator(Actions.setEqToMin);
  const setEqToMid = useActionCreator(Actions.setEqToMid);
  const setEqToMax = useActionCreator(Actions.setEqToMax);
  const setHertzValue = useActionCreator(Actions.setEqBand);

  const className = classnames({
    window: true,
    doubled,
  });

  return (
    <div id="equalizer-window" className={className}>
      <div className="equalizer-top title-bar">
        <div className="eq-title-text">Equalizer</div>
      </div>
      <EqOn />
      <EqAuto />
      <EqGraph />
      <PresetsContextMenu />
      <Band id="preamp" band="preamp" onChange={setPreampValue} />
      <div id="plus12db" onClick={setEqToMax} />
      <div id="zerodb" onClick={setEqToMid} />
      <div id="minus12db" onClick={setEqToMin} />
      <div>
        {BANDS.map((hertz) => (
          <Band
            key={hertz}
            id={bandClassName(hertz)}
            band={hertz}
            onChange={(value) => setHertzValue(hertz, value)}
            clickOriginatedInEq={false}
          />
        ))}
      </div>
    </div>
  );
};

export default EqualizerWindow;

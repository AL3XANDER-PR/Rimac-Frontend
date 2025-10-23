import blurAsset from "../../assets/images/blur-asset.png";
import blurAsset1 from "../../assets/images/blur-asset1.png";
import blurAssetLeft from "../../assets/images/blur-asset-left.png";
import blurAssetLeft2 from "../../assets/images/blur-asset-left2.png";

import "./BlurAsset.scss";

export const BlurAsset = () => {
  return (
    <div className="blur-asset">
      <img className="blur-asset__right-desktop" alt="" src={blurAsset} />
      <img className="blur-asset__right-mobile" alt="" src={blurAsset1} />
      <img className="blur-asset__left-desktop" alt="" src={blurAssetLeft} />
      <img className="blur-asset__left-mobile" alt="" src={blurAssetLeft2} />
    </div>
  );
};

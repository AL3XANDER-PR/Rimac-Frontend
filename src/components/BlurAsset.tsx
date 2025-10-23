import blurAsset from "../assets/blur-asset.png";
import blurAsset1 from "../assets/blur-asset1.png";
import blurAssetLeft from "../assets/blur-asset-left.png";
import blurAssetLeft2 from "../assets/blur-asset-left2.png";

export const BlurAsset = () => {
  return (
    <>
      <img
        className="absolute right-0 top-0 select-none hidden md:block -z-10"
        alt=""
        src={blurAsset}
      />
      <img
        className="absolute right-0 -top-20 select-none block md:hidden -z-10"
        alt=""
        src={blurAsset1}
      />
      <img
        className="absolute left-0 bottom-0 select-none hidden md:block -z-10"
        alt=""
        src={blurAssetLeft}
      />
      <img
        className="absolute left-0 bottom-0 select-none block md:hidden -z-10"
        alt=""
        src={blurAssetLeft2}
      />
    </>
  );
};

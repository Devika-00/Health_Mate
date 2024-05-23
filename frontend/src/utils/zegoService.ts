import React, { useEffect } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useAppSelector } from "../redux/store/Store";
import { ReactNode } from "react";

export const ZegoCloud = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.UserSlice);

  useEffect(() => {
    const userID = user.id;
    const userName = user.name;
    const appID = 1631866234;
    const serverSecret = 'ef643f6bf95ef4488775c1cd2d944227';
    //@ts-ignore
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    // Add any additional setup or event handling here
  }, [user]);

  return children;
}

export default ZegoCloud;

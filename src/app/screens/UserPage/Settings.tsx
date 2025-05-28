import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { T } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";

export function Settings() {
  const {authMember, setAuthMember} = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg");

  const [memberUpdateInput, setMemberUpdateInput] =
    useState<MemberUpdateInput>({
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,

    });

    /* HANDLERS */
    
    const memberNickHandler = (e: T) => {
      setMemberUpdateInput({...memberUpdateInput, memberNick: e.target.value});
    };

    const memberPhoneHandler = (e: T) => {
      setMemberUpdateInput({...memberUpdateInput, memberPhone: e.target.value});
    };

    const memberAddressHandler = (e: T) => {
      setMemberUpdateInput({...memberUpdateInput, memberAddress: e.target.value});
    };

    const memberDescHandler = (e: T) => {
      setMemberUpdateInput({...memberUpdateInput, memberDesc: e.target.value});
    };
    

    const handleUpdateMemberRequest = async () => {
    try {
      if(!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === '' ||
        memberUpdateInput.memberPhone === '' ||
        memberUpdateInput.memberAddress === '' ||
        memberUpdateInput.memberDesc === ''
      ) {
        throw new Error(Messages.error3);
      };
      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully!", 700);

    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    const fileType = file.type,
      validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    
    if(!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if(file) {
        setMemberUpdateInput({...memberUpdateInput, memberImage: file});
        setMemberImage(URL.createObjectURL(file));
      }
    }

  };

  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={memberImage} className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label" onChange={handleImageViewer}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            onChange={memberNickHandler}
            className={"spec-input mb-nick"}
            type="text"
            value={memberUpdateInput.memberNick}
            placeholder={authMember?.memberNick}
            name="memberNick"
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            onChange={memberPhoneHandler}
            className={"spec-input mb-phone"}
            type="text"
            value={memberUpdateInput.memberPhone}
            placeholder={authMember?.memberPhone ?? "no phone"}
            name="memberPhone"
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            onChange={memberAddressHandler}
            className={"spec-input  mb-address"}
            type="text"
            value={memberUpdateInput.memberAddress}
            placeholder={authMember?.memberAddress ? authMember.memberAddress : "no address"}
            name="memberAddress"
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            onChange={memberDescHandler}
            className={"spec-textarea mb-description"}
            value={memberUpdateInput.memberDesc}
            placeholder={authMember?.memberDesc ? authMember.memberDesc : "no description"}
            name="memberDesc"
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button onClick={handleUpdateMemberRequest} variant={"contained"}>Save</Button>
      </Box>
    </Box>
  );
}

import React from "react";
import Avatar from "react-avatar-edit";
import { useState } from "react";

export const AvatarOfUser:React.FC<{setAvatarSrc: any}> = ({setAvatarSrc}) => {
    const [preview, setPreview] = useState(null);
    const onClose = () => {
        setPreview(null);
    }
    const onCrop = (pv: any) => {
        setPreview(pv);
    }
    const onBeforeFileLoad = (elem: any) => {
        if (elem.target.files[0].size > 2000000) {
            alert("File is too big!");
            elem.target.value = "";
        }
    }


    return (
        <div>
            <Avatar
                width={200}
                height={200}
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
                src={''}
                labelStyle={{ fontSize: "25px" }}
                label={"Select a File"}
                lineWidth={5}
            /> {preview && (
            <>
                <img src={preview} alt="Preview" />
                <a href={preview} onClick={() => setAvatarSrc(preview)}>
                    set avatar
                </a>
            </>
        )}
        </div>
    );
}
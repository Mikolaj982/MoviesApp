import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useErrorHandler} from "../../hooks/useErrorHandler";
import pako from "pako";

export const AvatarOfUser = () => {
    const [image, setImage] = useState<string | Blob | null>(null);
    const [preview, setPreview] = useState<ArrayBuffer | null | string>(null)
    const navigate = useNavigate();
    const {handleError} = useErrorHandler();

    const convertToBase64 = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if (reader.result !== null) {
                const imageData = reader.result;
                const compressedImageData = pako.gzip(imageData);
                const compressedImageBlob = new Blob([compressedImageData]);
                console.log('blobed image:', compressedImageBlob);
                setImage(compressedImageBlob);
                setPreview(reader.result);
                 console.log('readerresulr', reader.result);
            }
        }
        reader.onerror = error => {
            handleError(error)
            console.log('Error: ', error);
        }
    }

    const uploadAvatar = () => {
            fetch(`http://localhost:8000/upload-avatar`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Accept: 'application/json',
                    // "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({compressedImage: image,}),
            })
                .then(async(res) => {
                    if (!res.ok) {
                        const response = await res.json();
                        handleError(response.message)
                    } else {
                        navigate('/main-page');
                        console.log('avatar added');
                    }
                })
        }

    return (
        <div>
            <input type="file" accept="image/*" onChange={convertToBase64}/>
            <button onClick={uploadAvatar}/>
            {preview == '' || preview == null ? '' : <img width={100} height={100} src={preview.toString()}/>}
        </div>
    );
}
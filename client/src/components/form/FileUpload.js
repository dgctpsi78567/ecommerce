import axios from 'axios';
import React from 'react'
import Resizer from "react-image-file-resizer"
import { useSelector } from 'react-redux';

const FileUpload = ({ values, setValue }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const fileuploadAndResize = (e) => {
        let files = e.target.files;
        let alluploadedFile = values.images;


        if (files)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i], // Is the file of the image which will resized.
                    720, // Is the maxWidth of the resized new image.
                    720, // Is the maxHeight of the resized new image.
                    'JPEG', // Is the compressFormat of the resized new image.
                    100, // Is the quality of the resized new image.
                    0, // Is the degree of clockwise rotation to apply to uploaded image.
                    (uri) => {
                        axios.post(`${process.env.REACT_APP_API}/uploadimage`,
                            { image: uri },
                            {
                                headers: {
                                    authToken: user ? user.token : ""
                                }
                            }
                        ).then((res) => {
                            console.log("Images data", res);
                            alluploadedFile.push(res.data)
                            setValue({ ...values, images: alluploadedFile })

                        }).catch((err) => {
                            console.log("Cloudinary Upload Error", err);
                        })

                    }, // Is the callBack function of the resized new image URI.
                    "base664", // Is the output type of the resized new image.
                );
            }
    }

    const removeImage = (public_id) => {
        // console.log("ddddddddddd",public_id);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id },
            {
                headers: {
                    authToken: user ? user.token : "",
                }
            }
        ).then((res) => {
            const { images } = values;
            let filterImages = images.filter((item) => {
                return item.public_id !== public_id;
            });
            setValue({ ...values, images: filterImages });
        }).catch((err) => {
            console.log(err);
        })


    }


    return (
        <React.Fragment>
            {
                values.images && values.images.map((image) => (
                    <div>
                        <img src={image.url} key={image.public_id} className="mx-2"
                            height="200" width="200" alt="CloudinaryImage" />

                        <button onClick={() => removeImage(image.public_id)} className="btn btn-outline-danger"> Delete</button>
                    </div>
                ))
            }


            <label className="btn-outline-success btn">Choose File
                <input type="file" hidden multiple accept='images/*' onChange={fileuploadAndResize} />
            </label>

        </React.Fragment>
    )
}

export default FileUpload
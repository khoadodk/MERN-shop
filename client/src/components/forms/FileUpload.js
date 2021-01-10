import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { Avatar, Badge } from 'antd';
import Loading from '../loading/Loading';

const FileUpload = ({ values, setValues }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // Resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : ''
                  }
                }
              )
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log('CLOUDINARY UPLOAD FAIL', err);
              });
          },
          'base64'
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : ''
          }
        }
      )
      .then(() => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter(
          (item) => item.public_id !== public_id
        );
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className='row'>
        <input
          className='btn btn-primary'
          type='file'
          placeholder='Choose file'
          multiple
          accept='image/*'
          onChange={fileUploadAndResize}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='row'>
          {values.images &&
            values.images.map((image) => (
              <Badge
                count='X'
                key={image.public_id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleImageRemove(image.public_id)}>
                <Avatar
                  key={image.public_id}
                  src={image.url}
                  size={100}
                  className='m-2'
                />
              </Badge>
            ))}
        </div>
      )}
    </>
  );
};

export default FileUpload;

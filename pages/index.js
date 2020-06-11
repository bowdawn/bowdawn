import React, { useState } from "react";

import { storage } from "@lib/base";

import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function ReactFirebaseFileUpload() {

  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async file => {
    console.log("handlePreview");
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const onChange = async (info) => {
    let file = info.file;
    let fileList = [...info.fileList];
    if (file.status === 'uploading') {
      if (!uploading) {
        setFileList(fileList);
        setUploading(true);
        const uploadTask = storage.ref(`images/${file.name}`).put(file.originFileObj);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              //console.log('Upload is paused');
              break;
            case 'running':
              //console.log('Upload is running');
              break;
          }
        }, function (error) {
          message.error(error.message);
          fileList[fileList.length - 1].status = "error";
          setFileList(fileList);
          setUploading(false);
        }, function () {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            message.success(`${file.name} file uploaded successfully`);
            fileList[fileList.length - 1].status = "done";
            setFileList(fileList);
            setUploading(false);
          });
        });
      }
    }
  };

  const onRemove = file => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList)
  };








  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <div>





      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={(info) => {
          onChange(info)
        }}
        onRemove={(file) => onRemove(file)}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div >
  );
};



function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
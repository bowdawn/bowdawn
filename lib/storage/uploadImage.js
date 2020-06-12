import { storage } from "@lib/base";
import moment from "moment"

export default async function (body, res) {
    const { name, file } = body;
    const image = file;
    const uploadTask = storage.ref(`images/${name}${moment().toString()}`).putString(image, 'data_url', { contentType: 'image/png' });
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
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        message.error(error.message);

    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            message.success(`${file.name} file uploaded successfully`);
            fileList[fileList.length - 1].status = "done";

        });
    });
}

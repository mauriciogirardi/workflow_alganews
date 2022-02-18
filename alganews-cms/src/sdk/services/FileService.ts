import { v4 } from 'uuid';

import { Service } from "sdk/Service";
import { File } from "sdk/@types";

// GCP

export class FileService extends Service {
    private static getSignedUrl(fileInfo: File.UploadRequestInput) {
        return this.Http
            .post<File.UploadRequest>('/upload-requests', fileInfo)
            .then(this.getData)
            .then(res => res.uploadSignedUrl)
    }

    private static uploadFileToSignedUrl(signedUrl: string, file: File) {
        return this.Http
            .put<{}>(signedUrl, file, {
                headers: { 'Content-Type': file.type }
            })
            .then(this.getData)
    }

    private static getFileExtension(filename: string) {
        const [extension] = filename.split('.').slice(-1)
        return extension
    }

    private static generateFilename(exp: string) {
        return `${v4()}.${exp}`
    }

    static async upload(file: File) {
        const extension = this.getFileExtension(file.name)
        const fileName = this.generateFilename(extension)

        const singedUrl = await FileService.getSignedUrl({
            fileName,
            contentLength: file.size,
        })

        await FileService.uploadFileToSignedUrl(singedUrl, file)

        return singedUrl.split('?')[0]
    }
}

export class AddProofModel {
}
 export class UploadMedia{
     image : File;
     imageType : string;
     
    constructor(image:File,imageType:string){
        this.image = image;
        this.imageType = imageType;
    }
 }
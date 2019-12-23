import { Component, OnInit } from '@angular/core';
import { AddProofService } from './add-proof.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-proof',
  templateUrl: './add-proof.component.html',
  styleUrls: ['./add-proof.component.css']
})
export class AddProofComponent implements OnInit {
  noOfPerson:number;
  persons: any = [];
  fileData: File = null;
  uploadedFileBase: string = null;
  uploadedFilePath: string = null;
  fronRequired:boolean;
  param:string="";
  constructor( private route: ActivatedRoute,private addProofService : AddProofService, private router : Router) { }

  ngOnInit() {
    this.param = this.route.snapshot.queryParamMap.get("param");
    if(this.param=='' || this.param==undefined || this.param==null){
      alert("Something Went Wrong!!");
      this.router.navigate(['/checkin']);
    }
    this.noOfPerson = parseInt(localStorage.getItem('noOfPerson'));
    if(localStorage.getItem("personsDetail")){
      let pLength = (JSON.parse(localStorage.getItem("personsDetail"))).length;
      this.persons = JSON.parse(localStorage.getItem("personsDetail"));
      this.uploadedFileBase = this.persons[0].imagePath;
      if(this.noOfPerson<pLength){
        this.persons.pop();
        localStorage.setItem("personsDetail",JSON.stringify(this.persons));
      }
      else if(this.noOfPerson>pLength){
        let remainP = this.noOfPerson - pLength;
        for(let p= pLength;p<(pLength+remainP);p++){
          this.persons[p]={
           "frontMedia": {
               "idProofImage": ""
           },
           "imagePath": "",
           "idType": "",
           "name": "",
           "backMedia": {
               "idProofImage": ""
           }
         }
        } 
      }
    }
    else{
      this.addPerson();
    }
  }

  // function run to genrate dynamically array of persons
  addPerson() {
   for(let p=0;p<this.noOfPerson;p++){
     this.persons[p]={
      "frontMedia": {
          "idProofImage": ""
      },
      "imagePath": "",
      "idType": "",
      "name": "",
      "backMedia": {
          "idProofImage": ""
      }
    }
   }    
  }

// function file upload
fileProgress(indexValue,imageType,fileInput: any){
  this.fileData = <File>fileInput.target.files[0];
  const formData = new FormData();
  formData.append('image', this.fileData);
  formData.append('imageType', 'FRONT');
  this.addProofService.uploadImgCall(formData).subscribe( (response: any) => {
      this.uploadedFileBase = response.data.imagePath;
      this.uploadedFilePath = response.data.imagePath + response.data.idProofImage;
      if(imageType=='FRONT'){
        this.persons[indexValue].frontMedia.idProofImage = response.data.idProofImage;
      }
      else if(imageType=='BACK'){
        this.persons[indexValue].backMedia.idProofImage = response.data.idProofImage;
      }
      this.persons[indexValue].name = this.persons[indexValue].name;
      this.persons[indexValue].imagePath = this.uploadedFileBase;
    },
    error => {
      console.log(error);
    })
}
// function file upload end

// function run on save button
savePerson(){
  //console.log(this.persons);
  for(let a=0;a<this.persons.length;a++){
    if(this.persons[a].frontMedia.idProofImage==''){
      alert("Person" + a + "  Front View Image is required");
      this.fronRequired = true;
      return;
    }
  }  
  localStorage.setItem("personsDetail",JSON.stringify(this.persons));
  this.router.navigate(['/checkin'], { queryParams: { param: this.param } });
}
// end 

}

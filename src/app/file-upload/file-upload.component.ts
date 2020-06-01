import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {ApplicationService} from '../app.service';
import {Result} from '../model/Result';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  uploadForm: FormGroup;
  result: Result;
  isResult = false;
  error = false;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  title = 'Angular File Upload';


  constructor(private fb: FormBuilder,
              private applicationService: ApplicationService,
  ) {
  }

  uploadSubmit() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert('Each File should be less than 10 MB of size.');
        return;
      }
    }
    const files = new FormData();
    for (let j = 0; j < this.uploader.queue.length; j++) {
      const fileItem = this.uploader.queue[j]._file;
      console.log(fileItem.name);
      console.log(fileItem);
      files.append('file', fileItem, fileItem.name);
    }
    console.log(files);
    this.applicationService.uploadFile(files, this.l.value).subscribe(data => {
      this.result = data;
      this.result.targetFunction = data.targetFunction;
      this.isResultValid();
    },
      error1 => {
        this.error = true;
      }
    );

    this.uploader.clearQueue();
  }


  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type: [null, Validators.compose([Validators.required])],
      l: [null, [Validators.required, Validators.pattern('[0-9]+[0-9, ]*')]]
    });
  }

  get l() {
    return this.uploadForm.get('l');
  }

  isResultValid() {
    if (this.result != null && this.result.edges != null) {
      this.isResult = true;
    } else {
      if (this.result.edges == null) {
// this.openSnackBar('Invalid data format', 'show' );
      }
      this.isResult = false;
    }
  }

  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action, {
  //     duration: 2000,
  //   });
  // }
}


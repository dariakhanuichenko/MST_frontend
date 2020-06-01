import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../app.service';
import {Result} from '../model/Result';

// import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {

  uploadForm: FormGroup;
  result: Result;
  isResult = false;
  error = false;


  constructor(private fb: FormBuilder,
              private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      l: [null, [Validators.required, Validators.pattern('[0-9]+[0-9, ]*')]],
      size: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      number: [null, [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }

  get l() {
    return this.uploadForm.get('l');
  }

  get size() {
    return this.uploadForm.get('size');
  }

  get number() {
    return this.uploadForm.get('number');
  }

  upload() {
    this.applicationService.getData(this.l.value, this.size.value, this.number.value).subscribe(data => {
        this.result = data;
        this.result.targetFunction = data.targetFunction;
        this.isResultValid();
      },
      error1 => {
          this.error = true;
      }
    );
  }

  isResultValid() {
    if (this.result != null && this.result.edges != null) {
      this.isResult = true;
    } else {
      if (this.result.edges == null) {
        this.error = true;
// this.openSnackBar('Invalid data format', 'show' );
      }
      this.isResult = false;
    }
  }
}


import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { S3 } from 'aws-sdk';
import { saveAs } from 'file-saver';
import { DATETIME_FORMAT_FILE_PREFIX_S3 } from '../../utils/constant';
import * as moment from 'moment';
import * as _ from 'lodash';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  constructor(
    private authService: AuthService,
    private helper: HelperService
  ) { }

  public download({ bucketName, key, filename }: {bucketName: string, key: string, filename?: string}, callback: (err?, data?: any) => void){
    this.authService.checkAWSCredentials( (err) => {
      if(err){
        return callback(err);
      }

      let bucket = new S3();

      let params = {
        Bucket: bucketName,
        Key: key,
      };

      bucket.getObject(params, (err, data) => {
        if(err){
          return callback(err);
        }
        saveAs(new Blob([data.Body as any], { type: data.ContentType }), filename);
        callback(null, data);
      });
    });
  }

  public upload(
      { bucketName, file, options }: {bucketName: string, file: File, options?: S3.ManagedUpload.ManagedUploadOptions}, 
      callback: (err?, s3Key?: any) => void
    ){
    this.authService.checkAWSCredentials( (err) => {
      if(err){
        return callback(err);
      }

      let bucket = new S3();

      let extraPrefix = this.helper.randomString(6);
      let kebabFilename = _.kebabCase(file.name);
      let now = moment().format(DATETIME_FORMAT_FILE_PREFIX_S3);

      let key = `${extraPrefix}-${now}-${kebabFilename}`;

      let params = {
        Bucket: bucketName,
        Key: key, 
        Body: file,
        ContentType: file.type
      };

      bucket.upload(params, options, (err) => {
        if(err){
          return callback(err);
        }
        callback(null, key);
      });
    });
  }


}

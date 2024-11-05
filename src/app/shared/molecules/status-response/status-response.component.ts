import { HttpStatusCode } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router} from '@angular/router';
import { Status } from '@models/status.model';
import { CONNECTION_ERROR, SERVER_ERROR } from '@shared/constants/server-error.constants';
@Component({
  selector: 'app-status-response',
  templateUrl: './status-response.component.html',
  styleUrls: ['./status-response.component.scss']
})
export class StatusResponseComponent{
  serverErrorMessages: Map<number, string> = new Map([
    [0,CONNECTION_ERROR],
    [500, SERVER_ERROR]
  ]);
  @Input() status!: Status ;
  @Input() fullSize:boolean=false;
  constructor(private readonly router: Router) {}
  navigateBack() {
    if(this.status.code==HttpStatusCode.NotFound||this.status.code != null&&this.status.code >= 200 && this.status.code < 300){
      const currentUrl = this.router.url;
      const lastUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
      this.router.navigate([lastUrl]);
    }
    this.status.code=null;
  }
  getTittle(){
    if(this.status.code==null){
      return null;
    }
    return this.status.tittles.get(this.status.code>=200&&this.status.code<300);
  }
  getMessage(){
    if(this.status.code==null){
      return null;
    }
    if(this.status.code===0||this.status.code==500){
        return this.serverErrorMessages.get(this.status.code);
    }else{
        return this.status.messages?this.status.messages.get(this.status.code):null;
    }
  }
}

import swal from 'sweetalert2';
import {Observable} from 'rxjs/Observable';
import { Observer } from 'rxjs';
import {OnInit} from '@angular/core';

export class BaseComponent implements OnInit {
    protected isFormSubmitted: boolean;
    protected isLoading: boolean;
    dialogResult: boolean;
    private toast = (swal as any).mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
     });

    constructor() {}

    ngOnInit() {
        this.isLoading = false;
    }

    protected warningDialogYesCancel(message: string) {
        let dialogResult;
        return Promise.resolve(
         swal({
                title: 'Are you sure',
                text: message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, discard changes!'
            }).then((result) => {
               this.dialogResult = result.value;
            })
        ).then( () => {
            return this.dialogResult;
        })
    }

    protected toastDialog(toastType: string, message: string, duration) {
     const toast = this.customToastDialog('top-end', false, duration);

     toast({
         type: toastType,
         title: message
     })
    }

    private customToastDialog(customPosition: string, displayConfirmButton: boolean, customTimer: number ): any {
      const toast =  (swal as any).mixin({
            toast: true,
            position: customPosition,
            showConfirmButton: displayConfirmButton,
            timer: customTimer
         });

         return toast;
    }
}

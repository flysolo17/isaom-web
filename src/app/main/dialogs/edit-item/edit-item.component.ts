import { Component, inject, Input, OnInit } from '@angular/core';
import { Levels } from '../../types/levels.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LevelsService } from '../../services/levels.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css'
})
export class EditItemComponent implements OnInit{
   modal=inject(NgbActiveModal)
   @Input() item!: Levels
   @Input() gameID!: string

   previewImage: any

   levelForm$: FormGroup;
   selectedFile: File | null = null; 
   constructor(
    private fb: FormBuilder,
    private levelService: LevelsService,
    private toastr: ToastrService
  ) {
    this.levelForm$ = this.fb.group({
      question: ['', Validators.required],
      hint: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(1)]],
      answer: ['', Validators.required],
    });
  }
    ngOnInit(): void { console.log(this.item)
      this.previewImage=this.item.image,
      this.levelForm$.patchValue({
        question: this.item.question,
        hint: this.item.hint,
        points: this.item.points,
        answer: this.item.answer,
      })
  }
    submit(){
      console.log(this.levelForm$.value)
      if (this.levelForm$.invalid) {
        return
      }
      let level: Levels = {
        ...this.item,
        question: this.levelForm$.value.question,
        hint: this.levelForm$.value.hint,
        points: this.levelForm$.value.points,
        answer: this.levelForm$.value.answer,
      };
      
    this.levelService
    .editItem( level, this.selectedFile,this.gameID)
    .finally(() => {
      this.levelForm$.reset();
      this.selectedFile = null;
      this.modal.close();
    });
    }
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length) {
        this.selectedFile = input.files[0];
    
        // Use FileReader to read the file
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImage = e.target.result; // Assign the data URL to a variable
        };
        reader.readAsDataURL(this.selectedFile); // Read the file as a data URL
      }
    }
    
  
}

import { Component, OnInit } from '@angular/core';
import { ToDoListItem } from './models/todo-list-item';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToDoListService } from './services/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  valuesForm: FormGroup;
  todoListItems: ToDoListItem[] = [];
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly todoService: ToDoListService) {

    this.valuesForm = this.fb.group({

      values: this.fb.array([])
    });
  }

  ngOnInit() {

    this.todoService.getAll().subscribe(results => {

      results.forEach(i => {
      
        let value = this.fb.group({
          id: [i.id],
          description: [i.description],
          dateDue: [i.dateDue],
          dateCreated: [i.dateCreated],
          completed: [i.dateCompleted ? true : false] 
        });
  
        this.values.push(value);
      });
    });
   
  }

  showMessage(message: string) {

    console.log(message);
  }

  addNewItem() {

    const newItem = {
      id: 0,
      description: `New Task #${this.values.length+1}`,
      completed: false
    };

    this.todoService.add(newItem as ToDoListItem).subscribe();
    let value = this.fb.group(newItem);

    this.values.push(value);
  }

  get values(): FormArray {

    return this.valuesForm.get('values') as FormArray;
  }

  setComplete(i: number) {

    const updateItem = {
      id: this.values.at(i).get('id')?.value,
      description: this.values.at(i).get('description')?.value,
      completed: true
    };

    this.todoService.update(updateItem).subscribe();

    this.values.at(i).get('completed')?.patchValue(true);
  }

  updateDescription(i: number) {

    const updateItem = {
      id: this.values.at(i).get('id')?.value,
      description: this.values.at(i).get('description')?.value,
      completed: this.values.at(i).get('completed')?.value
    };

    this.todoService.update(updateItem).subscribe();
  }

  delete(i: number) {

    this.todoService.delete(this.values.at(i).get('id')?.value).subscribe();
    this.values.removeAt(i); 
  }
}

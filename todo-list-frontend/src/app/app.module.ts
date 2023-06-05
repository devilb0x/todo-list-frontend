import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxCheckboxModule } from 'ngx-checkbox';
import { EditableModule } from '@ngneat/edit-in-place';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoListService } from './services/todo-list.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxCheckboxModule,
    FormsModule, 
    ReactiveFormsModule,
    EditableModule,
    HttpClientModule
  ],
  providers: [ToDoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

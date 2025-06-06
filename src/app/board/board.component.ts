import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [FormsModule, CommonModule, TaskCardComponent, DragDropModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  constructor(private taskService: TaskService) { }

  tasks: Task[] = [];
  showModal: boolean = false;
  title: string = '';
  description: string = '';
  statusList: Task['status'][] = ['nueva', 'en_proceso', 'completada'];



  ngOnInit() {
    this.getTasks();
  }

  //Función para obtener los datos del formulario
  //y pasárselos al task.service para enviárselos
  //a firebase
  async saveTask() {
    if (this.title === '' || this.description === '') {
      alert('No pueden haber campos vacíos!');
      return;
    }
    //Preparamos los datos a guardar:
    const newTask: Task = {
      title: this.title,
      description: this.description,
      datetime: new Date().toISOString(),
      status: 'nueva'
    }
    //Ejecutamos la funcion addTask del servicio
    await this.taskService.addTask(newTask);
    this.getTasks();
    this.closeModal();

  }

  async getTasks() {
    try {
      //Obtenemos las tareas:
      this.tasks = await this.taskService.loadTasks();
      console.log(this.tasks);
    } catch (error: any) {
      console.error('Error al obtener las tareas: ' + error);
    }
  }

  //Función para filtrar las tareas según su status:
  getTasksByStatus(status: Task['status']) {
    return this.tasks.filter(task => task.status === status);
  }


  openModal() {
    this.title = '';
    this.description = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }


  async drop(event: CdkDragDrop<Task[]>, newStatus: Task['status']) {
    const task = event.previousContainer.data[event.previousIndex];

    if (task.status !== newStatus) {
      // 1. Actualiza el estado local inmediatamente
      task.status = newStatus;

      // 3. Actualiza en Firestore (sin esperar el resultado para redibujar)
      this.taskService.updateTaskStatus(task.id!, newStatus);
    }
  }




}



import { Injectable } from '@angular/core';
import { Firestore, doc, addDoc, collection, getDocs, updateDoc } from '@angular/fire/firestore';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: Firestore) { }

  //Función para guardar una tarea en firebase
  addTask(task: Task){
    //1 Creamos una referencia a la colección donde vamos a guardar
    //la tarea
    const taskRef = collection(this.firestore, 'tasks');
    //2 Guardamos la tarea en la colección
    return addDoc(taskRef, task);
  }

  //Función para obtener todas las tareas:
  async loadTasks(){
    const taskRef = collection(this.firestore, "tasks");
    const snapshot = await getDocs(taskRef);
    //Ordenamos las tareas de más recientes a más antiguas:
    return snapshot.docs.map(doc => ({id: doc.id, ...(doc.data() as Task)}))
  }

  //Función para actualizar el status de una tarea
  //Obtiene el id de la tarea y el nuevo status
  async updateTaskStatus(id: string, status: Task['status']){
    //Accedemos a la tarea por su id
    const taskRef = doc(this.firestore, 'tasks', id);
    //Actualizamos el valor status
    return updateDoc(taskRef, {status});
  }

}

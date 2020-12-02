<template>
  <div class="container">
    <h1>ToDo List</h1>
    <div class="text-container">
      <p>В данном ToDo List вы можете добавлять задачи.</p>
      <p>Назаначать каждой задаче наименование задачи, описание и время выполнения.</p>
      <p>До истечения срока выполнения задачи, вам на почту прилетит уведомление.</p>
      <p>Успехов вам!</p>
    </div>
    
    <b-button v-b-modal.addtask variant="dark" squared class="button">Создать задачу</b-button>

    <b-modal id="addtask" size="lg" centered>
        <template v-slot:modal-header="{ close }">
          <p class="headerText">Создание новой задачи</p>
          <img src="@/assets/closeIcon.png" @click="close()" class="closeIcon">
        </template>

        <div class="inputs">
          <div>
            <label for="task-name">Наименование задачи</label>
            <b-form-input id="task-name" class="input" v-model="task_name"></b-form-input>
          </div>
          <div>
            <label for="task-description">Описание задачи</label>
            <b-form-input id="task-description" class="input" v-model="task_description"></b-form-input>
          </div>
          <div>
            <label for="deadline">Крайний срок выполнения задачи</label>
            <b-form-input id="deadline" type="date" class="input" v-model="deadline" lazy-formatter></b-form-input>
          </div>
          <div>
            <label for="email">Ваш E-mail для уведомления</label>
            <b-form-input id="email" type="email" class="input" v-model="email"></b-form-input>
          </div>
        </div>

        <template v-slot:modal-footer="{ close,ok }">
            <b-button @click="close()" class="modal-button" squared variant="dark">Отмена</b-button>
            <b-button @click="addTask(ok)"  class="modal-button" squared variant="dark">Создать задачу</b-button>
        </template>
    </b-modal>

    <b-table class="table" thead-class="tableHead" @row-selected="onRowSelected($event)" selectable :items="tasks" :fields="fields" :striped="striped" :table-variant="tableVariant">
      <template v-slot:cell(done)="row">
        <b-button squared variant="dark" @click="closeTask(row.item)"><b-icon  icon="check" font-scale="1.5" ></b-icon></b-button>
      </template>
    </b-table>

    <b-modal id="deletetask" centered v-model="modal_for_end_task">
      <template v-slot:modal-header>
        <p></p>
      </template>
      <div class="delete-modal">
        <p>Поздравляем вас с завершением задачи!</p>
        <img src="../assets/champaign.png">
      </div>
      <template v-slot:modal-footer>
        <p></p>
      </template>
    </b-modal>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      modal_for_end_task: false,
      show: false,
      task_name: null,
      task_description: null,
      deadline: null,
      email: null,
      fields: [
        {
          key: 'task_name',
          label: 'Название задачи'
        },

        {
          key: 'deadline',
          label: 'Крайний срок сдачи'
        },

        {
          key: 'done',
          label: 'Выполнено?'
        }
      ],

      tasks: null,

      tableVariant: 'light',
      striped: true
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    addTask(ok) {
      if (this.task_name != undefined && this.task_description != undefined && this.deadline != undefined && this.email != undefined) {
        let lastTaskId
        for(let idt of this.tasks){
          lastTaskId = idt.id 
        }
        if(!lastTaskId){
          lastTaskId = 0
        }
        let newData = {
          "task_name": this.task_name,
          "task_description": this.task_description,
          "deadline": this.deadline.replace(/^(\d{4}).(\d{2}).(\d{2})/,'$3.$2.$1'),
          "email": this.email,
          "id": lastTaskId+1
        }
        this.tasks.push(newData)
        this.sendData(newData)
        ok()
      }
    },
    closeTask(table_item){ 
      this.modal_for_end_task = true
      let deleteIndex = this.tasks.findIndex(task => task.id == table_item.id);
      this.tasks.splice(deleteIndex,1);
      axios.delete('http://localhost:8000/deleteTask', { params: { id: table_item.id } }).then(() => {
        setTimeout (() => {
                    this.modal_for_end_task=false;
                }, 2000);
      }).catch((err) => {
        this.$bvToast.toast(err, {
          title: "Ошибка",
          variant: "danger",
          solid: true
        })
      });
    },
    onRowSelected(picked){
      console.log(picked)
      this.$router.push("/" + picked[0].id)
    },

    // async sendData(newData){
    //   await axios.post("http://localhost:8000/tasks", newData)
    // },

    sendData(newData) {
      axios.post('http://localhost:8000/sendData', newData)
    },

    // async getData(){
    //   await axios.get("http://localhost:8000/tasks").then((response) => {
    //     this.tasks = response.data
    //   })
    // },

    getData(){ 
      axios.get('http://localhost:8000/getData').then((response) => {
        this.tasks = response.data.tasks;
        })
          
      }
    
  }
}
</script>

<style>
  p {
    margin: 0px;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 22px;
  }

  .container {
    text-align: center;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Roboto;
  }

  .text-container {
    margin-bottom: 22px;
    font-size: 18px;
  }

  .button {
    background-color: black;
    width: 297px;
    margin-bottom: 30px;
  }

  .table {
    width: 879px;
  }

  .tableHead {
    background-color: black;
    color: white;
  }

  .modal-header {
    border-bottom: none;
  }

  .modal-footer {
    border-top: none;
  }

  .modal-button {
    background-color: black;
    width: 228px;
  }

  .headerText {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
  }

  .closeIcon {
    cursor: pointer;
  }

  .input {
    width: 353px;
    border-radius: 0px;
    margin-bottom: 35px;
    background-color:#C4C4C4;
  }

  .inputs {
    margin-left: 98px;
  }

  .delete-modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

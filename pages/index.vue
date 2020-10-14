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
      <b-modal id="addtask" size="lg" centered title="Создание новой задачи">
          <template v-slot:modal-footer="{ ok, cancel }">
              <b-button @click="cancel()" class="modal-button" squared variant="dark">Отмена</b-button>
              <b-button @click="ok()" class="modal-button" squared variant="dark">Создать задачу</b-button>
          </template>
      </b-modal>

    <b-table class="table" thead-class="tableHead" :items="items" :fields="fields" :striped="striped" :table-variant="tableVariant"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
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

      items: [
        {
          task_name:'do this',
          deadline:'17.10',
          done: 'yes'
        },
        {
          task_name:'do this',
          deadline:'17.10',
          done: 'yes'
        }
      ],

      tableVariant: 'light',
      striped: true
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
</style>

<template>
  <div class="container">
    <h1>ToDo List</h1>
    <div>
      <p>В данном ToDo List вы можете добавлять задачи.</p>
      <p>Назаначать каждой задаче наименование задачи, описание и время выполнения.</p>
      <p>До истечения срока выполнения задачи, вам на почту прилетит уведомление.</p>
      <p>Успехов вам!</p>
    </div>
    <b-button type="submit" variant="dark" squared class="button">Создать задачу</b-button>
  </div>
</template>

<script>
export default {}
</script>

<style>
  .container {
    text-align: center;
  }

  .button{
    background-color: black;
  }
</style>

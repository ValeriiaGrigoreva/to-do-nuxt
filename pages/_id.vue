<template>
    <div class="container">
        <div>
            <p class="header">Наименование задачи</p>
            <p>{{task.data[0].task_name}}</p>
        </div>
        <div>
            <p class="header">Описание задачи</p>
            <p>{{task.data[0].task_description}}</p>
        </div>
        <div>
            <p class="header">Дедлайн</p>
            <p>{{task.data[0].deadline}}</p>
        </div>
        <div>
            <p class="header">E-mail человека, который создал задачу</p>
            <p>{{task.data[0].email}}</p>
        </div>
        <div class="buttons">
            <nuxt-link to="/"><b-button class="button_ buttonLeft" variant="dark" squared>Вернуться назад</b-button></nuxt-link>
            <b-button class="button_" variant="dark" squared>Завершить задачу</b-button>
        </div>
    </div>
    
</template>

<script>
export default {
    async asyncData({$axios, params}) {
        let task = await $axios.get(`http://localhost:8000/tasks?id=${params.id}`)
        return {task}
    }
    
}
</script>

<style scoped>
    p{
        margin: 0;
    }
    .container {
        display: flex;
        text-align: left;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        height: 100vh;
    }

    .container div {
        margin-bottom: 20px;
    }

    .header {
        font-size: 25px;
    }

    .buttons{
        margin-top: 30px;
    }

    .button_ {
        background-color: black;
    }

    .buttonLeft {
        margin-right: 150px;
    }
</style>
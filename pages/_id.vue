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
            <b-button class="button_" variant="dark" squared @click="closeTask(task.data[0])">Завершить задачу</b-button>
        </div>

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

    
        // async asyncData({$axios, params}) {
        //     let task = await $axios.get(`http://localhost:8000/tasks?id=${params.id}`)
        //     console.log(task)
        //     return {task}
        // },

        data() {
            return {
                modal_for_end_task: false,
                task: null,
            }
        },

        mounted(){
            this.getTask()
        },

        methods: {
            getTask(){ 
                axios.get('http://localhost:8000/getTask').then((response) => {
                    
                })
            },

            async closeTask(table_item){ 
                this.modal_for_end_task = true;
                //let deleteIndex = this.tasks.findIndex(task => task.id == table_item.id);
                //this.tasks.splice(deleteIndex,1);
                await axios.delete(`http://localhost:8000/tasks/${table_item.id}`).then(() => {
                    setTimeout (() => {
                        this.modal_for_end_task=false;
                        this.$router.push("/");
                    }, 2000);
                }).catch((err) => {
                    this.$bvToast.toast(err, {
                    title: "Ошибка",
                    variant: "danger",
                    solid: true
                    })
                });
            },
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
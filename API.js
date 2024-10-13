import express from "express"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

// CRUD de Usuarios

function buscarUsuario({ nome }) {
    app.get('/Usuario', async (req, res) => {
        prisma.recurso.findFirst({
            where: {
                nome: nome
            }
        })
    })
}

function cadastrarUsuario({ name, email, password, funcao, agendamento }) {
    app.post('/Usuario', async (req, res) => {
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                funcao: funcao,
                agendamento: agendamento
            }
        })
        res.status(201).json(req.body)

    })
}

function atualizarUsuario({ id, newNome, newEmail, newPassword, newFuncao }) {
    app.put('/Usuario/' + id, async (req, res) => {
        await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                name: newNome,
                email: newEmail,
                password: newPassword,
                funcao: newFuncao
            }
        })
        res.status(201).json(req.body)
    })
}

function deletaUsuario({ id }) {
    app.delete('/Usuario/' + id, async (req, res) => {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(201).json(req.body)
    })
}

//CRUD de Recursos

function buscarRecurso({ tipo, local }) {
    app.get('/Recurso', async (req, res) => {
        prisma.recurso.findFirst({
            where: {
                tipo: tipo,
                local: local
            }
        })
    })
}

function cadastrarRecurso({ status, tipo, local }) {
    app.post('/Recurso', async (req, res) => {
        await prisma.recurso.create({
            data: {
                status: status,
                tipo: tipo,
                local: local
            }
        })
        res.status(200).json(req.body)
    })
}

function atualizarRecurso({ id, newStatus, newTipo, newLocal }) {
    app.put('/Recurso/' + id, async (req, res) => {
        await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                status: newStatus,
                tipo: newTipo,
                local: newLocal
            }
        })
        res.status(201).json(req.body)
    })
}

function deletaRecurso({ id }) {
    app.delete('/Recurso/' + id, async (req, res) => {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(201).json(req.body)
    })
}

//CRUD de Agendamentos

//function agendarRecurso({ }) {
    app.post('/Agendamento', async (req, res) => {
        await prisma.agendamento.create({
            data: {
                userId: req.body.userId,
                recursoId: req.body.recursoId,
                data: req.body.data
            }
        })
        res.status(201).json(req.body)
    })
//}

function cancelarAgendamento({id}){
    app.delete('Agendamento' + id, async (req, res) => {
    await prisma.agendamento.delete({
        where:{
            id: req.params.id
        }
    })
    
})
}


app.listen(3000)
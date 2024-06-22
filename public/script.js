document.addEventListener('DOMContentLoaded', () => {
    const alunoForm = document.getElementById('alunoForm');
    const alunoTableBody = document.getElementById('alunoTableBody');
    const cancelarEdicaoBtn = document.getElementById('cancelarEdicao');

    let editingId = null;

    alunoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const aluno = {
            id: document.getElementById('id').value,
            nome: document.getElementById('nome').value,
            turma: document.getElementById('turma').value,
            telefone: document.getElementById('telefone').value,
        };

        if (editingId) {
            await updateAluno(editingId, aluno);
        } else {
            await insertAluno(aluno);
        }

        resetForm();
        loadAlunos();
    });

    cancelarEdicaoBtn.addEventListener('click', () => {
        resetForm();
    });

    async function loadAlunos() {
        alunoTableBody.innerHTML = '';
        const alunos = await getAllAlunos();
        alunos.forEach(aluno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.idaluno}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.turma}</td>
                <td>${aluno.telefone}</td>
                <td class="actions">
                    <button class="edit" data-id="${aluno.idaluno}">Editar</button>
                    <button class="delete" data-id="${aluno.idaluno}">Excluir</button>
                </td>
            `;
            alunoTableBody.appendChild(row);
        });

        // Adiciona eventos de clique aos botões "Editar" e "Excluir"
        addEventListeners();
    }

    async function getAllAlunos() {
        const response = await fetch('/api/alunos');
        return await response.json();
    }

    async function insertAluno(aluno) {
        await fetch('/api/alunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aluno),
        });
    }

    async function updateAluno(id, aluno) {
        await fetch(`/api/alunos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aluno),
        });
    }

    async function deleteAluno(id) {
        await fetch(`/api/alunos/${id}`, {
            method: 'DELETE',
        });
        loadAlunos();
    }

    // Adiciona eventos de clique aos botões "Editar" e "Excluir"
    function addEventListeners() {
        const editButtons = document.querySelectorAll('.edit');
        editButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const alunoId = button.dataset.id;
                await window.editAluno(alunoId);
            });
        });

        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const alunoId = button.dataset.id;
                await deleteAluno(alunoId);
            });
        });
    }

    window.editAluno = async (id) => {
        const aluno = await fetch(`/api/alunos/${id}`).then(res => res.json());
        document.getElementById('id').value = aluno.idaluno;
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('turma').value = aluno.turma;
        document.getElementById('telefone').value = aluno.telefone;
        editingId = aluno.idaluno;
    };

    function resetForm() {
        document.getElementById('id').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('turma').value = '';
        document.getElementById('telefone').value = '';
        editingId = null;
    }

    loadAlunos();
});
document.addEventListener('DOMContentLoaded', () => {
    const alunoForm = document.getElementById('alunoForm');
    const alunoTableBody = document.getElementById('alunoTableBody');
    const cancelarEdicaoBtn = document.getElementById('cancelarEdicao');

    let editingId = null;

    alunoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const aluno = {
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
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.turma}</td>
                <td>${aluno.telefone}</td>
                <td class="actions">
                    <button onclick="editAluno(${aluno.id})">Editar</button>
                    <button class="delete" onclick="deleteAluno(${aluno.id})">Excluir</button>
                </td>
            `;
            alunoTableBody.appendChild(row);
        });
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

    window.editAluno = async (id) => {
        const aluno = await fetch(`/api/alunos/${id}`).then(res => res.json());
        document.getElementById('alunoId').value = aluno.id;
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('turma').value = aluno.turma;
        document.getElementById('telefone').value = aluno.telefone;
        editingId = aluno.id;
    };

    function resetForm() {
        document.getElementById('alunoId').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('turma').value = '';
        document.getElementById('telefone').value = '';
        editingId = null;
    }

    loadAlunos();
});
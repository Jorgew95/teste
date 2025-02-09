// Configure seu Supabase
require('dotenv').config(); // Importa as variáveis do .env (Node.js)

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

console.log("Conectado ao Supabase:", supabaseUrl); // Debug
// Referências aos elementos do DOM
const commentForm = document.getElementById('commentForm');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const commentsList = document.getElementById('commentsList');

// Função para enviar um comentário
commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const message = messageInput.value;

    console.log("Enviando comentário:", name, message); // Debug

    const { data, error } = await supabase
        .from('comments')
        .insert([{ name: name, message: message }]);

    if (error) {
        console.error("Erro ao inserir no Supabase:", error);
        alert("Erro ao enviar comentário. Verifique o console.");
    } else {
        console.log("Comentário salvo:", data);
        nameInput.value = '';
        messageInput.value = '';
        loadComments(); // Recarrega os comentários
    }
});
// Função para carregar os comentários
async function loadComments() {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        alert('Erro ao carregar comentários');
        console.error(error);
    } else {
        // Limpar lista atual
        commentsList.innerHTML = '';

        // Adicionar os comentários à lista
        data.forEach(comment => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${comment.name}</strong>: ${comment.message}`;
            commentsList.appendChild(listItem);
        });
    }
}




// Carregar os comentários ao iniciar
loadComments();

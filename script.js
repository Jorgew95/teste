// Configure seu Supabase
const supabaseUrl = 'https://rfobseearydxqhgszlgy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmb2JzZWVhcnlkeHFoZ3N6bGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNTY0MzEsImV4cCI6MjA1NDYzMjQzMX0.csF5Iv595Bw80vQC0eqoZ2hms-CPhgkkZ3rxL6Itl5Y';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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

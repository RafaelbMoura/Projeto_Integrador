// Login.js
export class Login {
    static authenticate(username, password, correctUsername, correctPassword, destination) {
        if (username === correctUsername && password === correctPassword && destination) {
            // Exibe uma mensagem de sucesso antes de redirecionar
            alert("Login bem-sucedido! Redirecionando para página como administrador...");

            // Redireciona para a página de destino após o login bem-sucedido
            window.location.href = destination + ".html";
        } else {
            // Exibe uma mensagem de erro se as credenciais estiverem incorretas
            alert("Credenciais inválidas. Tente novamente.");
        }
    }
}

// Teste para verificar a configuração da API
console.log('🔍 Verificando configuração da API...');

// Simular o ambiente de produção
const isDev = false; // Simular produção
const baseURL = isDev ? "http://localhost:3000/api" : "https://projetoeduon.onrender.com/api";

console.log('📡 URL da API:', baseURL);
console.log('🌍 Ambiente:', isDev ? 'Desenvolvimento' : 'Produção');

// Teste de requisição
fetch(baseURL + '/auth/health')
  .then(response => response.json())
  .then(data => {
    console.log('✅ API respondendo:', data);
  })
  .catch(error => {
    console.error('❌ Erro na API:', error);
  });

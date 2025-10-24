const express = require('express');
const router = express.Router();

// Mock user data
const users = [
  {
    id: '1',
    name: 'Felipe Silva',
    email: 'felipe@fglrastreamento.com',
    phone: '(11) 99999-9999',
    password: 'demo123' // Em produção, usar hash
  }
];

// POST /api/auth/login - Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Email ou senha inválidos'
    });
  }
  
  // Em produção, usar JWT real
  const token = `mock_token_${user.id}`;
  
  res.json({
    success: true,
    message: 'Login realizado com sucesso',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      token
    }
  });
});

// GET /api/auth/profile - Obter perfil do usuário
router.get('/profile', (req, res) => {
  // Mock - em produção validar token
  const user = users[0];
  
  res.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }
  });
});

// PUT /api/auth/profile - Atualizar perfil
router.put('/profile', (req, res) => {
  const { name, email, phone } = req.body;
  
  // Mock update
  const user = users[0];
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  
  res.json({
    success: true,
    message: 'Perfil atualizado com sucesso',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }
  });
});

module.exports = router;
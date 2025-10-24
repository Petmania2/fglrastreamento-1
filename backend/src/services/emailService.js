const nodemailer = require('nodemailer');

// Configuração do transporter (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'fgl.rastreamento@gmail.com',
    pass: process.env.EMAIL_PASS || 'sua_senha_app'
  }
});

const sendBillEmail = async (billData) => {
  const mailOptions = {
    from: 'FGL Rastreamento <fgl.rastreamento@gmail.com>',
    to: 'felipealmeidasouza0777@gmail.com',
    subject: `Segunda Via do Boleto - ${billData.month}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">FGL Rastreamento - Segunda Via</h2>
        
        <p>Olá Felipe,</p>
        
        <p>Conforme solicitado, segue a segunda via do seu boleto:</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Detalhes do Boleto</h3>
          <p><strong>Mês/Ano:</strong> ${new Date(billData.month + '-01').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</p>
          <p><strong>Valor:</strong> R$ ${billData.value.toFixed(2)}</p>
          <p><strong>Vencimento:</strong> ${new Date(billData.dueDate).toLocaleDateString('pt-BR')}</p>
          <p><strong>Código de Barras:</strong> ${billData.duplicateCode}</p>
        </div>
        
        <p>Você pode pagar este boleto em qualquer banco, lotérica ou através do internet banking.</p>
        
        <p>Em caso de dúvidas, entre em contato conosco.</p>
        
        <p>Atenciosamente,<br>
        <strong>Equipe FGL Rastreamento</strong></p>
      </div>
    `
  };

  try {
    // Simular envio de email (em produção, descomente a linha abaixo)
    // await transporter.sendMail(mailOptions);
    console.log(`📧 Email enviado para: ${mailOptions.to}`);
    console.log(`📄 Boleto: ${billData.month} - R$ ${billData.value.toFixed(2)}`);
    return { success: true, message: 'Email enviado com sucesso' };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, message: 'Erro ao enviar email' };
  }
};

const sendQuoteApproval = async (quoteData) => {
  const mailOptions = {
    from: 'FGL Rastreamento <fgl.rastreamento@gmail.com>',
    to: 'felipealmeidasouza0777@gmail.com',
    subject: 'Cotação Aprovada - FGL Rastreamento',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">🎉 Cotação Aprovada!</h2>
        
        <p>Olá Felipe,</p>
        
        <p>Temos uma ótima notícia! Sua cotação foi aprovada:</p>
        
        <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
          <h3 style="color: #16a34a; margin-top: 0;">✅ APROVADO</h3>
          <p><strong>Veículo:</strong> ${quoteData.model}</p>
          <p><strong>Placa:</strong> ${quoteData.plate}</p>
          <p><strong>Plano:</strong> Proteção 20mil</p>
          <p><strong>Valor Mensal:</strong> R$ 89,90</p>
        </div>
        
        <p>Seu veículo foi aprovado para nosso plano de proteção com cobertura de até R$ 20.000,00.</p>
        
        <p>Em breve entraremos em contato para finalizar a contratação.</p>
        
        <p>Atenciosamente,<br>
        <strong>Equipe FGL Rastreamento</strong></p>
      </div>
    `
  };

  try {
    // Simular envio de email (em produção, descomente a linha abaixo)
    // await transporter.sendMail(mailOptions);
    console.log(`📧 Email de aprovação enviado para: ${mailOptions.to}`);
    console.log(`🚗 Veículo aprovado: ${quoteData.model} - ${quoteData.plate}`);
    return { success: true, message: 'Email de aprovação enviado' };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, message: 'Erro ao enviar email' };
  }
};

module.exports = {
  sendBillEmail,
  sendQuoteApproval
};
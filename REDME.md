# Recuperação de senha

**REQUISITOS FUNCIONAIS**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**REQUISITOS NAO FUNCIONAIS**

- Utilizar Mailtrap para envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**REGRAS DE NEGOCIO**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar o seu perfil;

**RN**

- O usário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua nova senha;

# Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificaçoes não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificaçóes do prestador devem ser armazenadas no MongoDB;
- As notificaçoes do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;
-


# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestados de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponivel de um prestador;
- O usuário deve poder listar horários disponiveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador.

**RNF**

- A listagem de prestadores deve ser armazenadas em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8h às 18h (Primeiro às 8h, útimo as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

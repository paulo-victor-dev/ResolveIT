# ResolveIT

<p align="center">
  <strong>Help Desk para gerenciamento e acompanhamento de chamados de suporte.</strong>
  <br />
  Uma aplicação full stack desenvolvida para demonstrar práticas de desenvolvimento web, organização de código e implementação de regras de negócio.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.13-blue?logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Django-6.1-092E20?logo=django&logoColor=white" alt="Django" />
  <img src="https://img.shields.io/badge/DRF-REST%20API-red?logo=django&logoColor=white" alt="Django REST Framework" />
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/PostgreSQL-supported-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

---

## Sobre o projeto

O **ResolveIT** é um sistema de Help Desk que centraliza a abertura, distribuição e acompanhamento de chamados de suporte técnico.

A aplicação foi projetada com diferentes níveis de acesso para usuários, técnicos e administradores. Seu principal objetivo é organizar o fluxo de atendimento, controlar quem pode visualizar e modificar cada chamado e distribuir novas solicitações entre os técnicos disponíveis.

O projeto está em desenvolvimento e faz parte do meu portfólio, com foco em demonstrar conhecimentos de desenvolvimento backend e frontend.

## Funcionalidades

### Gestão de chamados
- Abertura de chamados com título, descrição e prioridade.
- Acompanhamento do status: aberto, em atendimento e finalizado.
- Atribuição automática do chamado ao técnico com menor quantidade de atendimentos em andamento.
- Controle de acesso aos chamados conforme o perfil do usuário.
- Consulta, pesquisa, filtragem e ordenação pela API.

### Gestão de usuários
- Cadastro, consulta, atualização e exclusão de usuários pela API.
- Autenticação utilizando e-mail e senha.
- Perfis de acesso: administrador, técnico e usuário comum.
- Controle de contas ativas e inativas.
- Permissões aplicadas no backend de acordo com o perfil.

### Interface e experiência
- Área autenticada com navegação por módulos.
- Dashboard com indicadores gerais de atendimento.
- Interface de gerenciamento de usuários.
- Tema claro e escuro.
- Componentes reutilizáveis e organização por funcionalidades.

> **Nota sobre o desenvolvimento:** as regras de negócio e os endpoints principais de usuários e chamados estão implementados no backend. Algumas telas e recursos do frontend, incluindo a experiência completa de gerenciamento de chamados, ainda estão em evolução.

## Regras de acesso

As permissões são definidas pelo papel do usuário e aplicadas no backend.

| Perfil | Permissões |
| --- | --- |
| **Usuário comum** | Abre chamados e acompanha somente os próprios chamados. |
| **Técnico** | Visualiza e atualiza os chamados atribuídos a ele. |
| **Administrador** | Possui acesso administrativo aos chamados e à gestão de usuários. |

A atribuição automática considera a quantidade de chamados abertos ou em atendimento de cada técnico, buscando distribuir a carga de trabalho de maneira equilibrada.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| **Backend** | Python, Django e Django REST Framework |
| **Autenticação** | JWT com Simple JWT |
| **Frontend** | Next.js, React e JavaScript |
| **Gerenciamento de dados** | TanStack Query |
| **Interface** | Tailwind CSS, componentes shadcn/ui e Lucide |
| **Banco de dados** | SQLite no ambiente de desenvolvimento e configuração para PostgreSQL via URL no ambiente de produção |
| **Testes e qualidade** | Pytest, pytest-django e Ruff |
| **Ambiente** | Dockerfiles para backend e frontend |

## Organização do projeto

O repositório está organizado em uma estrutura que separa as responsabilidades do backend e do frontend:

```text
ResolveIT/
├── backend/
│   ├── apps/
│   │   ├── accounts/     # Usuários, autenticação e permissões
│   │   └── tickets/      # Chamados e regras de atendimento
│   ├── config/           # Configurações do Django
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/          # Rotas e páginas
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── contexts/     # Contextos da aplicação
│   │   ├── hooks/        # Hooks personalizados
│   │   ├── providers/    # Provedores globais
│   │   └── services/     # Comunicação com a API
│   └── package.json
│
└── README.md
```

## Executar localmente

**Pré-requisitos:** Python, Node.js e npm.

### Backend

```bash
cd backend

python -m venv .venv
```

Ative o ambiente virtual e instale as dependências:

```bash
pip install -r requirements.txt
```

Configure as variáveis de ambiente utilizando `.env.example` como referência. Para desenvolvimento, utilize `config.settings.dev`.

Em seguida:

```bash
python manage.py migrate
python manage.py runserver
```

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
```

Configure o arquivo `.env.local` com a URL da API, conforme o exemplo em `.env.example`:

```env
API_BASE_URL=http://localhost:8000/
```

Inicie a aplicação:

```bash
npm run dev
```

## Testes

Os testes automatizados do backend utilizam Pytest e pytest-django.

Para executá-los:

```bash
cd backend
pytest
```

---

<p align="center">
  Desenvolvido por <a href="https://github.com/paulo-victor-dev">Paulo Victor</a>
  <br />
  <a href="https://github.com/paulo-victor-dev/ResolveIT">Repositório no GitHub</a>
</p>

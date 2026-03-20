# Random App User👥

App mobile para explorar e interagir com pessoas ao redor do mundo, consumindo a API pública [randomuser.me](https://randomuser.me/).

Desenvolvido como desafio técnico para a vaga de Desenvolvedor(a) Frontend Junior na C2S.

---

## Como rodar o projeto

### Pré-requisitos
- Node.js (LTS)
- Expo Go instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Instalação
```bash
git clone https://github.com/seu-usuario/random-user-app.git
cd random-user-app
npm install
npx expo start
```

### Visualizar

| Opção | Como |
|-------|------|
| 📱 Celular | Escaneie o QR Code com o Expo Go |
| 🌐 Navegador | Pressione `w` no terminal após rodar `npx expo start` |
| 🤖 Android | Pressione `a` no terminal (requer Android Studio) |
| 🍎 iOS | Pressione `i` no terminal (requer Xcode — Mac apenas) |

### Instalação
```bash
git clone https://github.com/sabrinacouto/random-app-user.git
cd random-app-user
npm install
npx expo start
```

Escaneie o QR Code com o Expo Go e o app abrirá no seu celular.

---

## O que foi implementado

### Telas obrigatórias
- **Lista de usuários** — FlashList paginada com pull-to-refresh, loading skeleton e tratamento de erros
- **Perfil do usuário** — foto, nome, contato, localização, fuso horário, dados pessoais e coordenadas
- **Chat** — histórico de mensagens persistido localmente com horário de envio e opção de limpar conversa

### Funcionalidades extras
- **Splash screen** animada com sequência de entrada
- **Busca por nome** — filtragem local em tempo real
- **Filtros** por gênero e nacionalidade
- **Favoritos** — salvar e remover usuários, persistido com AsyncStorage
- **Skeleton loading** — feedback visual enquanto carrega os dados
- **Animações** — entrada escalonada dos cards, micro-animação ao favoritar, transições entre telas

### Decisões técnicas

**FlashList no lugar de FlatList**
Melhor performance em listas longas por usar reciclagem de células.

**Seed fixa na API**
Usei `seed: 'c2s-people-app'` para garantir que a paginação seja consistente — sem a seed, a API retorna usuários aleatórios a cada chamada, quebrando a paginação.

**Busca local**
A API não oferece busca por nome, então filtrei os usuários já carregados em memória com `useMemo` para evitar chamadas desnecessárias.

**Custom hook `useUsers`**
Separei toda a lógica de paginação, refresh e erro num hook próprio para deixar a screen limpa e a lógica testável de forma isolada.

**Custom hook `useFavorites`**
Gerencia o estado dos favoritos em memória com um `Set` de UUIDs para checagens O(1), sincronizando com AsyncStorage em background.

**TypeScript**
Optei por TypeScript para garantir tipagem nas props dos componentes, nos parâmetros de navegação e nos dados da API — reduz erros em tempo de desenvolvimento.

**Componentização por contexto**
Cada tela tem sua própria pasta de componentes (`list/`, `profile/`, `chat/`, `splash/`) para facilitar manutenção e evitar acoplamento entre telas.

---

## Próximas versões

- Respostas automáticas no chat simulando o usuário
- Tema escuro
- Testes unitários nos hooks e componentes
- Tela de edição de perfil
- Internacionalização (i18n)

---

## Tecnologias

- React Native + Expo SDK 55
- TypeScript
- React Navigation v7
- FlashList
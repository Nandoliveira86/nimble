# NIMBLE GAME — DESIGN SYSTEM
**Versão:** 1.0  
**Tema:** Game UI / Neon Dark  
**Estilo visual:** Futurista, elegante, tecnológico, com atmosfera gamer premium  
**Base cromática:** Azul claro neon + rosa neon sobre fundo preto e cinza escuro

---

## 1. Visão Geral

O design system do **Nimble Game** foi concebido para transmitir uma experiência visual moderna, imersiva e imediatamente associada ao universo de games, streaming e tecnologia.  
A identidade combina:

- **fundo escuro premium**
- **acentos em azul elétrico e rosa neon**
- **glows suaves**
- **containers com profundidade**
- **componentes com aparência refinada**
- **leitura clara e interface amigável**

A proposta é unir:
- sensação de **plataforma gamer**
- leitura de **produto premium**
- usabilidade de **interface simples e intuitiva**
- estética forte o suficiente para branding, produto e apresentação institucional

---

## 2. Princípios do Sistema

### 2.1. Princípios visuais
1. **Dark first**  
   O sistema nasce para fundo escuro, com superfícies em preto e cinza grafite.

2. **Neon com controle**  
   O neon deve destacar ações, estados, foco e pontos de atenção, sem poluir a interface.

3. **Game feel premium**  
   A interface deve parecer parte de um ecossistema gamer real, com acabamento sofisticado.

4. **Leitura acima do efeito**  
   Glow, borda e profundidade só existem se não prejudicarem a clareza.

5. **Profundidade suave**  
   O layout usa sombras, luz interna e bordas leves para dar sensação de relevo.

---

## 3. Identidade da Marca

## 3.1. Logo principal
A marca **Nimble Game** pode operar em três aplicações centrais:

### A. Logo monocromática
Uso preferencial em:
- fundo preto
- cinza escuro
- superfícies institucionais
- rodapé
- sidebar
- favicon expandido
- componentes discretos de branding

**Recomendação:**
- logo branca sobre fundo escuro
- nunca aplicar sombras pesadas sobre a marca mono
- preservar boa área de respiro

### B. Logo hero / abertura
Uso preferencial em:
- **tela de abertura**
- splash screen
- loading inicial
- materiais promocionais
- hero section

Nesta versão, a identidade visual pode usar:
- robô neon
- destaque em azul e rosa
- glow mais intenso
- atmosfera cinematográfica

### C. Logo de base / footer
Uso em:
- rodapé
- barra inferior
- créditos
- assinatura institucional
- componentes de navegação secundária

Preferencialmente:
- versão mono
- discreta
- tamanho reduzido
- presença limpa

---

## 4. Paleta de Cores

## 4.1. Cores principais

| Token | Nome | Hex | Uso |
|---|---|---:|---|
| `color.primary` | Neon Blue | `#00D1FF` | CTA principal, foco, destaque ativo |
| `color.secondary` | Neon Pink | `#FF2BD6` | Hover, acento visual, reforço de ação |
| `color.bg.base` | Deep Black | `#0A0B10` | Fundo principal |
| `color.bg.surface` | Surface Dark | `#11141B` | Cartões e containers |
| `color.bg.elevated` | Elevated Graphite | `#181A1F` | Blocos destacados |
| `color.border.soft` | Soft Border | `#2A2F3A` | Bordas suaves |
| `color.text.primary` | Text High | `#F5F7FA` | Texto principal |
| `color.text.secondary` | Text Medium | `#AAB3C5` | Texto secundário |
| `color.text.muted` | Text Low | `#6F7787` | Texto auxiliar |

---

## 4.2. Cores de suporte

| Token | Nome | Hex | Uso |
|---|---|---:|---|
| `color.success` | Success Green | `#22E19A` | Confirmações, online, sucesso |
| `color.warning` | Warning Yellow | `#FFC94D` | Alertas moderados |
| `color.error` | Error Red | `#FF4B4B` | Erro, falha, invalidação |
| `color.info` | Info Purple | `#8B5CFF` | Informação e estados especiais |

---

## 4.3. Gradientes recomendados

### Gradiente principal
```css
linear-gradient(90deg, #00D1FF 0%, #FF2BD6 100%)
```

### Gradiente glow blue
```css
linear-gradient(180deg, #35D8FF 0%, #008DFF 100%)
```

### Gradiente glow pink
```css
linear-gradient(180deg, #FF5CE1 0%, #D600B8 100%)
```

### Gradiente surface gamer
```css
linear-gradient(180deg, #161A22 0%, #0F1218 100%)
```

---

## 5. Tipografia

## 5.1. Direção tipográfica
A tipografia deve refletir:
- tecnologia
- clareza
- leitura rápida
- personalidade gamer limpa

## 5.2. Famílias recomendadas

### Display / títulos
- **Orbitron**
- **Exo 2**
- alternativa: **Oxanium**

Uso:
- títulos principais
- hero headings
- splash screen
- labels institucionais

### Interface / texto corrido
- **Inter**
- alternativa: **Manrope**

Uso:
- inputs
- listas
- labels
- tabelas
- descrições
- estados de sistema

---

## 5.3. Escala tipográfica

| Estilo | Tamanho | Peso | Uso |
|---|---:|---|---|
| `display-xl` | 48px | Bold | Hero / abertura |
| `display-lg` | 32px | Bold | Título de seção |
| `heading-md` | 24px | Semibold | Blocos e cards |
| `heading-sm` | 20px | Semibold | Subtítulos |
| `body-lg` | 16px | Regular | Texto padrão |
| `body-sm` | 14px | Regular | Labels e suporte |
| `caption` | 12px | Regular | Apoio e metadata |

---

## 6. Grid, Espaçamento e Layout

## 6.1. Escala de espaçamento

| Token | Valor |
|---|---:|
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.5` | 24px |
| `space.6` | 32px |
| `space.7` | 48px |

## 6.2. Regras gerais
- padding interno de cards: **16px a 24px**
- distância entre blocos: **16px a 32px**
- seções grandes: **32px a 48px**
- layout com aparência modular
- uso de alinhamento limpo e consistente

---

## 7. Border Radius

| Token | Valor | Uso |
|---|---:|---|
| `radius.sm` | 4px | elementos pequenos |
| `radius.md` | 8px | inputs simples |
| `radius.lg` | 12px | botões e cards |
| `radius.xl` | 16px | modais e containers |
| `radius.2xl` | 24px | painéis hero / splash |

**Direção visual:**  
O Nimble Game usa cantos arredondados para reforçar acessibilidade, leveza e tecnologia amigável.

---

## 8. Sombras e Glow

## 8.1. Sombra estrutural
```css
0 8px 24px rgba(0, 0, 0, 0.35)
```

## 8.2. Sombra interna suave
```css
inset 0 1px 0 rgba(255, 255, 255, 0.08)
```

## 8.3. Glow azul
```css
0 0 12px rgba(0, 209, 255, 0.45)
```

## 8.4. Glow rosa
```css
0 0 14px rgba(255, 43, 214, 0.40)
```

## 8.5. Glow misto CTA
```css
0 0 18px rgba(0, 209, 255, 0.25),
0 0 22px rgba(255, 43, 214, 0.18)
```

**Uso:**  
Glow deve aparecer em:
- hover
- foco
- botões principais
- seleções ativas
- sliders
- loading
- splash hero

---

## 9. Superfícies

## 9.1. Fundo principal
- preto profundo
- cinza grafite
- leve textura opcional
- sensação premium

## 9.2. Containers
- fundo levemente mais claro que o fundo geral
- borda suave translúcida
- sombra externa sutil
- brilho interno discreto

## 9.3. Hierarquia de superfícies
1. **Base background**
2. **Surface**
3. **Elevated surface**
4. **Interactive highlighted surface**

---

## 10. Ícones

## 10.1. Estilo
- simples
- geométricos
- claros
- legíveis
- com boa leitura em tamanhos pequenos

## 10.2. Tamanhos
| Token | Valor |
|---|---:|
| `icon.xs` | 14px |
| `icon.sm` | 18px |
| `icon.md` | 22px |
| `icon.lg` | 24px |
| `icon.xl` | 32px |
| `icon.2xl` | 48px |

## 10.3. Uso
- navegação
- ações
- status
- feedback visual
- cards
- empty states

---

## 11. Componentes

### 11.1. Botões

#### Tipos
- **Primary**
- **Secondary**
- **Ghost**
- **Disabled**
- **Loading**

#### Button / Primary
Uso:
- ações principais
- avançar
- jogar
- confirmar

Características:
- fundo neon blue ou gradiente azul/rosa
- texto branco
- glow suave
- borda arredondada
- destaque claro

#### Button / Secondary
Uso:
- ações de apoio
- modal secundário
- filtros

Características:
- fundo escuro elevado
- borda luminosa discreta
- hover em rosa neon

#### Estados
- default
- hover
- pressed
- disabled
- loading

---

### 11.2. Inputs

#### Tipos
- text input
- email input
- search input
- error input

#### Regras
- fundo grafite
- borda discreta
- foco com glow azul
- erro com contorno rosa/vermelho
- placeholder com contraste médio

#### Estados
- default
- focus
- filled
- error
- disabled

---

### 11.3. Toggle / Switch

Uso:
- ligar/desligar recursos
- estados rápidos
- preferências

#### Ativo
- trilha azul
- botão claro
- glow suave

#### Inativo
- trilha cinza
- sem glow

---

### 11.4. Slider

Uso:
- volume
- intensidade
- sensibilidade
- configuração dinâmica

Características:
- track escura
- progresso em gradiente neon
- thumb arredondado iluminado

---

### 11.5. Barra de progresso

Uso:
- loading
- download
- progresso de tarefa
- onboarding

Características:
- track discreta
- fill com gradiente azul/rosa
- percentual opcional

---

### 11.6. Cards

#### Tipos de card
- card de aventura
- card de conquista
- card de biblioteca
- card de destaque
- card de recomendação

#### Estrutura
- ícone ou thumbnail
- título
- descrição curta
- ação opcional

#### Estilo
- fundo elevado
- brilho suave
- bordas arredondadas
- sensação de profundidade

---

### 11.7. Modal / Diálogo

Uso:
- confirmação
- aviso
- ação crítica
- entrada contextual

#### Estrutura
- ícone ou status
- título
- descrição
- ação primária
- ação secundária
- botão fechar

#### Estilo
- container escuro
- destaque central
- CTA com forte hierarquia
- contraste alto

---

### 11.8. Sidebar / Navegação

Uso:
- navegação primária
- menu de conta
- jogos
- biblioteca
- conquistas
- configurações

#### Estrutura sugerida
- logo mono no topo
- lista vertical de itens
- estado ativo com highlight neon
- ícones simples e consistentes

#### Itens padrão
- Início
- Explorar
- Conquistas
- Amigos
- Configurações

---

### 11.9. Tabela / Lista

Uso:
- jogadores
- biblioteca
- sessões
- status
- rankings
- histórico

#### Colunas possíveis
- nome
- status
- nível
- ação

#### Regras
- linhas com divisão suave
- hover com leve elevação
- status por cor
- ações discretas

---

### 11.10. Empty State

Uso:
- nenhuma busca encontrada
- biblioteca vazia
- tela inicial sem conteúdo
- falha de carregamento leve

#### Estrutura
- ícone central
- título claro
- texto curto
- CTA de saída

---

### 11.11. Toast / Notificação

Uso:
- confirmação
- alerta
- erro leve
- feedback instantâneo

#### Tipos
- success
- info
- warning
- error

#### Estilo
- fundo elevado
- ícone de status
- texto curto
- fechamento opcional

---

## 12. Tela de Abertura / Splash Screen

A tela de abertura é um ponto central da identidade visual do produto.

### Regras
- usar a **versão hero da marca**
- exibir o personagem/robô neon
- manter atmosfera cinematográfica
- incluir branding forte do **Nimble Game**
- barra de loading opcional
- slogan curto

### Estrutura sugerida
- fundo preto com glow azul e rosa
- robô em destaque
- logo “NIMBLE GAME”
- slogan:
  - **Play • Move • Belong**
- loading ou chamada de entrada

### Aplicação da marca
- **tela de abertura:** usar a versão neon/hero
- **rodapé/base:** usar a versão monocromática
- **superfícies institucionais escuras:** usar mono branca

---

## 13. Motion

### 13.1. Direção de animação
As animações devem reforçar:
- leveza
- resposta rápida
- acabamento premium
- atmosfera gamer

### 13.2. Recomendações
- hover: **120ms–180ms**
- transições padrão: **180ms–240ms**
- modais: **220ms–300ms**
- easing suave
- glow crescendo de forma controlada

### 13.3. Exemplos
- hover de botão com aumento de glow
- toggle com deslizamento suave
- modal com fade + scale leve
- loading bar com deslocamento contínuo

---

## 14. Acessibilidade

Mesmo dentro de uma proposta visual forte, a acessibilidade deve ser preservada.

### Regras
- contraste suficiente entre fundo e texto
- não depender apenas de cor para indicar estado
- áreas clicáveis confortáveis
- tipografia sempre legível
- animações sem exagero
- glow nunca pode comprometer leitura

---

## 15. Guidelines de Uso da Marca

### Fazer
- usar logo mono branca em fundo escuro
- usar logo hero na splash screen
- manter respiro ao redor da marca
- respeitar a paleta principal

### Não fazer
- distorcer a logo
- mudar proporções
- usar contornos pesados aleatórios
- aplicar cor fora da paleta sem necessidade
- usar glow excessivo sobre a versão mono

---

## 16. Exemplos de Aplicação

### Contextos ideais do sistema
- launcher de jogos
- cloud gaming
- biblioteca de games
- dashboard gamer
- interface de streaming de gameplay
- onboarding de app game-tech
- landing page do produto
- painéis de configuração e conta

---

## 17. Resumo Visual da Linguagem

O sistema **Nimble Game** deve sempre transmitir:

- **escuro e premium**
- **tecnológico**
- **gamer**
- **vivo**
- **clean apesar do neon**
- **moderno**
- **marcante**
- **simples de usar**

Em uma frase:

> **Uma interface gamer premium, dark, elegante e energética, com azul claro neon e rosa neon como assinatura visual.**

---

## 18. Tokens base sugeridos

```json
{
  "color": {
    "primary": "#00D1FF",
    "secondary": "#FF2BD6",
    "success": "#22E19A",
    "warning": "#FFC94D",
    "error": "#FF4B4B",
    "info": "#8B5CFF",
    "bg": {
      "base": "#0A0B10",
      "surface": "#11141B",
      "elevated": "#181A1F"
    },
    "text": {
      "primary": "#F5F7FA",
      "secondary": "#AAB3C5",
      "muted": "#6F7787"
    },
    "border": {
      "soft": "#2A2F3A"
    }
  },
  "radius": {
    "sm": 4,
    "md": 8,
    "lg": 12,
    "xl": 16,
    "xxl": 24
  },
  "spacing": {
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 24,
    "6": 32,
    "7": 48
  },
  "icon": {
    "xs": 14,
    "sm": 18,
    "md": 22,
    "lg": 24,
    "xl": 32,
    "xxl": 48
  }
}
```

---

## 19. Fechamento

Este design system estabelece a base visual e funcional do **Nimble Game**, garantindo consistência entre branding, produto, navegação e experiência do usuário.  
Ele deve ser aplicado como referência central para:

- UI do app
- telas de abertura
- componentes
- landing pages
- protótipos
- apresentações do produto
- futuras expansões da interface

---

# Assinatura de conceito
**NIMBLE GAME**  
**Play • Move • Belong**
